# She Can Foundation – Frontend

This is the frontend for the She Can Foundation contact form.

## Features

- Responsive, modern UI with 3D animated background
- She Can Foundation color palette
- Name, Email, Message fields
- Client-side validation
- Success message on submit
- API integration with backend

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Deploy

- Push to GitHub and connect to [Vercel](https://vercel.com/)
- Set the backend API URL in `.env`

## Environment Variables

Create a `.env` file:

```
VITE_API_URL=https://your-backend-url.com/api/contact
```

---

## Customization

- Update colors in `tailwind.config.js` if needed
- Edit 3D background in `src/components/Background3D.jsx`
