# Backend Deployment Guide (Render/Railway)

## 1. Push to GitHub

- Push your `server/` folder to a GitHub repository.

## 2. Deploy on Render

- Go to [Render](https://render.com/)
- Create a new Web Service
- Connect your GitHub repo
- Set build command: `npm install`
- Set start command: `npm start`
- Add environment variables:
  - `PORT` (e.g., 5000)
  - `MONGODB_URI` (from MongoDB Atlas)
  - `ALLOWED_ORIGINS` (your Vercel frontend URL)
- Click Deploy

## 3. Deploy on Railway (Alternative)

- Go to [Railway](https://railway.app/)
- Create a new project, link your repo
- Add environment variables as above
- Deploy

## 4. Test

- Your backend API will be live at the provided URL (e.g., `https://your-backend.onrender.com/api/contact`)
