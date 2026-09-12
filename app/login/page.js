"use client";

import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/admin");
      return;
    }
    setError("Email yoki parol noto‘g‘ri.");
  }

  return <main className="auth-shell"><section className="auth-box"><a className="brand" href="/"><span className="brand-mark">O</span><span>OHUNPOLATOV<span className="brand-dot">.</span>UZ</span></a><div className="auth-content"><h1>Portfolio’ni boshqaring.</h1><p>Loyihalar va profil ma’lumotlarini shu panel orqali yangilang.</p><form onSubmit={handleSubmit}><div className="field"><label htmlFor="email">Email</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div><div className="field"><label htmlFor="password">Parol</label><input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>{error && <div className="error">{error}</div>}<button className="button" type="submit"><LockKeyhole size={16} /> Kirish</button></form><a className="button light" style={{ marginTop: 12 }} href="/"><ArrowLeft size={15} /> Saytga qaytish</a></div></section></main>;
}
