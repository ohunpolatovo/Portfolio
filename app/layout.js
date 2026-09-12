import "./globals.css";

export const metadata = {
  title: "Olloberdi | Frontend Developer",
  description: "Junior frontend developer portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}