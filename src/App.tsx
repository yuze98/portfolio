import { useState, useEffect } from "react";
import yuze from "./assets/yuze.jpg";
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --cream: #f5f0e8;
      --parchment: #ede7d9;
      --ink: #1a1612;
      --ink2: #2e2822;
      --gold: #b8862c;
      --gold2: #d4a44a;
      --rust: #8b3a1e;
      --slate: #6b6560;
      --border: rgba(26,22,18,0.12);
      --border-gold: rgba(184,134,44,0.3);
      --font-display: 'Playfair Display', Georgia, serif;
      --font-body: 'DM Sans', sans-serif;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--cream);
      color: var(--ink);
      font-family: var(--font-body);
      overflow-x: hidden;
    }

    ::selection { background: var(--gold); color: var(--cream); }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--parchment); }
    ::-webkit-scrollbar-thumb { background: var(--gold); }

    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 28px 72px;
      transition: all 0.3s;
    }
    nav.scrolled {
      background: rgba(245,240,232,0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
    }
    .nav-wordmark {
      font-family: var(--font-display);
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: var(--ink);
    }
    .nav-wordmark em { font-style: italic; color: var(--gold); }
    .nav-right { display: flex; align-items: center; gap: 40px; }
    .nav-links { display: flex; gap: 32px; }
    .nav-links a {
      font-size: 12px;
      font-weight: 500;
      color: var(--slate);
      text-decoration: none;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--ink); }
    .nav-avail {
      display: flex; align-items: center; gap: 8px;
      font-size: 11px; color: var(--slate);
      letter-spacing: 0.1em; text-transform: uppercase;
    }
    .nav-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #5a9c5a;
      animation: pulse 2s infinite;
    }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

    .hero {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding-top: 100px;
    }
    .hero-left {
      padding: 80px 0 80px 72px;
      display: flex; flex-direction: column; justify-content: center;
      border-right: 1px solid var(--border);
    }
    .hero-right {
      display: flex; flex-direction: column; justify-content: flex-end;
      position: relative; overflow: hidden;
    }
    .hero-issue {
      font-size: 10px; font-weight: 500; letter-spacing: 0.25em;
      text-transform: uppercase; color: var(--gold); margin-bottom: 36px;
      display: flex; align-items: center; gap: 16px;
    }
    .hero-issue::before { content:''; width:32px; height:1px; background:var(--gold); }
    .hero-headline {
      font-family: var(--font-display);
      font-size: clamp(56px, 6vw, 92px);
      font-weight: 900; line-height: 0.93; letter-spacing: -0.02em;
      margin-bottom: 44px;
    }
    .hero-headline em { font-style:italic; font-weight:400; color:var(--gold); display:block; }
    .hero-sep { width:48px; height:2px; background:var(--ink); margin-bottom:32px; }
    .hero-bio {
      font-size:16px; line-height:1.9; color:var(--slate);
      max-width:420px; margin-bottom:52px; font-weight:300;
    }
    .hero-bio strong { color:var(--ink); font-weight:500; }
    .hero-actions { display:flex; gap:16px; }
    .btn-ink {
      padding:16px 36px; background:var(--ink); color:var(--cream);
      font-family:var(--font-body); font-size:12px; font-weight:500;
      letter-spacing:0.15em; text-transform:uppercase; text-decoration:none;
      transition:background 0.25s; border:1px solid var(--ink);
    }
    .btn-ink:hover { background:var(--ink2); }
    .btn-ghost {
      padding:16px 36px; background:transparent; color:var(--ink);
      font-family:var(--font-body); font-size:12px; font-weight:500;
      letter-spacing:0.15em; text-transform:uppercase; text-decoration:none;
      transition:border-color 0.25s; border:1px solid var(--border);
    }
    .btn-ghost:hover { border-color:var(--ink); }

    .hero-photo-frame {
      position:absolute; top:0; left:0; right:0; bottom:0;
      background:var(--parchment);
    }
    .hero-photo-frame img { width:100%; height:100%; object-fit:cover; }
    .hero-placeholder {
      width:100%; height:100%;
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      gap:16px; background:var(--parchment); color:var(--slate);
    }
    .hero-placeholder-icon { font-size:64px; opacity:0.2; }
    .hero-placeholder-text {
      font-size:11px; letter-spacing:0.2em; text-transform:uppercase;
      border:1px dashed var(--border-gold); padding:10px 20px;
      text-align:center; line-height:1.8;
    }
    .hero-caption {
      position:absolute; bottom:0; left:0; right:0;
      padding:20px 32px;
      background:rgba(26,22,18,0.85); backdrop-filter:blur(8px);
      display:flex; justify-content:space-between; align-items:center;
    }
    .hero-caption-l { font-size:11px; color:rgba(245,240,232,0.6); letter-spacing:0.1em; }
    .hero-caption-r { font-family:var(--font-display); font-style:italic; font-size:13px; color:var(--gold2); }

    .ticker-wrap {
      overflow:hidden; padding:14px 0;
      background:var(--ink);
      border-top:1px solid rgba(184,134,44,0.15);
      border-bottom:1px solid rgba(184,134,44,0.15);
    }
    .ticker-inner { display:flex; animation:ticker 32s linear infinite; white-space:nowrap; }
    .ticker-item {
      font-size:11px; font-weight:500; letter-spacing:0.2em; text-transform:uppercase;
      color:rgba(245,240,232,0.55); padding:0 40px;
      display:flex; align-items:center; gap:40px;
    }
    .ticker-item::after { content:'◆'; color:var(--gold); font-size:8px; }
    @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

    .sw { padding:100px 72px; }
    .sw.dark { background:var(--ink2); color:var(--cream); }
    .sw.parch { background:var(--parchment); }

    .overline {
      font-size:10px; font-weight:500; letter-spacing:0.3em; text-transform:uppercase;
      color:var(--gold); margin-bottom:20px;
      display:flex; align-items:center; gap:16px;
    }
    .overline.lt { color:var(--gold2); }
    .overline::before { content:''; width:24px; height:1px; background:currentColor; }

    .ed-title {
      font-family:var(--font-display);
      font-size:clamp(36px, 4.5vw, 66px); font-weight:900;
      line-height:1; letter-spacing:-0.02em; margin-bottom:60px;
    }
    .ed-title em { font-style:italic; font-weight:400; color:var(--gold); }
    .ed-title.lt em { color:var(--gold2); }

    .exp-list { display:flex; flex-direction:column; }
    .exp-item {
      display:grid; grid-template-columns:80px 1fr auto;
      gap:0 40px; padding:48px 0;
      border-bottom:1px solid var(--border);
      position:relative; transition:all 0.3s;
    }
    .exp-item:first-child { border-top:1px solid var(--border); }
    .exp-item::before {
      content:''; position:absolute;
      left:0; top:0; bottom:0; width:0;
      background:var(--gold); transition:width 0.3s;
    }
    .exp-item:hover::before { width:2px; }
    .exp-item:hover { padding-left:16px; }
    .exp-num {
      font-family:var(--font-display); font-size:48px; font-weight:900;
      color:var(--border); line-height:1; padding-top:4px;
      transition:color 0.3s;
    }
    .exp-item:hover .exp-num { color:rgba(184,134,44,0.2); }
    .exp-co {
      font-size:10px; font-weight:500; letter-spacing:0.25em; text-transform:uppercase;
      color:var(--gold); margin-bottom:10px;
    }
    .exp-role {
      font-family:var(--font-display); font-size:26px; font-weight:700;
      margin-bottom:8px; line-height:1.2;
    }
    .exp-loc { font-size:13px; color:var(--slate); margin-bottom:20px; font-weight:300; }
    .exp-p { font-size:14px; color:var(--slate); line-height:1.9; max-width:640px; font-weight:300; }
    .exp-p strong { color:var(--ink); font-weight:500; }
    .exp-bullets { margin-top:20px; display:flex; flex-direction:column; gap:8px; }
    .exp-bullet {
      display:flex; gap:12px; font-size:13px; color:var(--slate); line-height:1.6;
    }
    .exp-bullet::before { content:'—'; color:var(--gold); flex-shrink:0; font-weight:300; }
    .exp-right {
      display:flex; flex-direction:column; align-items:flex-end; gap:12px; padding-top:4px;
    }
    .exp-yr { font-family:var(--font-display); font-style:italic; font-size:13px; color:var(--slate); }
    .pill {
      font-size:10px; font-weight:500; letter-spacing:0.15em; text-transform:uppercase;
      padding:5px 14px; border:1px solid var(--border); color:var(--slate); white-space:nowrap;
    }
    .pill.g { border-color:var(--border-gold); color:var(--gold); }
    .exp-tags { display:flex; flex-wrap:wrap; gap:8px; margin-top:20px; }
    .tag {
      font-size:10px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase;
      padding:4px 10px; background:var(--parchment); color:var(--slate); border:1px solid var(--border);
    }

    .edu-band {
      background:var(--gold); padding:48px 72px;
      display:flex; align-items:center; justify-content:space-between;
    }
    .edu-lbl { font-size:10px; font-weight:500; letter-spacing:0.25em; text-transform:uppercase; color:rgba(26,22,18,0.55); margin-bottom:8px; }
    .edu-deg { font-family:var(--font-display); font-size:28px; font-weight:900; color:var(--ink); }
    .edu-uni { font-family:var(--font-display); font-style:italic; font-size:18px; color:var(--ink2); margin-top:4px; }
    .edu-big { font-family:var(--font-display); font-size:80px; font-weight:900; color:rgba(26,22,18,0.12); line-height:1; }

    .ai-grid {
      display:grid; grid-template-columns:1fr 1fr;
      gap:1px; background:rgba(245,240,232,0.07); margin-top:60px;
    }
    .ai-card {
      background:var(--ink2); padding:44px 40px;
      transition:background 0.3s; position:relative; overflow:hidden;
    }
    .ai-card:hover { background:#26200f; }
    .ai-num {
      font-family:var(--font-display); font-size:80px; font-weight:900;
      color:rgba(184,134,44,0.08); position:absolute; top:16px; right:24px; line-height:1;
    }
    .ai-title { font-family:var(--font-display); font-size:22px; font-weight:700; color:var(--cream); margin-bottom:16px; line-height:1.2; }
    .ai-desc { font-size:13px; color:rgba(245,240,232,0.45); line-height:1.9; font-weight:300; margin-bottom:20px; }
    .ai-code {
      background:rgba(0,0,0,0.5); border:1px solid rgba(184,134,44,0.2);
      padding:16px 20px; font-family:'Courier New',monospace;
      font-size:11px; color:var(--gold2); line-height:1.7; white-space:pre; overflow-x:auto;
    }

    .skills-2col { display:grid; grid-template-columns:1fr 1fr; gap:60px; }
    .sk-col-title { font-family:var(--font-display); font-size:32px; font-weight:700; margin-bottom:36px; line-height:1.1; }
    .sk-col-title em { font-style:italic; font-weight:400; color:var(--gold); }
    .sk-row {
      display:flex; align-items:center; justify-content:space-between;
      padding:16px 0; border-bottom:1px solid var(--border);
    }
    .sk-row:first-of-type { border-top:1px solid var(--border); }
    .sk-name { font-size:14px; font-weight:400; }
    .sk-level { font-family:var(--font-display); font-style:italic; font-size:12px; color:var(--gold); }

    .proj-strip {
      display:grid; grid-template-columns:repeat(3,1fr);
      gap:1px; background:var(--border);
    }
    .proj-tile { background:var(--cream); padding:48px 36px; transition:background 0.3s; }
    .proj-tile:hover { background:var(--parchment); }
    .proj-num { font-family:var(--font-display); font-size:56px; font-weight:900; color:var(--parchment); line-height:1; margin-bottom:24px; }
    .proj-name { font-family:var(--font-display); font-size:22px; font-weight:700; margin-bottom:8px; }
    .proj-sub { font-size:10px; font-weight:500; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); margin-bottom:20px; }
    .proj-desc { font-size:13px; color:var(--slate); line-height:1.9; font-weight:300; }

    .music-spread { display:grid; grid-template-columns:1fr 1fr; min-height:440px; }
    .music-l {
      background:var(--ink); padding:72px;
      display:flex; flex-direction:column; justify-content:center;
      position:relative; overflow:hidden;
    }
    .music-l::before {
      content:'♪'; position:absolute; font-size:300px;
      color:rgba(255,255,255,0.015); bottom:-60px; right:-30px; font-family:serif; line-height:1;
    }
    .music-lbl { font-size:10px; font-weight:500; letter-spacing:0.3em; text-transform:uppercase; color:var(--gold2); margin-bottom:20px; }
    .music-h { font-family:var(--font-display); font-size:clamp(34px,4vw,54px); font-weight:900; color:var(--cream); line-height:1.05; margin-bottom:28px; }
    .music-h em { font-style:italic; font-weight:400; color:var(--gold2); }
    .music-p { font-size:15px; color:rgba(245,240,232,0.5); line-height:1.85; font-weight:300; margin-bottom:40px; max-width:380px; }
    .music-btn {
      display:inline-flex; align-items:center; gap:12px;
      padding:14px 32px; border:1px solid rgba(184,134,44,0.4);
      color:var(--gold2); font-size:12px; font-weight:500;
      letter-spacing:0.15em; text-transform:uppercase; text-decoration:none;
      transition:all 0.25s; width:fit-content;
    }
    .music-btn:hover { background:rgba(184,134,44,0.1); border-color:var(--gold2); }
    .music-r {
      background:var(--parchment);
      display:flex; flex-direction:column; justify-content:center;
      padding:72px; gap:32px;
    }
    .music-plat {
      display:flex; align-items:center; gap:20px;
      padding-bottom:32px; border-bottom:1px solid var(--border);
    }
    .music-plat:last-child { border-bottom:none; padding-bottom:0; }
    .music-plat-icon { font-size:32px; }
    .music-plat-name { font-family:var(--font-display); font-size:20px; font-weight:700; }
    .music-plat-desc { font-size:12px; color:var(--slate); margin-top:2px; font-weight:300; }

    .contact-2col { display:grid; grid-template-columns:1fr 1fr; gap:80px; }
    .contact-h { font-family:var(--font-display); font-size:clamp(38px,4.5vw,68px); font-weight:900; line-height:1; color:var(--cream); margin-bottom:24px; }
    .contact-h em { font-style:italic; font-weight:400; color:var(--gold2); display:block; }
    .contact-sub { font-size:15px; color:rgba(245,240,232,0.4); line-height:1.8; font-weight:300; max-width:360px; }
    .c-links { display:flex; flex-direction:column; }
    .c-row {
      display:flex; align-items:center; gap:20px;
      padding:22px 0; border-bottom:1px solid rgba(245,240,232,0.07);
      text-decoration:none; color:var(--cream);
      transition:all 0.25s;
    }
    .c-row:first-child { border-top:1px solid rgba(245,240,232,0.07); }
    .c-row:hover { padding-left:12px; }
    .c-icon {
      width:44px; height:44px; border:1px solid rgba(245,240,232,0.1);
      display:flex; align-items:center; justify-content:center;
      font-size:18px; flex-shrink:0; transition:border-color 0.25s;
    }
    .c-row:hover .c-icon { border-color:var(--gold2); }
    .c-lbl { font-size:10px; font-weight:500; letter-spacing:0.2em; text-transform:uppercase; color:rgba(245,240,232,0.3); margin-bottom:3px; }
    .c-val { font-size:15px; font-weight:400; }
    .c-arrow { margin-left:auto; color:rgba(245,240,232,0.18); font-size:18px; transition:all 0.25s; }
    .c-row:hover .c-arrow { color:var(--gold2); transform:translateX(6px); }

    footer {
      background:var(--ink); padding:28px 72px;
      display:flex; align-items:center; justify-content:space-between;
      border-top:1px solid rgba(184,134,44,0.18);
    }
    .footer-sig { font-family:var(--font-display); font-style:italic; font-size:15px; color:rgba(245,240,232,0.35); }
    .footer-sig strong { font-style:normal; color:var(--gold2); }
    .footer-r { font-size:11px; letter-spacing:0.15em; text-transform:uppercase; color:rgba(245,240,232,0.18); }

    @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    .au { animation:fadeUp 0.75s ease forwards; opacity:0; }
    .d1{animation-delay:0.1s} .d2{animation-delay:0.22s} .d3{animation-delay:0.36s}
    .d4{animation-delay:0.5s} .d5{animation-delay:0.64s}

    @media(max-width:1024px){
      nav{padding:20px 24px;}
      .hero{grid-template-columns:1fr;}
      .hero-left{padding:80px 24px; border-right:none;}
      .hero-right{height:380px;}
      .sw{padding:72px 24px;}
      .exp-item{grid-template-columns:48px 1fr; gap:0 20px;}
      .exp-right{display:none;}
      .exp-num{font-size:32px;}
      .ai-grid{grid-template-columns:1fr;}
      .skills-2col{grid-template-columns:1fr;}
      .proj-strip{grid-template-columns:1fr;}
      .music-spread{grid-template-columns:1fr;}
      .music-l,.music-r{padding:48px 24px;}
      .contact-2col{grid-template-columns:1fr;}
      .edu-band{padding:40px 24px;}
      .edu-big{display:none;}
      footer{padding:24px; flex-direction:column; gap:8px; text-align:center;}
    }
      .text-ink { color: var(--ink); }
  `}</style>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const tickers = Array(2)
    .fill([
      "Software Engineer",
      "Cairo University",
      "Fintech & Trading",
      "React · TypeScript",
      "Al Rajhi Capital",
      "Remote — Germany",
      "AI-Augmented Dev",
      "Prompt Engineer",
      "Mobile & Web",
    ])
    .flat();

  return (
    <>
      <GlobalStyles />

      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-wordmark">
          Youssef <em>El Dorghamy</em>
        </div>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#experience">Work</a>
            <a href="#ai">AI</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="nav-avail">
            <span className="nav-dot" />
            Available
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-left">
          <div className="hero-issue au d1">Portfolio · 2026 Edition</div>
          <h1 className="hero-headline au d2">
            <span className="text-ink"> Youssef</span>
            <br />
            <em>El Dorghamy.</em>
          </h1>
          <div className="hero-sep au d3" />
          <p className="hero-bio au d3">
            Software Engineer with <strong>~4 years</strong> building production
            Fintech platforms, cross-platform mobile apps, and data-rich
            dashboards. Cairo-based, globally-minded — worked remotely for teams
            in <strong>Germany</strong>, traveled on-site to{" "}
            <strong>Saudi Arabia</strong>, shipping code that reaches
            <strong> 200K+ daily users</strong>. Obsessed with{" "}
            <strong>robust, scalable systems</strong> and AI-augmented
            development.
          </p>
          <div className="hero-actions au d4">
            <a href="#experience" className="btn-ink">
              Read My Story
            </a>
            <a href="#contact" className="btn-ghost">
              Get in Touch
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-photo-frame">
            {/* ↓ Replace this block with: <img src="your-photo.jpg" alt="Youssef El Dorghamy" /> */}
            <img src={yuze} alt="Youssef El Dorghamy" />
          </div>
          <div className="hero-caption">
            <div className="hero-caption-l">
              Cairo, Egypt · Open to Relocation
            </div>
            <div className="hero-caption-r">
              Cairo University · Faculty of Engineering
            </div>
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {tickers.map((t, i) => (
            <div key={i} className="ticker-item">
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* EXPERIENCE */}
      <div className="sw" id="experience">
        <div className="overline">Selected Experience</div>
        <h2 className="text-ink ed-title">
          Where I've
          <br />
          <em>Done The Work</em>
        </h2>
        <div className="exp-list">
          <div className="exp-item">
            <div className="exp-num">01</div>
            <div>
              <div className="exp-co">Al Rajhi Capital · Al Rajhi Bank</div>
              <div className="exp-role">Frontend Software Engineer</div>
              <div className="exp-loc">
                Riyadh, KSA · Contracted via EJADA · Cairo-based with on-site
                stints (Feb–Apr 2025, Nov–Dec 2025)
              </div>
              <p className="exp-p">
                Embedded with the product team of one of the world's largest
                Islamic banks — building the core stock trading and wealth
                management platform. Every component ships to
                <strong> 200,000+ daily active traders</strong>.
                Mission-critical, high-stakes, real-time. Traveled to Riyadh
                twice for product sprints and stakeholder alignment.
              </p>
              <div className="exp-bullets">
                <div className="exp-bullet">
                  Architected real-time trading dashboards with WebSocket feeds,
                  live order books, and interactive charting
                </div>
                <div className="exp-bullet">
                  Drove a <strong>40% server load reduction</strong> through
                  caching, query optimization, and lazy loading strategies
                </div>
                <div className="exp-bullet">
                  Implemented OAuth2 authentication flows and managed CI/CD
                  pipelines for zero-downtime deployments
                </div>
                <div className="exp-bullet">
                  Built reusable TypeScript component libraries maintained
                  across a production monorepo
                </div>
              </div>
              <div className="exp-tags">
                <span className="tag">React</span>
                <span className="tag">TypeScript</span>
                <span className="tag">WebSockets</span>
                <span className="tag">OAuth2</span>
                <span className="tag">Tailwind</span>
                <span className="tag">CI/CD</span>
              </div>
            </div>
            <div className="exp-right">
              <div className="exp-yr">2024 – Present</div>
              <span className="pill g">Fintech</span>
              <span className="pill">On-Site · KSA</span>
            </div>
          </div>

          <div className="exp-item">
            <div className="exp-num">02</div>
            <div>
              <div className="exp-co">Keepoala — München, Germany</div>
              <div className="exp-role">Full-Stack Engineer</div>
              <div className="exp-loc">
                Fully Remote · Cairo → Munich (1-week in-person team sprint)
              </div>
              <p className="exp-p">
                Joined a Munich-based sustainability startup to build the
                consumer mobile app, web platform, and internal analytics suite
                from scratch. Remote-first work with a transatlantic sprint —
                flew to Munich to collaborate in person with the team.
              </p>
              <div className="exp-bullets">
                <div className="exp-bullet">
                  Built the <strong>Keepoala React Native app</strong> —
                  cross-platform, gamified sustainable shopping rewards
                </div>
                <div className="exp-bullet">
                  Developed the marketing web platform in Next.js with SSR, SEO,
                  and dynamic content pipelines
                </div>
                <div className="exp-bullet">
                  Designed <strong>R-Shiny analytics dashboards</strong> —
                  retention, return rate, and campaign performance for internal
                  teams
                </div>
                <div className="exp-bullet">
                  PostgreSQL query optimizations, stored procedures, and
                  indexing strategies for growing datasets
                </div>
                <div className="exp-bullet">
                  Node.js backend services, REST API design, MongoDB flexible
                  data layers
                </div>
              </div>
              <div className="exp-tags">
                <span className="tag">React Native</span>
                <span className="tag">Next.js</span>
                <span className="tag">R / R-Shiny</span>
                <span className="tag">PostgreSQL</span>
                <span className="tag">Node.js</span>
                <span className="tag">MongoDB</span>
              </div>
            </div>
            <div className="exp-right">
              <div className="exp-yr">2022 – 2023</div>
              <span className="pill g">Remote · DE</span>
              <span className="pill">Mobile & Web</span>
            </div>
          </div>

          <div className="exp-item">
            <div className="exp-num">03</div>
            <div>
              <div className="exp-co">ShareMagazines — Berlin, Germany</div>
              <div className="exp-role">Frontend Developer</div>
              <div className="exp-loc">Fully Remote · Cairo → Berlin</div>
              <p className="exp-p">
                Frontend role at a Berlin digital publishing startup. Led
                development of the internal operations dashboard and contributed
                to component architecture — full async collaboration across
                timezones.
              </p>
              <div className="exp-bullets">
                <div className="exp-bullet">
                  Built a Vue.js operations & analytics dashboard —
                  subscriptions, content performance, user engagement in real
                  time
                </div>
                <div className="exp-bullet">
                  Implemented reusable component libraries, Vuex state
                  management, and data visualization integrations
                </div>
                <div className="exp-bullet">
                  Led frontend architecture decisions, performance tuning, and
                  cross-browser compatibility
                </div>
              </div>
              <div className="exp-tags">
                <span className="tag">Vue.js</span>
                <span className="tag">Vuex</span>
                <span className="tag">JavaScript</span>
                <span className="tag">CSS3</span>
              </div>
            </div>
            <div className="exp-right">
              <div className="exp-yr">2021 – 2022</div>
              <span className="pill g">Remote · DE</span>
              <span className="pill">Dashboards</span>
            </div>
          </div>

          <div className="exp-item">
            <div className="exp-num">04</div>
            <div>
              <div className="exp-co">Kobry El-Kobba Medical Complex</div>
              <div className="exp-role">
                Software Developer · Mandatory Military Service
              </div>
              <div className="exp-loc">Cairo, Egypt · Jun 2023 – May 2024</div>
              <p className="exp-p">
                Built data management systems and internal tooling for a large
                government medical complex during mandatory military service.
              </p>
              <div className="exp-tags">
                <span className="tag">Python</span>
                <span className="tag">Vue.js</span>
                <span className="tag">ASP.NET C#</span>
                <span className="tag">SQL Server</span>
                <span className="tag">Next.js</span>
              </div>
            </div>
            <div className="exp-right">
              <div className="exp-yr">2023 – 2024</div>
              <span className="pill">Public Sector</span>
            </div>
          </div>
        </div>
      </div>

      {/* EDUCATION BAND */}
      <div className="edu-band">
        <div>
          <div className="edu-lbl">Academic Background</div>
          <div className="edu-deg">Bachelor of Engineering</div>
          <div className="edu-uni">
            Cairo University · Faculty of Engineering
          </div>
        </div>
        <div className="edu-big">CU</div>
      </div>

      {/* AI */}
      <div className="sw dark" id="ai">
        <div className="overline lt">AI-Augmented Engineering</div>
        <h2 className="ed-title lt">
          Prompt Engineering
          <br />
          <em>& AI Workflows</em>
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "rgba(245,240,232,0.4)",
            lineHeight: 1.85,
            maxWidth: 640,
            fontWeight: 300,
          }}
        >
          I treat AI as a core engineering discipline — not a shortcut but a
          multiplier. Structured rules, repeatable workflows, and deliberate
          prompt architecture keep AI output predictable and production-ready.
        </p>
        <div className="ai-grid">
          {[
            {
              n: "I",
              title: "Claude Code & Rules Architecture",
              desc: "Author CLAUDE.md files encoding project conventions, architectural constraints, naming standards, and anti-patterns — so generated code is idiomatic and production-ready on the first pass.",
              code: `# CLAUDE.md
