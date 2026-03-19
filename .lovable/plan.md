

## CV Layout and Colour Improvement Plan

After reviewing all sections, here are the recommended improvements:

### 1. Alternate section backgrounds for visual rhythm
Currently, only Thought Leadership and Education use `bg-warm-glow`. The page feels flat between Journey, Skills, Recommendations, Role Tailoring, and Footer. Alternating subtle background tones creates clear section separation and makes scanning easier.

- **Journey** section: add `bg-warm-glow` background
- **Recommendations** section: keep no background (white/default)
- **Skills** section: add `bg-warm-glow` background
- **Role Tailoring** section: keep default
- This creates an alternating pattern: Hero (default) > Journey (warm) > Thought Leadership (warm) > Skills (default) > Recommendations (warm) > Education (default) > Role Tailoring (warm) > Footer (default)

### 2. NavBar: add "Thought Leadership" link
The nav currently lacks a link to the Thought Leadership section, which is a key differentiator.

- Add `{ label: "Speaking", href: "#thought-leadership" }` to the nav links array

### 3. Recommendations section: softer quote styling
The quote card currently uses `bg-quote-bg`. Add a subtle left border accent using `border-l-4 border-l-primary/30` to visually distinguish quotes, matching the warm palette.

### 4. Skills section: equal-height cards
Add `h-full` to each capability card so all three cards in the 3-column grid match height, preventing uneven bottoms.

### 5. Timeline cards: subtle left accent border on accented entries
For the two accent entries (Aplica and Ringier AI), add a `border-l-4 border-l-primary/40` to make them pop more without being garish.

### 6. Footer: add a warm background divider
Add a top border or a subtle `bg-warm-glow` strip above the footer to separate it from the Role Tailoring section.

### 7. Section header divider line: use primary colour more boldly
The current `w-16 h-0.5 bg-primary/40` divider under section titles is very faint. Increase to `bg-primary/60` for better visibility.

---

### Summary of file changes

| File | Change |
|------|--------|
| `NavBar.tsx` | Add "Speaking" nav link |
| `SectionHeader.tsx` | Bump divider opacity to `bg-primary/60` |
| `JourneyTimeline.tsx` | Add `bg-warm-glow` background, add left accent border on accent cards |
| `SkillsSection.tsx` | Add `h-full` to cards |
| `RecommendationsSection.tsx` | Add `bg-warm-glow` background, add left border accent to quote card |
| `EducationSection.tsx` | Remove `bg-warm-glow` (swap to default for alternating pattern) |
| `FooterSection.tsx` | Add subtle top border or warm background |

