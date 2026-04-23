import { useState, useEffect, useRef } from "react";

// ─── CSS injected via style tag ───────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;800&family=Syne:wght@400;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #080c10;
      --bg2: #0d1117;
      --surface: #111820;
      --surface2: #161e28;
      --border: #1e2d3d;
      --accent: #00e5ff;
      --accent2: #7b61ff;
      --accent3: #ff6b35;
      --text: #e2e8f0;
      --muted: #64748b;
      --green: #22c55e;
      --font-display: 'Syne', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-display);
      overflow-x: hidden;
      cursor: none;
    }

    /* Custom cursor */
    .cursor {
      width: 12px; height: 12px;
      background: var(--accent);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease;
      mix-blend-mode: difference;
    }
    .cursor-ring {
      width: 36px; height: 36px;
      border: 1px solid var(--accent);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9998;
      transition: all 0.12s ease;
      opacity: 0.5;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

    /* Nav */
    nav {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 100;
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 60px;
      background: rgba(8,12,16,0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(0,229,255,0.08);
    }
    .nav-logo {
      font-family: var(--font-mono);
      font-size: 14px;
      color: var(--accent);
      letter-spacing: 2px;
    }
    .nav-links { display: flex; gap: 36px; }
    .nav-links a {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--muted);
      text-decoration: none;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: color 0.2s;
      position: relative;
    }
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0;
      width: 0; height: 1px;
      background: var(--accent);
      transition: width 0.3s;
    }
    .nav-links a:hover { color: var(--accent); }
    .nav-links a:hover::after { width: 100%; }

    /* Hero */
    .hero {
      min-height: 100vh;
      display: flex; align-items: center;
      padding: 120px 60px 80px;
      position: relative;
      overflow: hidden;
    }
    .hero-grid-bg {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      animation: gridShift 20s linear infinite;
    }
    @keyframes gridShift {
      0% { transform: translateY(0); }
      100% { transform: translateY(60px); }
    }
    .hero-glow {
      position: absolute;
      width: 600px; height: 600px;
      background: radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%);
      top: -100px; right: -100px;
      pointer-events: none;
    }
    .hero-glow2 {
      position: absolute;
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%);
      bottom: 0; left: 200px;
      pointer-events: none;
    }
    .hero-content { position: relative; z-index: 2; max-width: 900px; }
    .hero-tag {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--accent);
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 24px;
      display: flex; align-items: center; gap: 12px;
    }
    .hero-tag::before {
      content: '';
      width: 40px; height: 1px;
      background: var(--accent);
    }
    .hero-name {
      font-family: var(--font-display);
      font-size: clamp(52px, 8vw, 100px);
      font-weight: 800;
      line-height: 0.95;
      letter-spacing: -2px;
      margin-bottom: 20px;
    }
    .hero-name span {
      display: block;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-title {
      font-size: 18px;
      color: var(--muted);
      font-family: var(--font-mono);
      margin-bottom: 32px;
    }
    .hero-title em { color: var(--accent3); font-style: normal; }
    .hero-bio {
      max-width: 600px;
      line-height: 1.8;
      color: #94a3b8;
      margin-bottom: 48px;
      font-size: 16px;
    }
    .hero-cta {
      display: flex; gap: 16px; flex-wrap: wrap;
    }
    .btn-primary {
      padding: 14px 32px;
      background: var(--accent);
      color: var(--bg);
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 1px;
      border: none;
      cursor: none;
      text-decoration: none;
      transition: all 0.2s;
      clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
    }
    .btn-primary:hover { background: #00b8d4; transform: translateY(-2px); }
    .btn-outline {
      padding: 14px 32px;
      background: transparent;
      color: var(--accent);
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 1px;
      border: 1px solid var(--accent);
      cursor: none;
      text-decoration: none;
      transition: all 0.2s;
      clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
    }
    .btn-outline:hover { background: rgba(0,229,255,0.1); transform: translateY(-2px); }

    /* Photo placeholder */
    .hero-photo {
      position: absolute;
      right: 60px;
      top: 50%;
      transform: translateY(-50%);
      width: 340px; height: 420px;
      border: 1px solid var(--border);
      overflow: hidden;
      clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
    }
    .hero-photo-inner {
      width: 100%; height: 100%;
      background: var(--surface);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 16px;
      position: relative;
    }
    .hero-photo-inner img {
      width: 100%; height: 100%;
      object-fit: cover;
    }
    .hero-photo-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,229,255,0.15), transparent);
      pointer-events: none;
    }
    .photo-label {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
      letter-spacing: 2px;
      text-align: center;
      padding: 8px 16px;
      border: 1px dashed var(--border);
    }
    .photo-icon { font-size: 48px; opacity: 0.3; }

    /* Sections */
    section { padding: 100px 60px; position: relative; }
    .section-label {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--accent);
      letter-spacing: 4px;
      text-transform: uppercase;
      margin-bottom: 16px;
      display: flex; align-items: center; gap: 12px;
    }
    .section-label::before {
      content: '';
      width: 24px; height: 1px;
      background: var(--accent);
    }
    .section-title {
      font-family: var(--font-display);
      font-size: clamp(32px, 4vw, 52px);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 60px;
      letter-spacing: -1px;
    }
    .section-title span { color: var(--accent); }

    /* Stats row */
    .stats-row {
      display: flex; gap: 0;
      border: 1px solid var(--border);
      margin-bottom: 80px;
      overflow: hidden;
    }
    .stat-item {
      flex: 1;
      padding: 32px;
      border-right: 1px solid var(--border);
      position: relative;
      overflow: hidden;
    }
    .stat-item:last-child { border-right: none; }
    .stat-item::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0,229,255,0.03), transparent);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .stat-item:hover::before { opacity: 1; }
    .stat-num {
      font-family: var(--font-mono);
      font-size: 36px;
      font-weight: 800;
      color: var(--accent);
      display: block;
    }
    .stat-desc {
      font-size: 13px;
      color: var(--muted);
      margin-top: 4px;
      font-family: var(--font-mono);
    }

    /* Experience cards */
    .exp-grid { display: flex; flex-direction: column; gap: 2px; }
    .exp-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-left: 3px solid transparent;
      padding: 40px;
      position: relative;
      transition: all 0.3s;
      overflow: hidden;
    }
    .exp-card:hover {
      border-left-color: var(--accent);
      background: var(--surface2);
    }
    .exp-card::after {
      content: '';
      position: absolute;
      top: 0; right: 0;
      width: 200px; height: 200px;
      background: radial-gradient(circle at top right, rgba(0,229,255,0.04), transparent 70%);
      pointer-events: none;
    }
    .exp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .exp-company {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--accent);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .exp-role {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .exp-meta {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
      display: flex; gap: 16px; flex-wrap: wrap;
    }
    .exp-meta span { display: flex; align-items: center; gap: 6px; }
    .exp-badge {
      font-family: var(--font-mono);
      font-size: 10px;
      padding: 4px 10px;
      border: 1px solid var(--border);
      color: var(--muted);
      letter-spacing: 1px;
      white-space: nowrap;
    }
    .exp-badge.remote { border-color: var(--green); color: var(--green); }
    .exp-badge.onsite { border-color: var(--accent3); color: var(--accent3); }
    .exp-desc {
      color: #94a3b8;
      line-height: 1.8;
      margin: 20px 0;
      font-size: 15px;
    }
    .exp-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
    .tag {
      font-family: var(--font-mono);
      font-size: 11px;
      padding: 4px 12px;
      background: rgba(0,229,255,0.06);
      border: 1px solid rgba(0,229,255,0.15);
      color: var(--accent);
    }
    .tag.purple {
      background: rgba(123,97,255,0.06);
      border-color: rgba(123,97,255,0.15);
      color: var(--accent2);
    }
    .tag.orange {
      background: rgba(255,107,53,0.06);
      border-color: rgba(255,107,53,0.15);
      color: var(--accent3);
    }
    .bullets {
      list-style: none;
      margin-top: 16px;
      display: flex; flex-direction: column; gap: 8px;
    }
    .bullets li {
      font-size: 14px;
      color: #94a3b8;
      padding-left: 20px;
      position: relative;
      line-height: 1.6;
    }
    .bullets li::before {
      content: '▸';
      position: absolute;
      left: 0;
      color: var(--accent);
      font-size: 11px;
    }

    /* Prompt engineer section */
    .prompt-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2px;
      margin-top: 0;
    }
    .prompt-card {
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 36px 28px;
      transition: all 0.3s;
      position: relative;
      overflow: hidden;
    }
    .prompt-card:hover {
      background: var(--surface2);
      border-color: rgba(0,229,255,0.3);
    }
    .prompt-card-icon {
      font-size: 32px;
      margin-bottom: 20px;
    }
    .prompt-card-title {
      font-size: 17px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .prompt-card-desc {
      font-size: 13px;
      color: #64748b;
      line-height: 1.8;
      font-family: var(--font-mono);
    }
    .code-snippet {
      margin-top: 16px;
      background: var(--bg);
      border: 1px solid var(--border);
      padding: 12px 16px;
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--accent);
      overflow-x: auto;
      white-space: pre;
      line-height: 1.6;
    }

    /* Skills section */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2px;
    }
    .skill-group {
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 28px;
    }
    .skill-group-title {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--accent);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border);
    }
    .skill-list {
      list-style: none;
      display: flex; flex-direction: column; gap: 8px;
    }
    .skill-list li {
      font-family: var(--font-mono);
      font-size: 12px;
      color: #94a3b8;
      display: flex; align-items: center; gap: 8px;
    }
    .skill-list li::before {
      content: '';
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--accent);
      flex-shrink: 0;
    }

    /* Projects / Personal */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2px;
    }
    .project-card {
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 36px;
      transition: all 0.3s;
      position: relative;
      overflow: hidden;
    }
    .project-card:hover { border-color: rgba(123,97,255,0.3); }
    .project-card::before {
      content: '';
      position: absolute;
      top: -40px; right: -40px;
      width: 120px; height: 120px;
      border-radius: 50%;
      background: rgba(123,97,255,0.05);
      transition: all 0.4s;
    }
    .project-card:hover::before {
      transform: scale(2);
      background: rgba(123,97,255,0.08);
    }
    .project-icon { font-size: 36px; margin-bottom: 20px; }
    .project-title { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
    .project-sub {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--accent2);
      letter-spacing: 2px;
      margin-bottom: 16px;
    }
    .project-desc { font-size: 14px; color: #64748b; line-height: 1.8; }

    /* Music section */
    .music-section {
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 60px;
      display: flex; align-items: center; gap: 60px;
      position: relative;
      overflow: hidden;
    }
    .music-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(123,97,255,0.05), rgba(255,107,53,0.03));
    }
    .music-visual {
      flex-shrink: 0;
      display: flex; gap: 4px; align-items: flex-end;
      height: 60px;
    }
    .music-bar {
      width: 6px;
      background: linear-gradient(to top, var(--accent2), var(--accent));
      border-radius: 3px 3px 0 0;
      animation: musicPulse 1.2s ease-in-out infinite;
    }
    .music-bar:nth-child(2) { animation-delay: 0.1s; }
    .music-bar:nth-child(3) { animation-delay: 0.2s; }
    .music-bar:nth-child(4) { animation-delay: 0.15s; }
    .music-bar:nth-child(5) { animation-delay: 0.05s; }
    .music-bar:nth-child(6) { animation-delay: 0.25s; }
    .music-bar:nth-child(7) { animation-delay: 0.1s; }
    @keyframes musicPulse {
      0%, 100% { height: 20%; }
      50% { height: 100%; }
    }
    .music-text { position: relative; z-index: 1; }
    .music-title { font-size: 28px; font-weight: 800; margin-bottom: 12px; }
    .music-desc { font-size: 15px; color: #94a3b8; line-height: 1.8; margin-bottom: 24px; }

    /* Education */
    .edu-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-left: 3px solid var(--accent2);
      padding: 40px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .edu-degree { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
    .edu-uni {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--accent2);
    }
    .edu-year {
      font-family: var(--font-mono);
      font-size: 32px;
      font-weight: 800;
      color: rgba(255,255,255,0.06);
    }

    /* Contact */
    .contact-section {
      background: var(--surface);
      border-top: 1px solid var(--border);
    }
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
    }
    .contact-headline {
      font-size: clamp(28px, 4vw, 48px);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 20px;
    }
    .contact-sub { font-size: 15px; color: #64748b; line-height: 1.8; }
    .contact-links { display: flex; flex-direction: column; gap: 16px; }
    .contact-link {
      display: flex; align-items: center; gap: 16px;
      padding: 20px 24px;
      background: var(--bg);
      border: 1px solid var(--border);
      text-decoration: none;
      color: var(--text);
      transition: all 0.2s;
    }
    .contact-link:hover {
      border-color: var(--accent);
      color: var(--accent);
      transform: translateX(8px);
    }
    .contact-link-icon { font-size: 20px; flex-shrink: 0; }
    .contact-link-info { }
    .contact-link-label {
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--muted);
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .contact-link-value { font-size: 15px; font-weight: 600; }

    /* Footer */
    footer {
      padding: 32px 60px;
      border-top: 1px solid var(--border);
      display: flex; justify-content: space-between; align-items: center;
    }
    .footer-copy {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
    }
    .footer-made {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
    }
    .footer-made span { color: var(--accent); }

    /* Scan line effect */
    .scanlines {
      position: fixed; inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0,0,0,0.05) 2px,
        rgba(0,0,0,0.05) 4px
      );
      pointer-events: none;
      z-index: 1000;
      opacity: 0.4;
    }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.7s ease forwards; }
    .delay-1 { animation-delay: 0.1s; opacity: 0; }
    .delay-2 { animation-delay: 0.2s; opacity: 0; }
    .delay-3 { animation-delay: 0.3s; opacity: 0; }
    .delay-4 { animation-delay: 0.4s; opacity: 0; }
    .delay-5 { animation-delay: 0.5s; opacity: 0; }
    .delay-6 { animation-delay: 0.6s; opacity: 0; }

    /* Divider */
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border), transparent);
      margin: 0 60px;
    }

    @media (max-width: 1024px) {
      nav { padding: 20px 24px; }
      .hero { padding: 120px 24px 80px; }
      .hero-photo { display: none; }
      section { padding: 80px 24px; }
      .prompt-grid { grid-template-columns: 1fr; }
      .skills-grid { grid-template-columns: repeat(2, 1fr); }
      .projects-grid { grid-template-columns: 1fr; }
      .contact-grid { grid-template-columns: 1fr; }
      footer { padding: 24px; flex-direction: column; gap: 8px; text-align: center; }
      .music-section { padding: 40px 24px; flex-direction: column; }
      .stats-row { flex-direction: column; }
      .stat-item { border-right: none; border-bottom: 1px solid var(--border); }
      .stat-item:last-child { border-bottom: none; }
    }
  `}</style>
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState("");
  const fullText = "Software Engineer · Fintech · AI-Augmented Development";

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 6 + "px";
        cursorRef.current.style.top = e.clientY - 6 + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX - 18 + "px";
        ringRef.current.style.top = e.clientY - 18 + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTyped(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <GlobalStyles />
      <div className="scanlines" />
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* NAV */}
      <nav>
        <div className="nav-logo">YH_PORTFOLIO</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#ai">AI & Prompting</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="about">
        <div className="hero-grid-bg" />
        <div className="hero-glow" />
        <div className="hero-glow2" />

        <div className="hero-content">
          <div className="hero-tag fade-up">
            Cairo University · Faculty of Engineering
          </div>
          <h1 className="hero-name fade-up delay-1">
            Youssef <span>El Dorghamy</span>
          </h1>
          <p className="hero-title fade-up delay-2">
            <em>&gt;</em> {typed}
            <span
              style={{
                color: "var(--accent)",
                animation: "fadeUp 0.5s infinite alternate",
              }}
            >
              _
            </span>
          </p>
          <p className="hero-bio fade-up delay-3">
            I'm a Software Engineer with ~4 years of professional experience
            building production-grade Fintech and trading web applications.
            Passionate about writing robust, scalable code — whether it's
            architecting real-time trading platforms, publishing personal apps
            to Google Play, or experimenting with game development on the side.
            I embrace AI-augmented development workflows to ship faster and
            smarter.
          </p>
          <div className="hero-cta fade-up delay-4">
            <a href="#experience" className="btn-primary">
              View Experience
            </a>
            <a href="#contact" className="btn-outline">
              Get In Touch
            </a>
          </div>
        </div>

        {/* Photo placeholder */}
        <div className="hero-photo fade-up delay-5">
          <div className="hero-photo-inner">
            {/* Replace the content below with your photo: <img src="your-photo.jpg" alt="Youssef El Dorghamy" /> */}
            <div className="photo-icon">👤</div>
            <div className="photo-label">
              ← ADD YOUR PHOTO HERE
              <br />
              replace this div with &lt;img&gt;
            </div>
            <div className="hero-photo-overlay" />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* STATS */}
      <section style={{ padding: "60px 60px 0" }}>
        <div className="stats-row fade-up">
          <div className="stat-item">
            <span className="stat-num">4+</span>
            <span className="stat-desc">Years of experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">200K+</span>
            <span className="stat-desc">Daily active traders served</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">40%</span>
            <span className="stat-desc">Server load reduction achieved</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">3</span>
            <span className="stat-desc">Countries worked in / with</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">∞</span>
            <span className="stat-desc">Lines of code & counting</span>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-label">Work History</div>
        <h2 className="section-title">
          Professional <span>Experience</span>
        </h2>

        <div className="exp-grid">
          {/* Al Rajhi Capital */}
          <div className="exp-card">
            <div className="exp-header">
              <div>
                <div className="exp-company">
                  Al Rajhi Capital · Al Rajhi Bank — Riyadh, KSA
                </div>
                <div className="exp-role">Frontend Software Engineer</div>
                <div className="exp-meta">
                  <span>📅 2024 – Present</span>
                  <span>
                    📍 Cairo (on-site Riyadh stints: Feb–Apr 2025, Nov–Dec 2025)
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <span className="exp-badge onsite">CONTRACTED</span>
                <span className="exp-badge">FINTECH · TRADING</span>
              </div>
            </div>
            <p className="exp-desc">
              Contracted through EJADA to Al Rajhi Capital — the investment arm
              of Al Rajhi Bank, one of the largest Islamic banks in the world.
              Embedded in the core product team building the primary stock
              trading and wealth management web platform serving over{" "}
              <strong style={{ color: "var(--text)" }}>
                200,000+ daily active traders
              </strong>
              .
            </p>
            <ul className="bullets">
              <li>
                Architected and delivered high-performance trading dashboards
                with real-time WebSocket data feeds, live order books, and
                interactive charting — used by hundreds of thousands of traders
                daily.
              </li>
              <li>
                Drove a{" "}
                <strong style={{ color: "var(--accent)" }}>
                  40% reduction in server load
                </strong>{" "}
                through strategic caching, query optimizations, and lazy loading
                patterns on the most-trafficked modules.
              </li>
              <li>
                Implemented secure OAuth2 authentication flows and token
                management for a regulated financial services environment.
              </li>
              <li>
                Traveled on-site to Riyadh for product alignment sprints
                (Feb–Apr 2025, Nov–Dec 2025), collaborating directly with
                product owners, designers, and backend teams in an Agile setup.
              </li>
              <li>
                Integrated complex financial data APIs, built reusable component
                libraries, and maintained CI/CD pipelines for zero-downtime
                deployments.
              </li>
            </ul>
            <div className="exp-tags">
              <span className="tag">ReactJS</span>
              <span className="tag">TypeScript</span>
              <span className="tag">WebSockets</span>
              <span className="tag">OAuth2</span>
              <span className="tag">Tailwind CSS</span>
              <span className="tag">REST APIs</span>
              <span className="tag">CI/CD</span>
              <span className="tag orange">Fintech</span>
            </div>
          </div>

          {/* Keepoala */}
          <div className="exp-card">
            <div className="exp-header">
              <div>
                <div className="exp-company">
                  Keepoala — München, Germany (Remote)
                </div>
                <div className="exp-role">Full-Stack Engineer</div>
                <div className="exp-meta">
                  <span>📅 2022 – 2023</span>
                  <span>✈️ Traveled to Munich for team sprint</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <span className="exp-badge remote">REMOTE · GERMANY</span>
                <span className="exp-badge">STARTUP</span>
              </div>
            </div>
            <p className="exp-desc">
              Joined the Munich-based sustainability startup Keepoala as a
              remote full-stack engineer — a fully distributed role with a
              one-week in-person team gathering in Munich. Built the
              consumer-facing mobile app and the internal analytics platform
              from the ground up.
            </p>
            <ul className="bullets">
              <li>
                Developed the{" "}
                <strong style={{ color: "var(--text)" }}>
                  Keepoala mobile app
                </strong>{" "}
                using{" "}
                <strong style={{ color: "var(--accent)" }}>React Native</strong>{" "}
                — cross-platform (iOS & Android), with real-time gamification
                features rewarding sustainable purchase behaviour.
              </li>
              <li>
                Built the{" "}
                <strong style={{ color: "var(--text)" }}>
                  marketing & web platform
                </strong>{" "}
                with Next.js and React, including server-side rendering, SEO
                optimization, and dynamic content pages.
              </li>
              <li>
                Designed and implemented{" "}
                <strong style={{ color: "var(--text)" }}>
                  analytics dashboards
                </strong>{" "}
                using{" "}
                <strong style={{ color: "var(--accent)" }}>R (R-Shiny)</strong>{" "}
                for internal data teams — visualizing user retention, return
                rate insights, and campaign performance.
              </li>
              <li>
                Performed{" "}
                <strong style={{ color: "var(--text)" }}>
                  PostgreSQL query optimizations
                </strong>{" "}
                and wrote complex stored procedures and indexing strategies to
                handle growing dataset sizes efficiently.
              </li>
              <li>
                Worked with Node.js backend services, REST API design, and
                MongoDB for flexible data storage layers.
              </li>
            </ul>
            <div className="exp-tags">
              <span className="tag">React Native</span>
              <span className="tag">Next.js</span>
              <span className="tag">React</span>
              <span className="tag">R / R-Shiny</span>
              <span className="tag">PostgreSQL</span>
              <span className="tag">Node.js</span>
              <span className="tag">MongoDB</span>
              <span className="tag purple">Analytics</span>
              <span className="tag orange">Mobile</span>
            </div>
          </div>

          {/* ShareMagazines */}
          <div className="exp-card">
            <div className="exp-header">
              <div>
                <div className="exp-company">
                  ShareMagazines — Berlin, Germany (Remote)
                </div>
                <div className="exp-role">Frontend Developer</div>
                <div className="exp-meta">
                  <span>📅 2021 – 2022</span>
                  <span>📍 Fully Remote from Cairo</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <span className="exp-badge remote">REMOTE · BERLIN</span>
              </div>
            </div>
            <p className="exp-desc">
              Fully remote frontend role with a Hamburg-based digital publishing
              startup. Led the development of the internal operations dashboard
              and contributed heavily to the product's frontend codebase.
            </p>
            <ul className="bullets">
              <li>
                Built a comprehensive{" "}
                <strong style={{ color: "var(--text)" }}>
                  operations & analytics dashboard
                </strong>{" "}
                using <strong style={{ color: "var(--accent)" }}>Vue.js</strong>{" "}
                — giving the internal team real-time visibility into
                subscription metrics, content performance, and user engagement.
              </li>
              <li>
                Implemented reusable component libraries, state management with
                Vuex, and data visualization integrations for the dashboard.
              </li>
              <li>
                Collaborated closely with the Berlin team across timezones —
                managing async workflows, PR reviews, and sprint cycles entirely
                remotely.
              </li>
              <li>
                Contributed to frontend architecture decisions, performance
                tuning, and cross-browser compatibility across the product
                suite.
              </li>
            </ul>
            <div className="exp-tags">
              <span className="tag">Vue.js</span>
              <span className="tag">Vuex</span>
              <span className="tag">JavaScript</span>
              <span className="tag">CSS3</span>
              <span className="tag">REST APIs</span>
              <span className="tag purple">Dashboards</span>
            </div>
          </div>

          {/* Military */}
          <div className="exp-card" style={{ borderLeftColor: "var(--muted)" }}>
            <div className="exp-header">
              <div>
                <div className="exp-company" style={{ color: "var(--muted)" }}>
                  Kobry El-Kobba Medical Complex — Cairo, Egypt
                </div>
                <div className="exp-role">
                  Software Developer · Mandatory Military Service
                </div>
                <div className="exp-meta">
                  <span>📅 Jun 2023 – May 2024</span>
                </div>
              </div>
              <span className="exp-badge">PUBLIC SECTOR</span>
            </div>
            <p className="exp-desc">
              Served as a Software Developer during mandatory military service,
              building internal data management systems and tooling for a large
              government medical complex.
            </p>
            <ul className="bullets">
              <li>
                Built data management and reporting systems using Python
                scripting, Vue.js, Next.js, and ASP.NET (C#).
              </li>
              <li>
                Designed and maintained Microsoft SQL Server databases with
                stored procedures and reporting queries.
              </li>
            </ul>
            <div className="exp-tags">
              <span className="tag">Python</span>
              <span className="tag">Vue.js</span>
              <span className="tag">ASP.NET C#</span>
              <span className="tag">SQL Server</span>
              <span className="tag">Next.js</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* AI & PROMPTING */}
      <section id="ai">
        <div className="section-label">AI-Augmented Engineering</div>
        <h2 className="section-title">
          Prompt Engineering <span>& AI Workflows</span>
        </h2>

        <p
          style={{
            color: "#64748b",
            fontSize: 16,
            maxWidth: 700,
            lineHeight: 1.8,
            marginBottom: 48,
            fontFamily: "var(--font-mono)",
          }}
        >
          I treat AI as a core part of my engineering toolkit — not a shortcut,
          but a force multiplier. From writing structured Claude rules files to
          orchestrating multi-step Copilot workflows, I've built repeatable
          systems that keep AI output predictable, consistent, and
          production-ready.
        </p>

        <div className="prompt-grid">
          <div className="prompt-card">
            <div className="prompt-card-icon">🤖</div>
            <div className="prompt-card-title">
              Claude Code & Rules Architecture
            </div>
            <div className="prompt-card-desc">
              Write structured{" "}
              <code style={{ color: "var(--accent)" }}>CLAUDE.md</code> rules
              files that encode project conventions, architectural constraints,
              naming standards, and anti-patterns — giving Claude Code a precise
              mental model of the codebase so generated code is idiomatic and
              slots in cleanly on the first pass.
            </div>
            <div className="code-snippet">{`# CLAUDE.md example snippet
