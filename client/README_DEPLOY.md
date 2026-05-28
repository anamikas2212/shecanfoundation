# Frontend Deployment Guide (Vercel)

## 1. Push to GitHub

- Push your `client/` folder to a GitHub repository.

## 2. Deploy on Vercel

- Go to [Vercel](https://vercel.com/)
- Import your GitHub repo
- Set up project as a React/Vite app
- Add environment variable:
  - `VITE_API_URL` (your backend API endpoint, e.g., `https://your-backend.onrender.com/api/contact`)
- Deploy

## 3. Test

- Your frontend will be live at the provided URL (e.g., `https://your-frontend.vercel.app`)
- Test the contact form end-to-end