## Stack Rules
- Functional components only
- Props via TypeScript interfaces  
- State: Zustand (not Context)
- No inline styles — Tailwind only

## Anti-patterns to avoid
- useEffect for data fetching
- any type assertions`,
            },
            {
              n: "II",
              title: "GitHub Copilot Workflow Mastery",
              desc: "Intent-first comment patterns, docstring anchors, and workspace context management to maximize Copilot accuracy for complex business logic in financial and trading applications.",
              code: `/**
 * Weighted portfolio return
 * @param positions [{symbol, weight, pnl}]
 * @returns avg return as %
 * Edge: skip zero-weight positions
 */
const calcReturn = (positions) => {
  // Copilot accuracy: ~95% from here`,
            },
            {
              n: "III",
              title: "Structured Prompt Engineering",
              desc: "Multi-layered prompts with system personas, constraint blocks, output format specs, and chain-of-thought scaffolding — applied to AI meal estimation in DietReg and data pipelines.",
              code: `System: Nutrition analyst. JSON only.
Schema: {calories, protein, carbs,
         fat, confidence: high|med|low}
Rule: Flag unknowns as low confidence.
      Never hallucinate portions.`,
            },
            {
              n: "IV",
              title: "Iterative Refinement Loops",
              desc: "Generate → test → describe failure → refine constraints → regenerate. Applied to DietReg's Firebase sync architecture, achieving optimistic UI with conflict resolution through AI-assisted iteration.",
            },
            {
              n: "V",
              title: "AI Architecture Planning",
              desc: "Use Claude as a thought partner for system design — evaluating tradeoffs between state management, database schemas, and API design patterns before writing a single line of code.",
            },
            {
              n: "VI",
              title: "Multi-Model Orchestration",
              desc: "Integrate Gemini, Cerebras, and Claude APIs in production — selecting models by latency, cost, and capability. DietReg runs a hybrid model routing strategy for meal estimation at scale.",
            },
          ].map(({ n, title, desc, code }) => (
            <div className="ai-card" key={n}>
              <div className="ai-num">{n}</div>
              <div className="ai-title">{title}</div>
              <div className="ai-desc">{desc}</div>
              {code && <div className="ai-code">{code}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* SKILLS */}
      <div className="sw parch">
        <div className="overline">Technical Stack</div>
        <div className="skills-2col">
          <div>
            <div className="sk-col-title">
              Frontend &<br />
              <em>Mobile</em>
            </div>
            {[
              ["React / React Native", "Expert"],
              ["Next.js", "Expert"],
              ["Vue.js / Vuex", "Advanced"],
              ["TypeScript", "Expert"],
              ["Tailwind CSS", "Expert"],
              ["Flutter", "Intermediate"],
            ].map(([n, l]) => (
              <div className="sk-row" key={n}>
                <span className="sk-name">{n}</span>
                <span className="sk-level">{l}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="sk-col-title">
              Backend, Data
              <br />
              <em>& AI</em>
            </div>
            {[
              ["Node.js", "Advanced"],
              ["PostgreSQL + Stored Procedures", "Advanced"],
              ["R / R-Shiny", "Advanced"],
              ["Firebase / MongoDB", "Expert"],
              ["Claude Code + Copilot", "Expert"],
              ["Python scripting", "Intermediate"],
            ].map(([n, l]) => (
              <div className="sk-row" key={n}>
                <span className="sk-name">{n}</span>
                <span className="sk-level">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      <div className="sw" id="projects">
        <div className="overline">Side Projects</div>
        <h2 className="ed-title text-ink">
          Built for
          <br />
          <em>The Love of It</em>
        </h2>
        <div className="proj-strip">
          {[
            {
              n: "01",
              name: "DietReg",
              sub: "PWA · React + Firebase + AI",
              desc: "Production PWA at diet-reg.web.app — AI-powered nutrition tracker with Gemini/Cerebras meal estimation, 500+ Egyptian food database, weight charts, workout calendar, and Firebase backend. Solo-built and maintained.",
            },
            {
              n: "02",
              name: "Block Match",
              sub: "Unity · C# · Google Play",
              desc: "Building original mobile games in Unity — a fun Flappy Bird clone and a published original 5×5 color-mixing grid puzzle. Exploring game mechanics, UX clarity, and monetization. Publishing to Google Play.",
            },
            {
              n: "03",
              name: "Wedding Site",
              sub: "React · Tailwind · GitHub Pages",
              desc: "Custom wedding RSVP site with countdown, OurStory section, guest management, and a dual-theme colour system. Because real engineers build everything themselves.",
            },
          ].map(({ n, name, sub, desc }) => (
            <div className="proj-tile" key={n}>
              <div className="proj-num">{n}</div>
              <div className="proj-name">{name}</div>
              <div className="proj-sub">{sub}</div>
              <div className="proj-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MUSIC */}
      <div className="music-spread">
        <div className="music-l">
          <div className="music-lbl">Beyond The Code</div>
          <h2 className="music-h">
            Guitarist &<br />
            <em>Music Maker</em>
          </h2>
          <p className="music-p">
            When I step away from the keyboard, I pick up a guitar. I write,
            record, and produce music — releasing on Spotify and Anghami. Music
            and code share the same obsession: structure, creativity, and the
            relentless pursuit of something that just{" "}
            <em style={{ color: "var(--gold2)", fontStyle: "normal" }}>
              works
            </em>
            .
          </p>
          <a
            href="https://linktr.ee/yuze98"
            target="_blank"
            rel="noopener noreferrer"
            className="music-btn"
          >
            🌿 Linktree — Music & More →
          </a>
        </div>
        <div className="music-r">
          {[
            { icon: "🎵", name: "Spotify", desc: "Original tracks & releases" },
            {
              icon: "🎶",
              name: "Anghami",
              desc: "Music on the Arab world's platform",
            },
            {
              icon: "🎸",
              name: "Guitar",
              desc: "Writing, recording, producing",
            },
          ].map(({ icon, name, desc }) => (
            <div className="music-plat" key={name}>
              <div className="music-plat-icon">{icon}</div>
              <div>
                <div className="music-plat-name">{name}</div>
                <div className="music-plat-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <div className="sw dark" id="contact">
        <div className="contact-2col">
          <div>
            <div className="overline lt" style={{ marginBottom: 28 }}>
              Let's Work Together
            </div>
            <h2 className="contact-h">
              Open to
              <br />
              <em>Great Work.</em>
            </h2>
            <p className="contact-sub">
              Building Fintech? Need a senior frontend engineer who ships?
              Exploring AI-augmented development? Cairo-based, globally
              available — remote-first, open to relocation or on-site.
            </p>
          </div>
          <div className="c-links">
            {[
              {
                icon: "✉️",
                lbl: "Email",
                val: "yhmourad98@gmail.com",
                href: "mailto:yhmourad98@gmail.com",
              },
              {
                icon: "💼",
                lbl: "LinkedIn",
                val: "https://www.linkedin.com/in/youssef-hatem-050b271a2/",
                href: "https://www.linkedin.com/in/youssef-hatem-050b271a2/",
              },
              {
                icon: "🐙",
                lbl: "GitHub",
                val: "github.com/yuze98",
                href: "https://github.com/yuze98",
              },
              {
                icon: "🌿",
                lbl: "Linktree · Music & Socials",
                val: "linktr.ee/yuze98",
                href: "https://linktr.ee/yuze98",
              },
              {
                icon: "🚀",
                lbl: "Live Project · DietReg",
                val: "diet-reg.web.app",
                href: "https://diet-reg.web.app",
              },
            ].map(({ icon, lbl, val, href }) => (
              <a
                key={lbl}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="c-row"
              >
                <div className="c-icon">{icon}</div>
                <div>
                  <div className="c-lbl">{lbl}</div>
                  <div className="c-val">{val}</div>
                </div>
                <div className="c-arrow">→</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-sig">
          <strong>Youssef El Dorghamy</strong> — Cairo, Egypt · 2026
        </div>
        <div className="footer-r">Software Engineer · Cairo University</div>
      </footer>
    </>
  );
}
