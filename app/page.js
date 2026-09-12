"use client";

import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { defaultPortfolio, readPortfolio } from "../lib/data";

export default function HomePage() {
  const [portfolio, setPortfolio] = useState(defaultPortfolio);

  useEffect(() => setPortfolio(readPortfolio()), []);

  return (
    <main className="portfolio-page">
      <header className="container site-header">
        <nav className="nav">
          <a className="brand" href="#top"><span className="brand-mark">O</span><span>OHUNPOLATOV<span className="brand-dot">.</span>UZ</span></a>
          <div className="nav-links">
            <a href="#projects">Loyihalar</a><a href="#contact">Aloqa</a>
            <a className="button nav-admin" href="/login">Admin <ArrowUpRight size={15} /></a>
          </div>
        </nav>
      </header>

      <section id="top" className="container hero">
        <div className="hero-copy-block">
          <div className="eyebrow">Frontend developer <span className="status-dot" /> {portfolio.profile.availability}</div>
          <h1>Salom, men <span>Olloberdi.</span></h1>
          <p className="hero-copy">{portfolio.profile.bio} Men har bir loyihada foydalanuvchiga qulaylik va toza dizaynni birinchi o‘ringa qo‘yaman.</p>
          <div className="actions"><a className="button" href="#projects">Loyihalarni ko‘rish <ArrowUpRight size={16} /></a><a className="button light" href="#contact">Bog‘lanish</a></div>
        </div>
        <div className="hero-portrait"><img className="portrait-image" src="/images/profile.png" alt="Olloberdi Ohunpolatov" /><div className="portrait-label mono">OLL / 01</div><div className="portrait-note">Interfaces<br />with intent.</div></div>
      </section>

      <section id="projects" className="container section"><div className="section-head"><div className="eyebrow">02 / Loyihalar</div></div><div className="projects">{portfolio.projects.map((project, index) => { const hasLink = project.link && project.link !== "#"; return <article className="project" key={project.id}><div><div className={`project-visual ${project.color}`} style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}>{project.image && <span className="project-image-overlay" />}<span className="project-number mono">0{index + 1}</span><span className="project-arrow"><ArrowUpRight size={22} /></span></div><span className="project-meta">{project.type} · {project.stack}</span><h3>{project.title}</h3><p>{project.description}</p></div><a className="project-link" href={hasLink ? project.link : undefined} target={hasLink ? "_blank" : undefined} rel={hasLink ? "noreferrer" : undefined} aria-disabled={!hasLink}>Loyihani ko‘rish <ArrowUpRight size={14} /></a></article>; })}</div><div className="projects-tech"><div className="eyebrow">Texnologiyalar</div><div className="skills">{portfolio.skills.map((skill) => <span className="skill" key={skill}>{skill}</span>)}</div></div></section>

      <section id="contact" className="container section"><div className="contact"><div><div className="eyebrow">03 / Aloqa</div><h2>Sizning keyingi g‘oyangiz haqida gaplashamizmi?</h2><div className="contact-socials"><a href="https://github.com/ohunpolatovo" aria-label="GitHub"><Github size={18} /></a><a href="https://www.linkedin.com/in/olloberdi-ohunpolatov-7b5276395/" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="https://instagram.com/ohunpolatovv" aria-label="Instagram"><Instagram size={18} /></a><a href="https://t.me/ohunpolatov" aria-label="Telegram"><Send size={18} /></a></div></div><a className="button" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(portfolio.profile.email)}`} target="_blank" rel="noreferrer"><Mail size={16} /> Email yuborish</a></div></section>
      <footer className="container footer"><span>© 2026 {portfolio.profile.name}</span></footer>
    </main>
  );
}
