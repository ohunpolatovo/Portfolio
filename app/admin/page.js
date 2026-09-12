"use client";

import { ArrowLeft, LogOut, Pencil, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { defaultPortfolio, readPortfolio, savePortfolio } from "../../lib/data";

const blankProject = { title: "", type: "Web loyiha", description: "", stack: "React", color: "teal", link: "", image: "" };

export default function AdminPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [project, setProject] = useState(blankProject);
  const [editingId, setEditingId] = useState(null);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setPortfolio(readPortfolio());
    setReady(true);
  }, [router]);

  function updateProfile(event) {
    const next = { ...portfolio, profile: { ...portfolio.profile, [event.target.name]: event.target.value } };
    setPortfolio(next);
    savePortfolio(next);
    setNotice("Profil saqlandi");
  }

  function updateProject(field, value) {
    setProject((current) => ({ ...current, [field]: value }));
  }

  function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateProject("image", reader.result);
    reader.readAsDataURL(file);
  }

  function saveProject(event) {
    event.preventDefault();
    if (!project.title.trim()) return;
    const projects = editingId
      ? portfolio.projects.map((item) => item.id === editingId ? { ...project, id: editingId } : item)
      : [...portfolio.projects, { ...project, id: Date.now() }];
    const next = { ...portfolio, projects };
    setPortfolio(next);
    savePortfolio(next);
    setProject(blankProject);
    setEditingId(null);
    setNotice(editingId ? "Loyiha yangilandi" : "Yangi loyiha qo'shildi");
  }

  function deleteProject(id) {
    const next = { ...portfolio, projects: portfolio.projects.filter((item) => item.id !== id) };
    setPortfolio(next);
    savePortfolio(next);
    setNotice("Loyiha o'chirildi");
  }

  function editProject(item) {
    setEditingId(item.id);
    setProject({ title: item.title, type: item.type, description: item.description, stack: item.stack, color: item.color, link: item.link === "#" ? "" : item.link, image: item.image || "" });
    window.scrollTo({ top: 450, behavior: "smooth" });
  }

  function logout() {
    window.localStorage.removeItem("olloberdi-admin-auth");
    document.cookie = "olloberdi-admin-auth=; path=/; max-age=0; samesite=lax";
    router.push("/login");
  }

  if (!ready) return null;

  return (
    <main className="admin-shell">
      <header className="admin-top"><div className="container"><nav className="nav">
        <a className="brand" href="/"><span className="brand-mark">O/</span> OHUNPOLATOV.UZ <span className="mono admin-brand-label"> / ADMIN</span></a>
        <div className="nav-links"><a href="/"><ArrowLeft size={15} /> Saytni ko'rish</a><button className="button light" onClick={logout}><LogOut size={15} /> Chiqish</button></div>
      </nav></div></header>

      <div className="container admin-main">
        <div className="admin-heading"><div /><span className="mono admin-notice">{notice}</span></div>
        <div className="stats"><div className="stat"><strong>{portfolio.projects.length}</strong><span>LOYIHALAR</span></div><div className="stat"><strong>{portfolio.skills.length}</strong><span>SKILLAR</span></div><div className="stat"><strong>100%</strong><span>LOCAL DATA</span></div></div>

        <div className="admin-grid">
          <section className="panel">
            <h2>Profil ma'lumotlari</h2>
            <div className="field"><label>Ism</label><input name="name" value={portfolio.profile.name} onChange={updateProfile} /></div>
            <div className="field"><label>Kasb</label><input name="role" value={portfolio.profile.role} onChange={updateProfile} /></div>
            <div className="field"><label>Bio</label><textarea name="bio" rows="3" value={portfolio.profile.bio} onChange={updateProfile} /></div>
            <div className="field"><label>Email</label><input name="email" value={portfolio.profile.email} onChange={updateProfile} /></div>
            <div className="field"><label>Lokatsiya</label><input name="location" value={portfolio.profile.location} onChange={updateProfile} /></div>
            <div className="field"><label>Status</label><input name="availability" value={portfolio.profile.availability} onChange={updateProfile} /></div>
          </section>

          <section className="panel">
            <h2>{editingId ? "Loyihani tahrirlash" : "Yangi loyiha qo'shish"}</h2>
            <form onSubmit={saveProject}>
              <div className="field"><label>Nomi</label><input value={project.title} onChange={(event) => updateProject("title", event.target.value)} placeholder="Masalan: Finora Dashboard" required /></div>
              <div className="field"><label>Turi</label><input value={project.type} onChange={(event) => updateProject("type", event.target.value)} /></div>
              <div className="field"><label>Tavsif</label><textarea rows="3" value={project.description} onChange={(event) => updateProject("description", event.target.value)} /></div>
              <div className="field"><label>Stack</label><input value={project.stack} onChange={(event) => updateProject("stack", event.target.value)} /></div>
              <div className="field"><label>Vercel link</label><input type="url" value={project.link} onChange={(event) => updateProject("link", event.target.value)} placeholder="https://loyiha.vercel.app" /></div>
              <div className="field"><label>Loyiha rasmi</label><input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImage} />{project.image && <img className="image-preview" src={project.image} alt="Loyiha preview" />}</div>
              <div className="form-actions"><button className="button" type="submit"><Save size={15} /> {editingId ? "Saqlash" : "Qo'shish"}</button>{editingId && <button className="button light" type="button" onClick={() => { setEditingId(null); setProject(blankProject); }}>Bekor qilish</button>}</div>
            </form>

            <div className="project-list"><h2>Mavjud loyihalar</h2>{portfolio.projects.length === 0 && <div className="empty">Hozircha loyiha yo'q.</div>}{portfolio.projects.map((item) => <div className="project-row" key={item.id}><div><h3>{item.title}</h3><p>{item.type} · {item.stack}</p>{item.link && item.link !== "#" && <a className="admin-project-link" href={item.link} target="_blank" rel="noreferrer">Vercel linkni ochish</a>}</div><div className="row-actions"><button className="icon-button" title="Tahrirlash" onClick={() => editProject(item)}><Pencil size={15} /></button><button className="icon-button" title="O'chirish" onClick={() => deleteProject(item.id)}><Trash2 size={15} /></button></div></div>)}</div>
          </section>
        </div>
      </div>
    </main>
  );
}
