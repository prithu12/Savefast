# Savefast

Savefast is a full-stack file sharing app with:
- React + Vite frontend
- Node.js + Express backend
- MongoDB for metadata storage
- Cloudinary for file storage

## Project Structure

- `Backend/` - Express API server
- `Frontend/` - React Vite client app

## Features

- Upload files
- List recent files
- Download files
- Delete files using a 4-digit delete code

## Tech Stack

Frontend:
- React
- Vite
- Axios
- Tailwind CSS

Backend:
- Express
- Mongoose
- Multer
- Cloudinary

## Backend Setup

1. Open backend folder:

```bash
cd Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` inside `Backend/` with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET_KEY=your_cloudinary_api_secret
```

4. Run backend:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`.

## Frontend Setup

1. Open frontend folder:

```bash
cd Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` inside `Frontend/` with:

```env
VITE_API_URL=http://localhost:5000
```

4. Run frontend:

```bash
npm run dev
```

## Environment Variables for Vercel (Frontend)

This project uses Vite, so env vars must start with `VITE_`.

In Vercel:
1. Go to Project Settings
2. Open Environment Variables
3. Add:
   - Name: `VITE_API_URL`
   - Value: `https://your-backend.onrender.com`
4. Save and redeploy

## API Base URL in Frontend

Frontend API URL is configured in `Frontend/src/services/fileService.jsx` using:

```js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

## Backend API Routes

Base route:
- `/api/files`

Endpoints:
- `POST /api/files/upload`
- `GET /api/files`
- `GET /api/files/download/:id`
- `DELETE /api/files/:id`

## Notes

- Max upload size is 10MB.
- Allowed file types include JPG, PNG, WEBP, DOC, DOCX, and PDF.
