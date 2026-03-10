import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts
Font.register({
  family: "DMSans",
  src: "https://cdn.jsdelivr.net/npm/@fontsource/dm-sans@5.0.0/files/dm-sans-latin-400-normal.woff2",
});

Font.register({
  family: "DMSansBold",
  src: "https://cdn.jsdelivr.net/npm/@fontsource/dm-sans@5.0.0/files/dm-sans-latin-700-normal.woff2",
});

const TEAL = "#1a9e8f";
const TEAL_LIGHT = "#e8f7f5";
const DARK = "#1a1a2e";
const GRAY = "#555555";
const LIGHT_GRAY = "#888888";

const s = StyleSheet.create({
  page: { fontFamily: "DMSans", fontSize: 9, color: DARK, padding: 0 },
  // Header
  header: {
    backgroundColor: TEAL,
    padding: 24,
    paddingBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: { flex: 1 },
  name: { fontSize: 22, fontFamily: "DMSansBold", color: "#ffffff", marginBottom: 4 },
  quote: { fontSize: 9, color: "#ffffffcc", maxWidth: 320 },
  headerRight: { alignItems: "flex-end", gap: 3 },
  contactText: { fontSize: 8, color: "#ffffffdd" },

  // Body
  body: { flexDirection: "row", padding: 20, gap: 20 },
  colLeft: { flex: 1.1 },
  colRight: { flex: 0.9 },

  // Section
  sectionTitle: {
    fontSize: 13,
    fontFamily: "DMSansBold",
    color: TEAL,
    marginBottom: 8,
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: TEAL,
    paddingBottom: 3,
  },
  sectionTitleFirst: { marginTop: 0 },

  // Education
  eduItem: { marginBottom: 8 },
  eduDegree: { fontSize: 10, fontFamily: "DMSansBold", color: DARK },
  eduSchool: { fontSize: 9, color: GRAY },
  eduYears: { fontSize: 8, color: LIGHT_GRAY },

  // Experience
  expItem: { marginBottom: 10 },
  expRole: { fontSize: 10, fontFamily: "DMSansBold", color: DARK },
  expPeriod: { fontSize: 8, color: LIGHT_GRAY, marginBottom: 2 },
  expNarrative: { fontSize: 8.5, color: GRAY, lineHeight: 1.5 },
  expHighlight: { fontSize: 8, color: GRAY, marginLeft: 8, marginTop: 1 },
  bullet: { fontSize: 8, color: TEAL, marginRight: 4 },
  highlightRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 2 },

  // Recommendations
  recItem: { marginBottom: 10, backgroundColor: TEAL_LIGHT, padding: 8, borderRadius: 4 },
  recText: { fontSize: 8, color: GRAY, lineHeight: 1.5, marginBottom: 4 },
  recName: { fontSize: 9, fontFamily: "DMSansBold", color: DARK },
  recTitle: { fontSize: 7.5, color: LIGHT_GRAY },

  // Skills
  skillCategory: { marginBottom: 6 },
  skillLabel: { fontSize: 9, fontWeight: 600, color: DARK, marginBottom: 2 },
  skillTags: { flexDirection: "row", flexWrap: "wrap", gap: 3 },
  skillTag: {
    fontSize: 7.5,
    color: TEAL,
    backgroundColor: TEAL_LIGHT,
    padding: "2 6",
    borderRadius: 8,
  },

  // Certifications
  certItem: { fontSize: 8, color: GRAY, marginBottom: 2 },

  // Languages
  langText: { fontSize: 8.5, color: GRAY, marginTop: 4 },

  // Footer
  footer: { position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center" },
  footerText: { fontSize: 7, color: LIGHT_GRAY },
});

const education = [
  { degree: "Master of International Business", school: "Curtin University, Australia", years: "2014 – 2016" },
  { degree: "MSc Computational Science & Engineering", school: "University of Technology, Mauritius", years: "2005 – 2007" },
  { degree: "Bachelor of Information Technology", school: "University of Canberra, Australia", years: "2002 – 2005" },
];

const experience = [
  {
    company: "Aplica Ltd",
    role: "Founder",
    period: "Nov 2024 – Present",
    narrative: "Helping businesses unlock growth through practical AI solutions — from strategy to implementation.",
  },
  {
    company: "Ringier South Africa",
    role: "Product Manager, AI Team",
    period: "Jun 2024 – Oct 2024",
    narrative: "Pitched Ally Agent, an AI-powered solution matching property seekers to listings. Took it from concept to next approval stage.",
  },
  {
    company: "Ringier South Africa",
    role: "Product Manager, Property Marketplace",
    period: "Jul 2019 – Oct 2024",
    narrative: "Steered a 17-member cross-functional team through the most ambitious transformation the marketplace had seen.",
    highlights: [
      "Led 2 major platform migrations with zero business disruption",
      "Collaborated across multiple international markets",
      "Partnered directly with CEOs on strategy & execution",
    ],
  },
  {
    company: "Ringier South Africa",
    role: "Senior Software Developer",
    period: "Feb 2017 – Jun 2019",
    narrative: "Architected end-to-end property listing flow, built features deployed across 5 African countries, and created a dynamic form builder.",
  },
  {
    company: "Aplica Ltd",
    role: "Managing Director",
    period: "Mar 2015 – Jan 2017",
    narrative: "Built and maintained live housing systems for the University of Copenhagen and Technical University of Denmark.",
  },
  {
    company: "Expand Technology",
    role: "Project Manager",
    period: "Feb 2013 – Feb 2015",
    narrative: "Managed sprints and a team of 7, driving development of a smartcard payment solution.",
  },
  {
    company: "KnowGo Ltd",
    role: "CEO & Project Manager",
    period: "Feb 2010 – Jan 2012",
    narrative: "Co-directed the company and led development of a unique workflow product. Built software that generates web solutions from workflow rules.",
  },
  {
    company: "SWTEAMS Ltd",
    role: "Software Developer",
    period: "Dec 2006 – Jul 2010",
    narrative: "Built university applications, electronic business document systems for the EU-funded PEPPOL project, and rule engine modules.",
  },
  {
    company: "University of Mauritius",
    role: "Programmer & Part-time Tutor",
    period: "Nov 2005 – Nov 2006",
    narrative: "Developed ILearn platform, taught IT, supervised nationwide computer proficiency testing, and trained IC3 trainers.",
  },
];

const recommendations = [
  {
    name: "Christian Drejøe",
    title: "CEO at Augrin Software ApS (The EasyCopy Company)",
    text: "I've known Nisha for more than 10 years as a dedicated and skillful provider of IT solutions. She has always been appreciated by our customers. She is easy to work with and not afraid to go the extra mile for a job well done.",
  },
  {
    name: "Delphine Racoupeau",
    title: "Head of Product · Solutions at Ringier South Africa",
    text: "I've had the pleasure of working with Nisha for over 4 years at Ringier. She always prioritizes strong relationships with her colleagues. I could always rely on her for brainstorming and honest opinions.",
  },
  {
    name: "Thomas Omweri",
    title: "Tech Lead at Ringier South Africa",
    text: "Nisha led our product team through one of the largest and most complex system migrations we've ever undertaken. She was an early advocate for generative AI, successfully integrating AI driven solutions.",
  },
  {
    name: "Elias Mwangi",
    title: "Full Stack Web Developer at Ringier South Africa",
    text: "Her ability to bridge the gap between technical and business perspectives was instrumental in driving several successful projects. Her dedication to learning and growth is truly inspiring.",
  },
  {
    name: "Lydie Lambert",
    title: "Strategic and inclusive project leader",
    text: "Nisha is highly professional and capable. Her technical skills are excellent, but it's especially fortunate when one finds an IT partner that can also communicate with users on a user level.",
  },
];

const skillCategories = [
  { label: "AI & Innovation", skills: ["AI Agents", "Generative AI", "Vibe Coding", "Agentic AI", "AI Strategy"] },
  { label: "Product & Strategy", skills: ["Product Roadmap", "Platform Migration", "Online Marketplace", "Product Development"] },
  { label: "Leadership", skills: ["Cross-functional Teams", "CEO Partnership", "Sprint Planning", "Scrum", "Stakeholder Mgmt"] },
  { label: "Global Reach", skills: ["Multi-market Deployment", "5 African Countries", "Denmark", "Mauritius"] },
];

const certifications = [
  "AI Agents Fundamentals",
  "Advanced Product Management: Vision, Strategy & Metrics",
  "Vibe Coding",
  "miniCON Agentic AI",
];

const CVDocument = () => (
  <Document>
    <Page size="A4" style={s.page}>
      {/* Header */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <Text style={s.name}>Nisha Appanah</Text>
          <Text style={s.quote}>
            "Whoever you are, wherever you are from, make the best of what you have."
          </Text>
        </View>
        <View style={s.headerRight}>
          <Text style={s.contactText}>n.appanah@gmail.com</Text>
          <Text style={s.contactText}>linkedin.com/in/nishaappanah</Text>
        </View>
      </View>

      {/* Body */}
      <View style={s.body}>
        {/* Left Column */}
        <View style={s.colLeft}>
          <Text style={[s.sectionTitle, s.sectionTitleFirst]}>Education</Text>
          {education.map((edu) => (
            <View key={edu.degree} style={s.eduItem}>
              <Text style={s.eduDegree}>{edu.degree}</Text>
              <Text style={s.eduSchool}>{edu.school}</Text>
              <Text style={s.eduYears}>{edu.years}</Text>
            </View>
          ))}

          <Text style={s.sectionTitle}>Experience</Text>
          {experience.map((exp) => (
            <View key={exp.role + exp.company} style={s.expItem}>
              <Text style={s.expRole}>
                {exp.role} at {exp.company}
              </Text>
              <Text style={s.expPeriod}>{exp.period}</Text>
              <Text style={s.expNarrative}>{exp.narrative}</Text>
              {exp.highlights?.map((h) => (
                <View key={h} style={s.highlightRow}>
                  <Text style={s.bullet}>▸</Text>
                  <Text style={s.expHighlight}>{h}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Right Column */}
        <View style={s.colRight}>
          <Text style={[s.sectionTitle, s.sectionTitleFirst]}>References</Text>
          {recommendations.map((rec) => (
            <View key={rec.name} style={s.recItem}>
              <Text style={s.recText}>"{rec.text}"</Text>
              <Text style={s.recName}>{rec.name}</Text>
              <Text style={s.recTitle}>{rec.title}</Text>
            </View>
          ))}

          <Text style={s.sectionTitle}>Skills</Text>
          {skillCategories.map((cat) => (
            <View key={cat.label} style={s.skillCategory}>
              <Text style={s.skillLabel}>{cat.label}</Text>
              <View style={s.skillTags}>
                {cat.skills.map((skill) => (
                  <Text key={skill} style={s.skillTag}>{skill}</Text>
                ))}
              </View>
            </View>
          ))}

          <Text style={s.sectionTitle}>Certifications</Text>
          {certifications.map((cert) => (
            <Text key={cert} style={s.certItem}>▸ {cert}</Text>
          ))}

          <Text style={{ ...s.sectionTitle, borderBottomWidth: 0 }}>Languages</Text>
          <Text style={s.langText}>English · French · Mauritian Creole</Text>
        </View>
      </View>

      <View style={s.footer}>
        <Text style={s.footerText}>Nisha Appanah — CV</Text>
      </View>
    </Page>
  </Document>
);

export default CVDocument;
