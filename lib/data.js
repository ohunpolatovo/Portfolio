export const defaultPortfolio = {
  profile: {
    name: "Olloberdi Ohunpolatov",
    role: "Junior Frontend Developer",
    bio: "Foydalanuvchi uchun sodda, tez va xarakterli web interfeyslar yarataman.",
    location: "Andijon, O'zbekiston",
    email: "ohunpolatov.o@gmail.com",
    availability: "Yangi loyihalar uchun ochiqman",
  },
  skills: ["HTML / CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Git"],
  projects: [
    { id: 1, title: "Finora Dashboard", type: "SaaS platform", description: "Moliyaviy ma'lumotlarni oddiy va tushunarli ko'rsatadigan dashboard.", stack: "Next.js · Recharts", color: "amber", link: "#" },
    { id: 2, title: "Noshir Coffee", type: "E-commerce", description: "Mahalliy qahva brendi uchun konversiyaga yo'naltirilgan do'kon.", stack: "React · Tailwind", color: "teal", link: "#" },
    { id: 3, title: "Oqtepa Studio", type: "Creative website", description: "Ijodiy studiya ishlarini namoyish qiluvchi yengil portfolio.", stack: "HTML · JavaScript", color: "coral", link: "#" },
  ],
};

export const STORAGE_KEY = "olloberdi-portfolio-data";

export function readPortfolio() {
  if (typeof window === "undefined") return defaultPortfolio;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : defaultPortfolio;
}

export function savePortfolio(data) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}