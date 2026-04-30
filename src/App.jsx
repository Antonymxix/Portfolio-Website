import { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const DATA = {
  name: "Anton Schindler",
  tagline: "Ai & Data-Science Student",
  email: "schindler.anton@icloud.com",
  availableForWork: true,
  socials: [
    { label: "LinkedIn", icon: "in", url: "https://linkedin.com/in/antonschindler", color: "rgba(10,102,194,0.10)", border: "rgba(10,102,194,0.28)", text: "#1d4ed8" },
    { label: "GitHub",   icon: "GH", url: "https://github.com/antonschindler",     color: "rgba(30,30,30,0.08)",   border: "rgba(30,30,30,0.18)",  text: "#1e293b" },
  ],
  techStack: [
    { category: "AI & Machine Learning", color: "#7c3aed", glow: "rgba(124,58,237,0.13)", border: "rgba(124,58,237,0.22)", icon: "◈", items: ["Python","Scikit-learn", "Pandas", "NumPy", "Jupyter"] },
    { category: "Data & Analytics",      color: "#0ea5e9", glow: "rgba(14,165,233,0.13)",  border: "rgba(14,165,233,0.22)",  icon: "⬡", items: ["SQL", "Excel"] },
    { category: "Low-Level & Systems",   color: "#f59e0b", glow: "rgba(245,158,11,0.13)",  border: "rgba(245,158,11,0.22)",  icon: "◉", items: ["C++", "C", "Assembler (x86)", "Linux", "Git"] },
    { category: "Kreativ & Design",      color: "#ec4899", glow: "rgba(236,72,153,0.13)",  border: "rgba(236,72,153,0.22)",  icon: "⟁", items: ["Photoshop", "Illustrator", "Premiere Pro", "After Effects", "Lightroom","Framer"] },
  ],
  skills: ["Python", "Pandas", "Machine Learning", "C++", "Assembler", "SQL", "Framer", "React", "Jupyter"],
  projects: [
    { title: "Aura Finance",  bgA: "rgba(167,139,250,0.45)", bgB: "rgba(99,102,241,0.35)", icon: "◈", year: "2024", status: "wip",  progress: null },
    { title: "Helix OS",      bgA: "rgba(251,113,133,0.40)", bgB: "rgba(236,72,153,0.30)", icon: "⬡", year: "2024", status: "soon", progress: null },
    { title: "Solaris Brand", bgA: "rgba(251,191,36,0.42)",  bgB: "rgba(251,146,60,0.32)", icon: "◉", year: "2023", status: "soon", progress: null },
  ],
};

const TRANSLATIONS = {
  de: {
    techCategories: ["AI & Machine Learning", "Data & Analytics", "Low-Level & Systems", "Kreativ & Design"],
    status: "Verfügbar für Projekte",
    about: "Ich entwickle intelligente Lösungen – vom Low-Level Code bis zum User Interface.\nAls Student der KI & Data Science (B.Sc.) kombiniere ich tiefgehendes technisches Verständnis mit moderner Datenanalyse. Mein Spektrum reicht von hardwarenaher Programmierung in Assembler und C++ bis hin zur Entwicklung datengestützter Anwendungen mit Python, Pandas und Machine Learning.\nIch glaube, dass komplexe Daten eine intuitive Form brauchen. Deshalb nutze ich meine Erfahrung in React, JavaScript und Design-Tools wie Framer, um performante Web-Interfaces zu schaffen, die Ästhetik und Funktionalität vereinen. Kurzum: Ich bringe Logik in Form.",
    location: "Regensburg, Deutschland",
    contact: "Kontakt aufnehmen ↗", role: "Rolle", socials: "Socials", techStack: "Tech Stack", skills: "Skills & Tools",
    projects: "Ausgewählte Projekte", viewProject: "Projekt ansehen ↗",
    projectCategories: ["Product Design", "Interface Design", "Brand Identity"],
    statusWip: "In Arbeit", statusSoon: "Bald verfügbar", progressLabel: "läuft",
  },
  en: {
    techCategories: ["AI & Machine Learning", "Data & Analytics", "Low-Level & Systems", "Creative & Design"],
    status: "Available for projects",
    about: "I build intelligent solutions – from low-level code to user interface.\nAs a B.Sc. student in AI & Data Science, I combine deep technical understanding with modern data analysis. My spectrum ranges from hardware-level programming in Assembler and C++ to building data-driven applications with Python, Pandas and Machine Learning.\nI believe complex data needs an intuitive form. That's why I leverage my experience in React, JavaScript and design tools like Framer to create performant web interfaces that unite aesthetics and functionality. In short: I bring logic into shape.",
    location: "Regensburg, Germany",
    contact: "Get in touch ↗", role: "Role", socials: "Socials", techStack: "Tech Stack", skills: "Skills & Tools",
    projects: "Selected Projects", viewProject: "View Project ↗",
    projectCategories: ["Product Design", "Interface Design", "Brand Identity"],
    statusWip: "In progress", statusSoon: "Coming soon", progressLabel: "in progress",
  },
};

const LangContext = createContext("de");
const useLang = () => TRANSLATIONS[useContext(LangContext)];

const useScrollReveal = (threshold = 0.12) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px -40px 0px", amount: threshold });
  return [ref, isInView];
};

