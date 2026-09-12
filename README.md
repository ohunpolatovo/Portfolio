# Olloberdi Portfolio

Next.js App Router asosida tayyorlangan junior frontend developer portfolio. Landing page, localStorage orqali ishlaydigan admin panel va login oqimi mavjud.

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda `http://localhost:3000` manzilini oching.

## Sahifalar

- `/` — portfolio landing page
- `/login` — admin login
- `/admin` — profil va loyihalarni boshqarish

Admin login ma'lumotlarini Git'ga kiritmaslik uchun loyiha ildizida `.env.local` faylini yarating:

```env
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=replace-with-a-long-random-password
```

`.env.example` fayli namuna sifatida berilgan. `.env.local` Git tomonidan ignore qilinadi.

Admin’dagi o‘zgarishlar server bazasiga emas, brauzerning `localStorage` xotirasiga saqlanadi. Bu demo/local loyiha uchun mo‘ljallangan; production’da autentifikatsiya va database ulash kerak.
