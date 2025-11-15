# 🚀 AARAMBH - Web Development Bootcamp

<div align="center">
  
  **The Beginning of Your Code Journey**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Latest-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
  
</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)

---

## 🎯 About

Aarambh is a stunning, dark-themed landing page for a web development bootcamp featuring:
- 🌟 Matrix rain animation background
- ⚡ Smooth scroll animations with Framer Motion
- 💻 Terminal-style UI elements
- 📝 Animated registration form
- 🎨 Unique coding-themed design
- 📱 Fully responsive layout

**Bootcamp Date:** November 22, 2025

---

## ✨ Features

### Frontend
- ✅ Matrix rain animation effect
- ✅ Terminal-style command inputs
- ✅ Glowing text animations
- ✅ Smooth scroll-triggered animations
- ✅ Interactive hover effects
- ✅ Modern glassmorphism design
- ✅ Custom cursor effects
- ✅ Responsive design for all devices
- ✅ Beautiful gradient effects
- ✅ Modal registration form with validation

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB database integration
- ✅ Data validation with Mongoose
- ✅ Email uniqueness check
- ✅ CORS enabled
- ✅ Error handling
- ✅ Request logging
- ✅ Pagination support
- ✅ Statistics endpoint

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **HTTP Client:** Axios
- **Fonts:** JetBrains Mono (Google Fonts)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Validation:** Validator.js
- **Environment:** dotenv
- **CORS:** cors

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

Check installations:
```bash
node --version
npm --version
mongod --version
```

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd "aarambh workspace"
```

### 2. Install Frontend Dependencies
```bash
cd client
npm install
```

### 3. Install Backend Dependencies
```bash
cd ../server
npm install
```

---

## ▶️ Running the Project

### Option 1: Run Both Servers Separately

#### Terminal 1 - Start MongoDB (if running locally)
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

#### Terminal 2 - Start Backend Server
```bash
cd server
npm run dev
```
Backend will run on: `http://localhost:5000`

#### Terminal 3 - Start Frontend Server
```bash
cd client
npm run dev
```
Frontend will run on: `http://localhost:3000`

### Option 2: Using MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `server/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aarambh?retryWrites=true&w=majority
```

---

## 📁 Project Structure

```
aarambh workspace/
│
├── client/                    # Next.js Frontend
│   ├── app/
│   │   ├── globals.css       # Global styles & animations
│   │   ├── layout.js         # Root layout
│   │   └── page.js           # Main page
│   ├── components/
│   │   ├── MatrixRain.js     # Matrix animation
│   │   ├── Hero.js           # Hero section
│   │   ├── About.js          # About section
│   │   ├── Bootcamp.js       # Bootcamp details
│   │   ├── Features.js       # Features section
│   │   ├── Footer.js         # Footer
│   │   └── RegistrationModal.js  # Registration form
│   ├── package.json
│   ├── tailwind.config.js
│   └── next.config.js
│
└── server/                    # Node.js Backend
    ├── models/
    │   └── Registration.js   # Mongoose schema
    ├── routes/
    │   └── registration.js   # API routes
    ├── .env                  # Environment variables
    ├── .env.example
    ├── server.js             # Express server
    └── package.json
```

---

## 🔌 API Endpoints

### Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| POST | `/api/register` | Create registration |
| GET | `/api/register` | Get all registrations (paginated) |
| GET | `/api/register/:id` | Get single registration |
| GET | `/api/register/stats/summary` | Get statistics |
| PUT | `/api/register/:id/status` | Update status |
| DELETE | `/api/register/:id` | Delete registration |

### Example POST Request
```javascript
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "college": "XYZ College",
  "year": "2",
  "branch": "Computer Science",
  "experience": "beginner",
  "github": "https://github.com/johndoe",
  "linkedin": "https://linkedin.com/in/johndoe",
  "expectations": "Want to learn web development"
}
```

### Example GET Request with Filters
```
GET /api/register?page=1&limit=10&experience=beginner&year=2
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/aarambh

# Frontend URL
CLIENT_URL=http://localhost:3000
```

---

## 🎨 Design Features

### Animations
- **Matrix Rain:** Falling characters effect in background
- **Typing Effect:** Terminal-style text animation
- **Scroll Animations:** Elements fade and slide in on scroll
- **Hover Effects:** Interactive glows and transforms
- **Particle Effects:** Floating particles in hero section
- **Glitch Effect:** Optional glitch effect on text

### Color Scheme
- **Background:** `#0d1117` (Dark GitHub-like)
- **Code Green:** `#00ff41` (Matrix green)
- **Code Blue:** `#58a6ff`
- **Code Purple:** `#bc8cff`
- **Code Yellow:** `#ffd700`

### Typography
- **Primary Font:** JetBrains Mono (monospace)
- Coding-themed elements throughout

---

## 📱 Responsive Design

The website is fully responsive and tested on:
- 📱 Mobile (320px - 767px)
- 📱 Tablet (768px - 1023px)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
# Windows: Start MongoDB service from Services
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port Already in Use
```bash
# Frontend (Port 3000)
npx kill-port 3000

# Backend (Port 5000)
npx kill-port 5000
```

### CORS Error
Ensure backend `.env` has:
```env
CLIENT_URL=http://localhost:3000
```

### Node Modules Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## 🎓 Learning Resources

During the bootcamp, you'll learn:
1. **HTML & CSS** - Structure and styling
2. **JavaScript** - Programming fundamentals
3. **React.js** - Modern UI development
4. **Node.js** - Backend development
5. **MongoDB** - Database management
6. **Full Stack** - Putting it all together

---

## 🤝 Contributing

Feel free to contribute to make this project better!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is created for educational purposes for the Aarambh college club.

---

## 👥 Team

Made with ❤️ by the **Aarambh Team**

---

## 📞 Contact

For any queries regarding the bootcamp:
- 📧 Email: contact@aarambh.club
- 🎓 Location: Your College Campus

---

<div align="center">
  
  ### 🌟 Star this repo if you found it helpful!
  
  **Happy Coding! 💻✨**
  
  *Aarambh - The Beginning*
  
</div>