const GLASS = {
  background: "rgba(255,255,255,0.85)",
  boxShadow: "0 4px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04), inset 0 1.5px 0 rgba(255,255,255,0.95)",
  border: "1px solid rgba(255,255,255,0.70)",
  borderRadius: "24px",
};

const GlassCard = ({ children, className = "", delay = 0, hover = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px -40px 0px", amount: 0.12 });
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setVisible(true), delay * 60);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        ...GLASS,
        position: "relative",
        overflow: "hidden",
        width: "100%",
        opacity: visible ? 1 : 0,
        transform: hovered ? "scale(1.016)" : "scale(1)",
        transition: `opacity 0.55s ease ${delay * 0.06}s, transform 0.3s cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent 4%, rgba(255,255,255,0.95) 25%, rgba(255,255,255,0.95) 75%, transparent 96%)" }}
      />
      {children}
    </div>
  );
};

const LangToggle = ({ lang, setLang }) => (
  <motion.div
    initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.5 }}
    className="flex items-center gap-1 p-1 rounded-2xl"
    style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.70)", boxShadow: "0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)" }}
  >
    {["de", "en"].map((l) => (
      <motion.button key={l} onClick={() => setLang(l)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="relative px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider"
        style={{ color: lang === l ? "#7c3aed" : "#94a3b8", fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {lang === l && (
          <motion.div layoutId="lang-pill" className="absolute inset-0 rounded-xl"
            style={{ background: "rgba(124,58,237,0.10)", border: "1px solid rgba(124,58,237,0.20)" }}
            transition={{ duration: 0.25 }}
          />
        )}
        <span className="relative z-10">{l.toUpperCase()}</span>
      </motion.button>
    ))}
  </motion.div>
);

const Background = () => {
  const blobRefs = useRef([]);
  useEffect(() => {
    const blobs = [
      { ref: blobRefs.current[0], ax: 0,   ay: 0,   sx: 0.0002,  sy: 0.00018, r: 18 },
      { ref: blobRefs.current[1], ax: 1,   ay: 0.5, sx: 0.00015, sy: 0.00022, r: 14 },
      { ref: blobRefs.current[2], ax: 2,   ay: 1,   sx: 0.00025, sy: 0.00016, r: 16 },
      { ref: blobRefs.current[3], ax: 0.5, ay: 1.5, sx: 0.0002,  sy: 0.0002,  r: 20 },
      { ref: blobRefs.current[4], ax: 1.5, ay: 0.8, sx: 0.00018, sy: 0.00024, r: 22 },
      { ref: blobRefs.current[5], ax: 0.8, ay: 2,   sx: 0.00022, sy: 0.00017, r: 14 },
    ];
    let rafId;
    const tick = (t) => {
      blobs.forEach((b) => {
        if (!b.ref) return;
        b.ref.style.transform = `translate3d(${Math.sin(t * b.sx + b.ax) * b.r}px, ${Math.cos(t * b.sy + b.ay) * b.r}px, 0)`;
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);
  const blob = { position: "absolute", borderRadius: "50%", willChange: "transform" };
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: "#eef0f8" }}>
      <div ref={el => blobRefs.current[0] = el} style={{ ...blob, width: 780, height: 780, top: -180, left: -160, background: "rgba(149,100,255,0.45)", filter: "blur(200px)" }} />
      <div ref={el => blobRefs.current[1] = el} style={{ ...blob, width: 640, height: 640, top: 0, right: -160, background: "rgba(56,189,248,0.38)", filter: "blur(180px)" }} />
      <div ref={el => blobRefs.current[2] = el} style={{ ...blob, width: 560, height: 560, top: "35%", left: "22%", background: "rgba(244,114,182,0.38)", filter: "blur(160px)" }} />
      <div ref={el => blobRefs.current[3] = el} style={{ ...blob, width: 520, height: 520, bottom: -80, left: -100, background: "rgba(52,211,153,0.32)", filter: "blur(160px)" }} />
      <div ref={el => blobRefs.current[4] = el} style={{ ...blob, width: 480, height: 480, bottom: "6%", right: "2%", background: "rgba(99,102,241,0.30)", filter: "blur(150px)" }} />
      <div ref={el => blobRefs.current[5] = el} style={{ ...blob, width: 380, height: 380, top: "55%", right: "18%", background: "rgba(251,191,36,0.22)", filter: "blur(140px)" }} />
    </div>
  );
};

const StatusPill = () => {
  const t = useLang();
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
      style={{ background: "rgba(52,211,153,0.11)", border: "1px solid rgba(52,211,153,0.28)", color: "#059669" }}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <AnimatePresence mode="wait">
        <motion.span key={t.status} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>
          {t.status}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  const t = useLang();
  const paragraphs = t.about.split("\n");
  return (
    <GlassCard className="col-span-12 md:col-span-8" delay={0}>
      <div className="p-10 md:p-14 space-y-5">
        <StatusPill />
        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-slate-900"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          Hey,<br />
          I am <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-sky-500 bg-clip-text text-transparent">{DATA.name}</span>
        </h1>
        <AnimatePresence mode="wait">
          <motion.div key={t.about} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-3 max-w-lg">
            {paragraphs.map((para, i) => (
              <p key={i} className={`leading-relaxed ${i === 0 ? "text-base font-semibold text-slate-700" : "text-sm text-slate-500"}`}
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>{para}</p>
            ))}
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center gap-4 pt-2">
          <motion.a href={`mailto:${DATA.email}`} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-2xl text-sm font-semibold text-white bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_4px_20px_rgba(109,40,217,0.35)] hover:shadow-[0_6px_28px_rgba(109,40,217,0.45)] transition-shadow duration-300">
            <AnimatePresence mode="wait">
              <motion.span key={t.contact} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>{t.contact}</motion.span>
            </AnimatePresence>
          </motion.a>
          <AnimatePresence mode="wait">
            <motion.span key={t.location} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="text-sm text-slate-400 flex items-center gap-1.5">
              <span>📍</span> {t.location}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </GlassCard>
  );
};

const TaglineCard = () => {
  const t = useLang();
  const [ref, inView] = useScrollReveal();
  return (
    <GlassCard className="col-span-12 md:col-span-4" delay={1}>
      <div className="p-8 flex flex-col justify-between gap-6 h-full">
        <div ref={ref} className="flex flex-col gap-4 flex-1">
          <p className="text-xs uppercase tracking-widest mb-1 font-bold bg-gradient-to-r from-violet-600 via-indigo-500 to-sky-500 bg-clip-text text-transparent"
            style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t.socials}</p>
          {DATA.socials.map((s, i) => (
            <motion.a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.06 } } }}
              initial="hidden" animate={inView ? "visible" : "hidden"}
              whileHover={{ scale: 1.03, x: 4 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl no-underline group"
              style={{ background: s.color, border: `1px solid ${s.border}`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55), 0 2px 8px rgba(0,0,0,0.04)" }}>
              <span className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.65)", color: s.text, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 6px rgba(0,0,0,0.08)" }}>{s.icon}</span>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-bold" style={{ color: s.text }}>{s.label}</span>
                <span className="text-xs mt-0.5 opacity-60 truncate" style={{ color: s.text }}>{s.url.replace("https://", "")}</span>
              </div>
              <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: s.text }}>↗</span>
            </motion.a>
          ))}
        </div>
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(148,163,184,0.25) 50%, rgba(255,255,255,0) 100%)" }} />
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 font-medium">{t.role}</p>
          <p className="text-2xl font-bold text-slate-800 leading-tight" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>{DATA.tagline}</p>
        </div>
      </div>
    </GlassCard>
  );
};

const TechStack = () => {
  const t = useLang();
  const [ref, inView] = useScrollReveal();
  const [active, setActive] = useState(0);
  const cat = DATA.techStack[active];
  return (
    <GlassCard className="col-span-12 md:col-span-5" delay={0} hover={false}>
      <div className="p-9" ref={ref}>
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-5">
          <AnimatePresence mode="wait">
            <motion.span key={t.techStack} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>{t.techStack}</motion.span>
          </AnimatePresence>
        </p>
        <div className="flex flex-col gap-2 mb-6">
          {DATA.techStack.map((c, i) => (
            <motion.button key={c.category} onClick={() => setActive(i)}
              whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }}
              className="relative flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-300 cursor-pointer"
              style={{ background: active === i ? c.glow : "rgba(255,255,255,0.50)", border: `1px solid ${active === i ? c.border : "rgba(200,200,220,0.35)"}`, boxShadow: active === i ? `0 2px 16px ${c.glow}` : "none" }}>
              <motion.span animate={{ scale: active === i ? 1.15 : 1, rotate: active === i ? 12 : 0 }} transition={{ duration: 0.35 }}
                className="text-base select-none flex-shrink-0" style={{ color: active === i ? c.color : "#94a3b8" }}>{c.icon}</motion.span>
              <span className="text-sm font-semibold transition-colors duration-200" style={{ color: active === i ? c.color : "#64748b" }}>{t.techCategories[i]}</span>
              {active === i && <motion.div layoutId="cat-indicator" className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} transition={{ duration: 0.3 }} />}
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.32 }} className="flex flex-wrap gap-2">
            {cat.items.map((item, i) => (
              <motion.span key={item} initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                whileHover={{ scale: 1.07, y: -1 }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold select-none cursor-default"
                style={{ background: `${cat.color}12`, border: `1px solid ${cat.color}28`, color: cat.color, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 4px ${cat.color}15` }}>
                {item}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </GlassCard>
  );
};

