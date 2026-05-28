# She Can Foundation – Backend

This is the backend for the She Can Foundation contact form.

## Features

- Node.js (Express) REST API
- MongoDB integration for submissions
- CORS enabled for frontend
- Server-side validation

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally

```bash
npm run dev
```

### 3. Environment Variables

Create a `.env` file:

```
PORT=5000
MONGODB_URI=your-mongodb-uri
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
```

### 4. Deploy

- Push to GitHub and connect to [Render](https://render.com/) or [Railway](https://railway.app/)
- Set environment variables in the dashboard

---

## API

- `POST /api/contact` – Accepts `{ name, email, message }`
