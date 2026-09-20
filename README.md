# 📰 Daily News — MERN Full-Stack News Portal

A complete full-stack news portal built with **MongoDB, Express.js, React.js, Node.js** (MERN Stack).

## ✨ Features

- 🏠 **Home Page** — 5 sections: Hero, Top 6 News, Sports, Business, Technology
- 📰 **All News Page** — Browse all news with category filter
- 📄 **Single News Details Page**
- 🔐 **User Registration & Login** (JWT Authentication)
- ✍️ **Registered users can Create, Edit & Delete their own news**
- 👤 **User Dashboard** — Update profile info (name, phone, address, bio, password)
- 📬 **Contact Us Page**
- 🎨 Responsive design with **Tailwind CSS**
- 🗃️ State management with **Zustand**

## 🛠️ Tech Stack

| Frontend | Backend |
|---|---|
| React.js (Vite) | Node.js + Express.js |
| Tailwind CSS | MongoDB + Mongoose |
| Zustand | JWT + bcryptjs |
| Axios, React Router | dotenv, cors |

## 📁 Project Structure

```
news-portal/
├── backend/
│   ├── config/db.js
│   ├── middleware/auth.js
│   ├── models/User.js
│   ├── models/News.js
│   ├── routes/authRoutes.js
│   ├── routes/newsRoutes.js
│   ├── routes/userRoutes.js
│   ├── seed.js
│   ├── server.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── components/Header.jsx, Footer.jsx, NewsCard.jsx
    │   ├── pages/Home.jsx, News.jsx, NewsDetails.jsx, Login.jsx,
    │   │       Register.jsx, CreateNews.jsx, EditNews.jsx,
    │   │       Dashboard.jsx, Contact.jsx
    │   ├── store/useStore.js
    │   ├── App.jsx, main.jsx, index.css
    └── index.html
```

## 🚀 Run Locally

### 1. Backend

```bash
cd backend
npm install
# Edit .env → put your real MongoDB Atlas connection string in MONGO_URI
npm run seed    # Insert 12 sample news + admin user
npm run dev     # Server runs on http://localhost:5000
```

### 2. Frontend (new terminal)

```bash
cd frontend
npm install
npm run dev     # App runs on http://localhost:5173
```

## 🔑 Demo Account (after seed)

- Email: `admin@example.com`
- Password: `123456`

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/news | Get all news |
| GET | /api/news/top | Get top 6 news |
| GET | /api/news/:id | Get single news |
| POST | /api/news | Create news (protected) |
| PUT | /api/news/:id | Update own news (protected) |
| DELETE | /api/news/:id | Delete own news (protected) |
| GET | /api/news/my/news | Get my news (protected) |
| GET | /api/users/profile | Get profile (protected) |
| PUT | /api/users/profile | Update profile (protected) |

## 🌐 Deployment

- **Backend** → Render (Web Service, root: `backend`, build: `npm install`, start: `npm start`)
- **Frontend** → Vercel (root: `frontend`) — after backend deploy, update `baseURL` in `src/api/axios.js` with the Render URL.
