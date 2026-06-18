# Blogify – MERN Stack Blogging Platform

A full-stack blogging web application built using MongoDB, Express.js, React.js, and Node.js (MERN Stack).
Blogify allows users to create, edit, delete, and view blog posts with authentication, image uploads, and a modern responsive UI.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Component Breakdown](#component-breakdown)
- [Key Concepts to Learn](#key-concepts-to-learn)
- [Environment Variables](#environment-variables)
- [Roadmap / Bonus Features](#roadmap--bonus-features)
- [Contributing](#contributing)

---

## Project Overview

Blogify is a full-stack blogging platform where users can create and manage blog posts. It uses:

React for frontend UI
Node.js + Express for backend API
MongoDB for database
JWT for authentication
Multer for image uploads

It is designed as a **beginner MERN stack project** to help interns understand how the four layers of the stack communicate with each other: the React frontend calls Express API routes, which talk to MongoDB through Mongoose, all running on a Node.js server.

---

## Features

- Create, edit, delete blog posts
  -📰 View all posts in feed
  -👤 User authentication (login/register)
  -🔐 Protected routes using JWT
  -📤 Image upload using Multer
  -💬 Comment system
  -📱 Fully responsive UI
  -⚡ Fast REST API
  -📊 Dashboard for user posts

---

## Tech Stack

| Layer       | Technology              | Purpose        |
| ----------- | ----------------------- | -------------- |
| Frontend    | React.js + Tailwind CSS | UI & styling   |
| Backend     | Node.js + Express.js    | REST API       |
| Database    | MongoDB + Mongoose      | Data storage   |
| Auth        | JWT                     | Authentication |
| Uploads     | Multer                  | Image handling |
| HTTP Client | Axios                   | API calls      |

---

## Project Structure

```
blogify/
│
├── backend/
│   ├── app.js                      # Main server + DB connection
│   │
│   ├── middleware/
│   │   └── verifyToken.js         # JWT authentication middleware
│   │   └── multer.js
│   │
│   ├── services/
│   │   └── storageService.js      # File upload logic
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   ├── postModel.js
│   │   └── commentModel.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── commentRoutes.js
│   │   └── userRoutes.js
│   │
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AboutUs.jsx
│   │   │   ├── ContactUs.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── RichTextEditor.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── EditPost.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MyPosts.jsx
│   │   │   └── Overview.jsx
│   │   │
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

### Clone the Repository

```bash
git clone https://github.com/your-username/mern-media-player.git
cd mern-media-player
```

---

## Backend Setup

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file (see Environment Variables section)
cp .env.example .env

# Start the development server
npm run dev
```

The backend will run on `http://localhost:5001`.

### Backend Dependencies

```bash
npm install express mongoose dotenv cors jsonwebtoken bcryptjs
npm install --save-dev nodemon
```

### `app.js` — Entry Point

````js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
dotenv.config();
const app = express();

//CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

//  Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // stop server if DB fails
  });

---

## Frontend Setup

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
````

The frontend will run on `http://localhost:5173`.

### Frontend Dependencies

```bash
npm install axios react-router-dom
```

### `services/api.js` — Axios Configuration

```js
import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});

apiRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

---

## Database Setup

### Song Schema — `models/commentModel.js`

```js
import mongoose from "mongoose";
//  Comment Schema
const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Comment", commentSchema);
```

### Playlist Schema — `models/postModel.js`

```js
import mongoose from "mongoose";
//  Post Schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: false,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    published: {
      type: Boolean,
      default: true,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Post", postSchema);
```

### User Schema — `models/UserModel.js`

```js
import mongoose from "mongoose";
//  User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);
export default mongoose.model("User", userSchema);
```

---

## API Endpoints

## 4. Backend API Endpoints (Express.js)

| Method | Endpoint                    | Description                   | Authentication |
| ------ | --------------------------- | ----------------------------- | -------------- |
| POST   | /api/auth/register          | Register new user             | No             |
| POST   | /api/auth/login             | Login → returns JWT           | No             |
| GET    | /api/auth/me                | Get logged-in user            | Yes            |
| GET    | /api/posts                  | Get all published posts       | No             |
| GET    | /api/posts/:id              | Get single post + comments    | No             |
| POST   | /api/posts                  | Create new post               | Yes (author)   |
| PUT    | /api/posts/:id              | Edit post (author only)       | Yes            |
| DELETE | /api/posts/:id              | Delete post (author/admin)    | Yes            |
| GET    | /api/posts/user/me          | Get current user’s posts      | Yes            |
| POST   | /api/posts/:postId/comments | Add comment to post           | Yes            |
| DELETE | /api/comments/:id           | Delete comment (author/admin) | Yes            |

## Component Breakdown

### `Player.jsx` — Media Player Core

The main player uses the browser's built-in HTML5 `<audio>` element via the `useRef` hook.

```jsx
###Code Overview
import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
📡 Data Fetching
useEffect(() => {
  fetch("http://localhost:5001/api/posts")
    .then((res) => res.json())
    .then((data) => {
      setPosts(Array.isArray(data) ? data : []);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);

###🔎 Search Functionality
const location = useLocation();
const search = new URLSearchParams(location.search).get("search") || "";

const filteredPosts = posts.filter((post) => {
  const title = post.title?.toLowerCase() || "";
  const description =
    post.description?.replace(/<[^>]*>/g, "").toLowerCase() || "";

  return (
    title.includes(search.toLowerCase()) ||
    description.includes(search.toLowerCase())
  );
});

##⏳ Loading State
if (loading) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="h-64 bg-purple-100 animate-pulse rounded-xl" />
      ))}
    </div>
  );
}
🧱 Post Card UI
<Link to={`/posts/${post._id}`}>
  <img src={post.image} alt={post.title} />

  <h2>{post.title}</h2>

  <div
    dangerouslySetInnerHTML={{ __html: post.description }}
  />

  <div>
    <span>{post.author?.username || "Unknown"}</span>
    <span>{post.comments?.length || 0} comments</span>
  </div>
</Link>
```

---

## Key Concepts to Learn

Working through this project will teach you the following concepts:

### React.js
- Functional components and JSX
- `useState` and `useEffect` hooks
- `useLocation` (URL query handling for search)
- Conditional rendering (loading, empty states)
- Array filtering and rendering lists
- Component-based architecture (PostCard, Header, etc.)

### Node.js & Express.js
- Setting up an Express server
- Creating REST API routes and controllers
- Using middleware (CORS, JSON body parser, JWT auth)
- Separating concerns: routes → controllers → models
- Handling authentication-protected routes

### MongoDB & Mongoose
- Defining schemas and models (User, Post, Comment)
- CRUD operations (Create, Read, Update, Delete)
- Referencing documents using `ObjectId`
- Using `populate()` for relational data (author, comments)
- Schema validation and timestamps

### API Authentication (JWT)
- Hashing passwords with `bcryptjs`
- Generating JWT tokens on login/register
- Protecting routes using middleware
- Sending tokens via `Authorization` headers
- Storing token in `localStorage`

## ⚙️ Environment Variables

Create a `.env` file inside the `/backend` folder:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/blog-website
JWT_SECRET=your_super_secret_key_here
⚠️ Make sure to add .env to .gitignore before pushing to GitHub.

###🚀 Roadmap / Bonus Features

Once your blog is working, you can upgrade it into a production-level project:

- Add rich text editor (Quill / TipTap)
- Add image upload (Cloudinary / AWS S3)
- Add likes & reactions system
- Add tags & categories filtering
- Add user profile pages
- Add pagination / infinite scroll
- Add comment replies (nested comments)
- Deploy backend to Render / Railway
- Deploy frontend to Vercel / Netlify
---

## Contributing

This is a learning project for interns. To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add: your feature description"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

> Built with ❤️ as a beginner MERN stack project. Happy coding!