## Component Rules
- Use functional components only
- Props typed with TypeScript interfaces
- State via Zustand, not Context for global state
- No inline styles — Tailwind classes only

## File Structure
src/
  components/   # Shared UI
  features/     # Domain modules
  hooks/        # Custom hooks`}</div>
          </div>

          <div className="prompt-card">
            <div className="prompt-card-icon">🔧</div>
            <div className="prompt-card-title">
              GitHub Copilot Workflow Optimization
            </div>
            <div className="prompt-card-desc">
              Leverage GitHub Copilot strategically — using inline
              comment-driven development, structured docstrings as generation
              anchors, and workspace context management to maximize suggestion
              accuracy for complex business logic in trading and financial
              applications.
            </div>
            <div className="code-snippet">{`// Prompt pattern: intent-first comments
// Copilot context anchor ↓
/**
 * Calculate weighted portfolio return
 * @param positions - Array of {symbol, weight, pnl}
 * @returns Weighted avg return as percentage
 * Edge case: skip zero-weight positions
 */
const calcPortfolioReturn = (positions) => {`}</div>
          </div>

          <div className="prompt-card">
            <div className="prompt-card-icon">⚡</div>
            <div className="prompt-card-title">
              Structured Prompt Engineering
            </div>
            <div className="prompt-card-desc">
              Design multi-layered prompts with system personas, constraint
              definitions, output format specs, and chain-of-thought
              scaffolding. Apply these to production workflows: AI-powered meal
              estimation in DietReg, automated code review, and complex data
              transformation pipelines.
            </div>
            <div className="code-snippet">{`System: You are a nutrition analyst.
Output: JSON only, no markdown.
Schema: {calories: int, protein: float,
         carbs: float, fat: float,
         confidence: "high"|"medium"|"low"}
Constraint: Never guess — flag unknowns
            with confidence: "low"`}</div>
          </div>

          <div className="prompt-card">
            <div className="prompt-card-icon">🏗️</div>
            <div className="prompt-card-title">
              AI-Driven Architecture Planning
            </div>
            <div className="prompt-card-desc">
              Use Claude as a thought partner for system design — running
              structured dialogues to evaluate tradeoffs between state
              management approaches, database schemas, API design patterns, and
              deployment strategies before writing a single line of code.
            </div>
          </div>

          <div className="prompt-card">
            <div className="prompt-card-icon">🔄</div>
            <div className="prompt-card-title">
              Iterative Code Refinement Loops
            </div>
            <div className="prompt-card-desc">
              Build AI feedback loops into development: generate → test →
              describe failure mode → refine prompt with constraints →
              regenerate. Applied this to DietReg's Firebase sync architecture,
              achieving optimistic UI with conflict resolution through iterative
              AI-assisted design.
            </div>
          </div>

          <div className="prompt-card">
            <div className="prompt-card-icon">📐</div>
            <div className="prompt-card-title">Context Window Management</div>
            <div className="prompt-card-desc">
              Expert at structuring long-context AI conversations — using
              reference files, summary layers, and conversation resets to
              maintain coherence across multi-hour development sessions without
              losing architectural context or introducing drift.
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SKILLS */}
      <section id="skills">
        <div className="section-label">Technical Stack</div>
        <h2 className="section-title">
          Skills & <span>Technologies</span>
        </h2>

        <div className="skills-grid">
          <div className="skill-group">
            <div className="skill-group-title">Frontend</div>
            <ul className="skill-list">
              <li>React / React Native</li>
              <li>Next.js</li>
              <li>Vue.js / Vuex</li>
              <li>TypeScript / JavaScript</li>
              <li>Tailwind CSS</li>
              <li>Flutter</li>
            </ul>
          </div>
          <div className="skill-group">
            <div className="skill-group-title">Backend & Data</div>
            <ul className="skill-list">
              <li>Node.js</li>
              <li>PostgreSQL + Stored Procs</li>
              <li>MongoDB / Firebase</li>
              <li>Microsoft SQL Server</li>
              <li>ASP.NET / C#</li>
              <li>R / R-Shiny</li>
            </ul>
          </div>
          <div className="skill-group">
            <div className="skill-group-title">Infra & Tools</div>
            <ul className="skill-list">
              <li>Docker</li>
              <li>CI/CD Pipelines</li>
              <li>OAuth2 / WebSockets</li>
              <li>Firebase (Auth, Firestore)</li>
              <li>REST / GraphQL APIs</li>
              <li>Python scripting</li>
            </ul>
          </div>
          <div className="skill-group">
            <div className="skill-group-title">AI & Workflows</div>
            <ul className="skill-list">
              <li>Claude Code</li>
              <li>GitHub Copilot</li>
              <li>Gemini / Cerebras APIs</li>
              <li>Prompt Engineering</li>
              <li>CLAUDE.md Rule Design</li>
              <li>AI-Augmented Dev</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* PERSONAL PROJECTS */}
      <section>
        <div className="section-label">Side Projects</div>
        <h2 className="section-title">
          Personal <span>Builds</span>
        </h2>

        <div className="projects-grid">
          <div className="project-card">
            <div className="project-icon">🥗</div>
            <div className="project-title">DietReg</div>
            <div className="project-sub">PWA · REACT + FIREBASE + AI</div>
            <div className="project-desc">
              A production PWA at diet-reg.web.app — AI-powered nutrition and
              fitness tracker with Gemini/Cerebras meal estimation, weight
              tracking charts, a 500+ item Egyptian food database, workout
              calendar, and Firebase Auth + Firestore. Built, shipped, and
              actively maintained solo.
            </div>
            <div className="exp-tags" style={{ marginTop: 20 }}>
              <span className="tag">Vite + React</span>
              <span className="tag">Firebase</span>
              <span className="tag">Gemini API</span>
              <span className="tag">Recharts</span>
              <span className="tag purple">PWA</span>
            </div>
          </div>

          <div className="project-card">
            <div className="project-icon">🎮</div>
            <div className="project-title">Unity Mobile Game Dev</div>
            <div className="project-sub">UNITY · ANDROID · GAME DESIGN</div>
            <div className="project-desc">
              Building original mobile games in Unity — including a published
              Flappy Bird clone and an original in-development 5×5 color-mixing
              grid puzzle. Publishing to Google Play. Exploring game mechanics,
              UX clarity, and monetization design as a creative outlet alongside
              professional work.
            </div>
            <div className="exp-tags" style={{ marginTop: 20 }}>
              <span className="tag">Unity</span>
              <span className="tag">C#</span>
              <span className="tag orange">Google Play</span>
              <span className="tag purple">Game Design</span>
            </div>
          </div>

          <div className="project-card">
            <div className="project-icon">💒</div>
            <div className="project-title">Wedding Website</div>
            <div className="project-sub">REACT · TAILWIND · GITHUB PAGES</div>
            <div className="project-desc">
              Built a custom wedding RSVP and info site (yuze98.github.io) with
              countdown timer, OurStory section, guest management, and a
              dual-theme Terracotta/Grassy colour system. Because real engineers
              build everything themselves.
            </div>
            <div className="exp-tags" style={{ marginTop: 20 }}>
              <span className="tag">React</span>
              <span className="tag">Tailwind CSS</span>
              <span className="tag purple">GitHub Pages</span>
            </div>
          </div>

          <div className="project-card">
            <div className="project-icon">📚</div>
            <div className="project-title">Always Building</div>
            <div className="project-sub">CODE · SHIP · REPEAT</div>
            <div className="project-desc">
              I believe the best engineers are curious ones. Outside of client
              work I'm constantly experimenting — whether it's a new framework,
              a CLI tool, a browser extension, or the next mobile app. If it can
              be built, I'm probably already sketching it.
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* EDUCATION */}
      <section style={{ padding: "80px 60px" }}>
        <div className="section-label">Academic Background</div>
        <h2 className="section-title" style={{ marginBottom: 32 }}>
          Education
        </h2>
        <div className="edu-card">
          <div>
            <div className="edu-degree">Bachelor of Engineering</div>
            <div
              style={{ fontSize: 16, color: "#94a3b8", margin: "8px 0 12px" }}
            >
              Cairo University · Faculty of Engineering
            </div>
            <div className="edu-uni">Cairo, Egypt · Computer Engineering</div>
          </div>
          <div className="edu-year">CU</div>
        </div>
      </section>

      <div className="divider" />

      {/* MUSIC */}
      <section style={{ padding: "80px 60px" }}>
        <div className="section-label">Beyond The Terminal</div>
        <h2 className="section-title" style={{ marginBottom: 40 }}>
          Music & <span>Guitar</span>
        </h2>

        <div className="music-section">
          <div className="music-visual">
            {[40, 70, 55, 90, 65, 80, 50].map((h, i) => (
              <div
                key={i}
                className="music-bar"
                style={{
                  height: h + "%",
                  animationDelay: i * 0.1 + "s",
                }}
              />
            ))}
          </div>
          <div className="music-text">
            <div className="music-title">Guitarist & Music Producer</div>
            <div className="music-desc">
              When I step away from the keyboard, I pick up a guitar. I write,
              record, and produce music — releasing tracks on{" "}
              <strong style={{ color: "var(--text)" }}>Spotify</strong> and{" "}
              <strong style={{ color: "var(--text)" }}>Anghami</strong>. Music
              and code share the same discipline: structure, creativity, and the
              obsessive pursuit of something that just{" "}
              <em style={{ color: "var(--accent)", fontStyle: "normal" }}>
                works
              </em>
              .
            </div>
            <a
              href="https://linktr.ee/youssefEl Dorghamy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: "inline-block" }}
            >
              🌿 Linktree — Music & More
            </a>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="section-label">Let's Work Together</div>
        <h2 className="section-title" style={{ marginBottom: 60 }}>
          Get In <span>Touch</span>
        </h2>

        <div className="contact-grid">
          <div>
            <div className="contact-headline">
              Open to new
              <br />
              opportunities.
            </div>
            <p className="contact-sub" style={{ marginBottom: 24 }}>
              Whether you're building a Fintech product, need a senior frontend
              engineer, or want to explore what AI-augmented development can do
              for your team — I'd love to talk.
            </p>
            <p className="contact-sub">
              Based in Cairo, Egypt. Available for remote-first roles globally,
              and open to relocation or on-site stints for the right
              opportunity.
            </p>
          </div>

          <div className="contact-links">
            <a href="mailto:youssef.s.dev@gmail.com" className="contact-link">
              <span className="contact-link-icon">✉️</span>
              <div className="contact-link-info">
                <div className="contact-link-label">Email</div>
                <div className="contact-link-value">
                  youssef.s.dev@gmail.com
                </div>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/youssefsnr"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link-icon">💼</span>
              <div className="contact-link-info">
                <div className="contact-link-label">LinkedIn</div>
                <div className="contact-link-value">
                  linkedin.com/in/youssefsnr
                </div>
              </div>
            </a>

            <a
              href="https://github.com/yuze98"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link-icon">🐙</span>
              <div className="contact-link-info">
                <div className="contact-link-label">GitHub</div>
                <div className="contact-link-value">github.com/yuze98</div>
              </div>
            </a>

            <a
              href="https://linktr.ee/youssefEl Dorghamy"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link-icon">🌿</span>
              <div className="contact-link-info">
                <div className="contact-link-label">
                  Linktree · Music · Socials
                </div>
                <div className="contact-link-value">
                  linktr.ee/youssefEl Dorghamy
                </div>
              </div>
            </a>

            <a
              href="https://diet-reg.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link-icon">🚀</span>
              <div className="contact-link-info">
                <div className="contact-link-label">Live Project</div>
                <div className="contact-link-value">diet-reg.web.app</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-copy">
          © 2026 Youssef El Dorghamy · Cairo, Egypt
        </div>
        <div className="footer-made">
          Built with <span>React</span> · Designed with intent
        </div>
      </footer>
    </>
  );
}