const Skills = () => {
  const t = useLang();
  const [ref, inView] = useScrollReveal();
  return (
    <GlassCard className="col-span-12 md:col-span-7" delay={0} hover={false}>
      <div className="p-9">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">{t.skills}</p>
        <div ref={ref} className="flex flex-wrap gap-2.5">
          {DATA.skills.map((skill, i) => (
            <motion.span key={skill}
              initial={{ opacity: 0, scale: 0.7, y: 8 }} animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: i * 0.055, duration: 0.45 }}
              whileHover={{ scale: 1.08 }}
              className="px-4 py-1.5 rounded-full text-sm font-medium cursor-default select-none"
              style={{ background: "rgba(148,163,184,0.12)", border: "1px solid rgba(148,163,184,0.25)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 6px rgba(0,0,0,0.04)", color: "#475569" }}>
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

const ProjectCard = ({ project, category, delay }) => {
  const t = useLang();
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px -40px 0px", amount: 0.12 });
  const [visible, setVisible] = useState(false);
  const isWip   = project.status === "wip";
  const isSoon  = project.status === "soon";
  const isLocked = isWip || isSoon;

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setVisible(true), delay * 80);
      return () => clearTimeout(timer);
    }
  }, [inView, delay]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...GLASS,
        position: "relative",
        overflow: "hidden",
        width: "100%",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: hovered ? "scale(1.022)" : "scale(1)",
        transition: `opacity 0.55s ease ${delay * 0.08}s, transform 0.3s cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      <div className="relative h-52 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${project.bgA}, ${project.bgB})`, overflow: "hidden" }}>
        <motion.span
          animate={{ scale: hovered && !isLocked ? 1.2 : 1, rotate: hovered && !isLocked ? 15 : 0, opacity: isLocked ? 0.35 : 0.70 }}
          transition={{ duration: 0.5 }}
          className="text-7xl select-none"
          style={{ filter: isLocked ? "blur(1px)" : "none" }}
        >{project.icon}</motion.span>

        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,10,20,0.32)" }}>
            <span className="px-4 py-2 rounded-full text-xs font-semibold"
              style={{ background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.32)", color: "rgba(255,255,255,0.90)", letterSpacing: "0.05em" }}>
              {isWip ? t.statusWip : t.statusSoon}
            </span>
          </div>
        )}

        {!isLocked && (
          <AnimatePresence>
            {hovered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.15)" }}>
                <motion.span initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 4, opacity: 0 }} transition={{ duration: 0.2, delay: 0.05 }}
                  className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white"
                  style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.40)" }}>
                  {t.viewProject}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      <div className="p-6">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1">{category} · {project.year}</p>
        <p className="font-bold text-slate-800 text-base leading-tight mb-3">{project.title}</p>

        {isWip && project.progress != null && (
          <div>
            <div className="h-1.5 rounded-full overflow-hidden mb-1.5" style={{ background: "rgba(0,0,0,0.06)" }}>
              <motion.div initial={{ width: 0 }} animate={visible ? { width: `${project.progress}%` } : {}}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #a78bfa, #6366f1)" }} />
            </div>
            <p className="text-xs text-slate-400 font-medium">{project.progress}% — {t.progressLabel}</p>
          </div>
        )}
        {isWip && project.progress == null && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: "rgba(52,211,153,0.11)", border: "1px solid rgba(52,211,153,0.28)", color: "#059669" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            {t.statusWip}
          </span>
        )}
        {isSoon && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: "rgba(245,158,11,0.09)", border: "1px solid rgba(245,158,11,0.25)", color: "#b45309" }}>
            {t.statusSoon}
          </span>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const t = useLang();
  return (
    <div className="col-span-12" style={{ width: "100%" }}>
      <GlassCard hover={false} delay={0}>
        <div className="p-9">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-7">{t.projects}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {DATA.projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} category={t.projectCategories[i]} delay={i} />
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

const FooterCard = () => (
  <div className="col-span-12" style={{ width: "100%" }}>
    <GlassCard delay={0}>
      <div className="p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-bold text-slate-800 text-lg">{DATA.name}</p>
          <p className="text-slate-400 text-sm">{DATA.tagline}</p>
        </div>
        <motion.a href={`mailto:${DATA.email}`} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          className="text-sm font-medium text-violet-600 hover:text-violet-800 transition-colors duration-200 underline underline-offset-4">
          {DATA.email}
        </motion.a>
      </div>
    </GlassCard>
  </div>
);

export default function Portfolio() {
  const [lang, setLang] = useState("de");
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,600;0,9..40,800;0,9..40,900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return (
    <LangContext.Provider value={lang}>
      <div className="min-h-screen" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <Background />
        <div className="fixed top-5 right-5 z-50"><LangToggle lang={lang} setLang={setLang} /></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 space-y-4">
          <div className="grid grid-cols-12 gap-4"><Hero /><TaglineCard /></div>
          <div className="grid grid-cols-12 gap-4"><TechStack /><Skills /></div>
          <div className="grid grid-cols-12 gap-4"><Projects /></div>
          <div className="grid grid-cols-12 gap-4"><FooterCard /></div>
        </div>
      </div>
    </LangContext.Provider>
  );
}