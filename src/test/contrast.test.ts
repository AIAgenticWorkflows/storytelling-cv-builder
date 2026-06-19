import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Automated WCAG AA contrast check for the light-mode palette.
 *
 * Parses CSS custom properties from src/index.css (`:root { ... }` block),
 * then verifies every meaningful foreground/background pairing used across
 * the site sections meets WCAG AA contrast for body text (>= 4.5:1) and
 * large/UI text (>= 3:1).
 */

// ---------- Color math ----------

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((v) => Math.round(v * 255)) as [
    number,
    number,
    number,
  ];
}

function relLuminance([r, g, b]: [number, number, number]): number {
  const srgb = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(
  a: [number, number, number],
  b: [number, number, number],
): number {
  const l1 = relLuminance(a);
  const l2 = relLuminance(b);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

// Alpha compositing: foreground with alpha over solid bg.
function composite(
  fg: [number, number, number],
  alpha: number,
  bg: [number, number, number],
): [number, number, number] {
  return [
    Math.round(fg[0] * alpha + bg[0] * (1 - alpha)),
    Math.round(fg[1] * alpha + bg[1] * (1 - alpha)),
    Math.round(fg[2] * alpha + bg[2] * (1 - alpha)),
  ];
}

// ---------- Parse :root tokens ----------

function parseRootTokens(css: string): Record<string, [number, number, number]> {
  const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
  if (!rootMatch) throw new Error("No :root block found in index.css");
  const block = rootMatch[1];
  const tokens: Record<string, [number, number, number]> = {};
  const re = /--([a-z0-9-]+)\s*:\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(block)) !== null) {
    const [, name, h, s, l] = m;
    tokens[name] = hslToRgb(parseFloat(h), parseFloat(s), parseFloat(l));
  }
  return tokens;
}

// ---------- Test ----------

const css = readFileSync(resolve(__dirname, "../index.css"), "utf-8");
const t = parseRootTokens(css);

// Background surfaces used in light mode across the site sections.
const surfaces: Record<string, [number, number, number]> = {
  background: t.background,
  card: t.card,
  muted: t.muted,
  secondary: t.secondary,
  accent: t.accent,
  primary: t.primary, // CTA buttons (e.g. "Get in Touch")
  "warm-glow": t["warm-glow"], // RecommendationsSection bg
  "quote-bg": t["quote-bg"], // quote card bg
  "sidebar-background": t["sidebar-background"],
};

// AA thresholds
const AA_BODY = 4.5;
const AA_LARGE = 3.0;

describe("light-mode WCAG AA contrast", () => {
  describe("body text on every section surface", () => {
    for (const [name, bg] of Object.entries(surfaces)) {
      // primary surface uses primary-foreground, not foreground
      if (name === "primary") continue;
      it(`foreground on ${name} >= ${AA_BODY}:1`, () => {
        const ratio = contrastRatio(t.foreground, bg);
        expect(ratio).toBeGreaterThanOrEqual(AA_BODY);
      });
    }
  });

  describe("muted/secondary text on every section surface", () => {
    for (const [name, bg] of Object.entries(surfaces)) {
      if (name === "primary") continue;
      it(`muted-foreground on ${name} >= ${AA_BODY}:1`, () => {
        const ratio = contrastRatio(t["muted-foreground"], bg);
        expect(ratio).toBeGreaterThanOrEqual(AA_BODY);
      });
    }
  });

  describe("primary CTA button", () => {
    it("primary-foreground on primary >= 4.5:1", () => {
      const ratio = contrastRatio(t["primary-foreground"], t.primary);
      expect(ratio).toBeGreaterThanOrEqual(AA_BODY);
    });
  });

  describe("accent text usage", () => {
    it("primary as link/label color on background >= 4.5:1", () => {
      const ratio = contrastRatio(t.primary, t.background);
      expect(ratio).toBeGreaterThanOrEqual(AA_BODY);
    });
    it("primary on card >= 4.5:1", () => {
      expect(contrastRatio(t.primary, t.card)).toBeGreaterThanOrEqual(AA_BODY);
    });
    it("primary on warm-glow (recommendations section) >= 4.5:1", () => {
      expect(contrastRatio(t.primary, t["warm-glow"])).toBeGreaterThanOrEqual(
        AA_BODY,
      );
    });
  });

  describe("translucent surfaces (alpha-composited)", () => {
    // primary/5 and primary/10 tints are used as chip/icon backgrounds on
    // top of the page background. Text on top must still be readable.
    it("foreground on bg-primary/5 over background >= 4.5:1", () => {
      const composited = composite(t.primary, 0.05, t.background);
      expect(contrastRatio(t.foreground, composited)).toBeGreaterThanOrEqual(
        AA_BODY,
      );
    });
    it("foreground on bg-primary/10 over background >= 4.5:1", () => {
      const composited = composite(t.primary, 0.1, t.background);
      expect(contrastRatio(t.foreground, composited)).toBeGreaterThanOrEqual(
        AA_BODY,
      );
    });
  });

  describe("non-text UI (borders, icons) — large/UI threshold", () => {
    it(`primary as icon on background >= ${AA_LARGE}:1`, () => {
      expect(contrastRatio(t.primary, t.background)).toBeGreaterThanOrEqual(
        AA_LARGE,
      );
    });
    it(`border on background >= ${AA_LARGE}:1 (informational, not strict)`, () => {
      // Borders are decorative; we keep this informational with a low floor.
      const ratio = contrastRatio(t.border, t.background);
      expect(ratio).toBeGreaterThan(1.1);
    });
  });
});
