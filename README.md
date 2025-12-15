# 🍬 Sweet Shop - Incubyte Sweet Shop Management System

A modern, full-stack e-commerce web application for managing and purchasing authentic Indian sweets. Built with React, TypeScript, FastAPI, and styled with TailwindCSS featuring stunning glassmorphism effects and smooth animations.

![Sweet Shop Banner](frontend/public/hero/hero1.png)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Screenshots](#screenshots)
- [My AI Usage](#my-ai-usage)
- [License](#license)

## ✨ Features

### Customer Features
- 🛍️ **Browse Sweets Catalog** - Explore a wide variety of authentic Indian sweets
- 🔍 **Advanced Search & Filtering** - Search by name with typewriter animation, filter by category
- 🛒 **Shopping Cart** - Add, remove, and manage quantities with smooth animations
- 💳 **Secure Checkout** - JWT-based authentication for secure orders
- 📱 **Responsive Design** - Fully responsive across all devices
- 🎨 **Premium UI/UX** - Glassmorphism effects, framer-motion animations, and custom frames

### Admin Features
- 📊 **Analytics Dashboard** - View sales metrics and order statistics
- ➕ **Product Management** - Add, edit, and delete products
- 📦 **Order Management** - Track and manage customer orders
- 🖼️ **Image Upload** - Cloudinary integration for product images

### Design Highlights
- 🌈 **Rainbow Animated Logo** - Candy icon with smooth color transitions
- 🖼️ **Custom Product Frames** - Decorative borders around shop items
- 🎭 **Dynamic Backgrounds** - Rotating hero images and quote slideshows
- 🎪 **Infinite Marquee** - Scrolling showcase of delicious sweets
- ✨ **Glassmorphism Navbar** - Transparent, blurred navigation bar
- 🔤 **Typewriter Search** - Animated placeholder text in search bar

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Lightweight database
- **Pydantic** - Data validation
- **JWT** - Authentication tokens
- **Cloudinary** - Image hosting and management
- **Python-Jose** - JWT encoding/decoding
- **Passlib** - Password hashing

## 📁 Project Structure

```
gravity/
├── backend/
│   ├── main.py                 # FastAPI application entry point
│   ├── database.py             # Database configuration
│   ├── models.py               # SQLAlchemy models
│   ├── schemas.py              # Pydantic schemas
│   ├── routers/
│   │   ├── auth.py            # Authentication endpoints
│   │   ├── products.py        # Product CRUD endpoints
│   │   ├── orders.py          # Order management endpoints
│   │   └── admin.py           # Admin analytics endpoints
│   ├── requirements.txt        # Python dependencies
│   └── tests/                  # Pytest test suite
│
└── frontend/
    ├── src/
    │   ├── components/         # Reusable React components
    │   │   └── Navbar.tsx     # Navigation bar with glassmorphism
    │   ├── pages/             # Page components
    │   │   ├── Home.tsx       # Landing page with hero & marquee
    │   │   ├── Shop.tsx       # Product catalog with filters
    │   │   ├── Cart.tsx       # Shopping cart
    │   │   ├── Login.tsx      # User authentication
    │   │   ├── Register.tsx   # User registration
    │   │   ├── ProductDetails.tsx  # Individual product view
    │   │   └── Admin.tsx      # Admin dashboard
    │   ├── store/
    │   │   └── useStore.ts    # Zustand global state
    │   ├── api/
    │   │   └── axios.ts       # Axios configuration
    │   ├── types/
    │   │   └── index.ts       # TypeScript type definitions
    │   ├── App.tsx            # Main app component
    │   └── index.css          # Global styles
    ├── public/                # Static assets
    │   ├── hero/             # Hero background images
    │   ├── quotes/           # Quote images for login
    │   ├── shop-frame.png    # Custom product frame
    │   └── sweet-*.png       # Sweet images for marquee
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.9 or higher) - [Download](https://www.python.org/)
- **Git** - [Download](https://git-scm.com/)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd gravity/backend
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**
   - Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables** (Optional)
   Create a `.env` file in the `backend` directory:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   SECRET_KEY=your_secret_key_for_jwt
   ```

6. **Initialize the database**
   The database will be created automatically on first run. Sample products are seeded automatically.

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API URL** (Optional)
   The frontend is pre-configured to connect to `http://localhost:8000`. If you need to change this, update `frontend/src/api/axios.ts`:
   ```typescript
   const api = axios.create({
     baseURL: 'http://localhost:8000',
   });
   ```

## ▶️ Running the Application

### Start the Backend Server

1. Navigate to the backend directory and activate your virtual environment
2. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
3. The backend will be available at `http://localhost:8000`
4. API documentation available at `http://localhost:8000/docs`

### Start the Frontend Development Server

1. In a new terminal, navigate to the frontend directory
2. Run the development server:
   ```bash
   npm run dev
   ```
3. The frontend will be available at `http://localhost:5173`
4. Open your browser and visit the URL shown in the terminal

### Default Admin Credentials

To access the admin dashboard, you can register a new user and manually update their role in the database, or use the following test credentials if seeded:
- **Email**: `admin@sweetshop.com`
- **Password**: `admin123`
## 🤖 My AI Usage

Throughout the development of this Sweet Shop Management System, I leveraged AI tools extensively to accelerate development, enhance code quality, and implement advanced features. Here's a detailed breakdown of how AI assisted in this project:

### AI Tools Used
- **Google Gemini (Primary)** - Used for code generation, debugging, and architectural decisions
- **AI Image Generation (DALL-E)** - Used for creating custom visual assets

### How I Used AI

#### 1. **Code Generation & Boilerplate**
I used Gemini to generate initial boilerplate code for:
- FastAPI router structure and endpoint definitions
- React component scaffolding with TypeScript interfaces
- SQLAlchemy model definitions with proper relationships
- Pydantic schemas for request/response validation

**Example**: When setting up the authentication system, I asked Gemini to generate the JWT token creation and validation logic, which I then customized for our specific security requirements.

#### 2. **UI/UX Implementation**
AI significantly accelerated the frontend development:
- **Framer Motion Animations**: I described the desired animation effects (typewriter text, marquee scroll, product hover effects) and Gemini provided the motion configuration code
- **Glassmorphism Effects**: Asked for TailwindCSS classes to achieve the modern glassmorphic navbar and card designs
- **Responsive Design**: Generated responsive grid layouts and breakpoint configurations

**Example**: The typewriter effect in the search bar was created by describing the desired behavior to Gemini, which provided the React useEffect logic for the character-by-character animation.

#### 3. **Image Asset Generation**
I used AI image generation tools to create custom visual assets:
- **Product Images**: Generated realistic images of Indian sweets (Gulab Jamun, Kaju Katli, Jalebi, etc.) for the product catalog
- **Hero Backgrounds**: Created high-quality background images for the landing page
- **Quote Graphics**: Designed Hindi/Hinglish quote images for the login page slideshow
- **Pattern Backgrounds**: Generated pencil sketch patterns of sweets for subtle backgrounds

**Example**: For the shop item frames, I requested a decorative border design that would complement the sweet shop aesthetic.

#### 4. **Debugging & Problem Solving**
When encountering issues, I used Gemini to:
- Debug CORS configuration issues between frontend and backend
- Resolve TypeScript type errors and improve type safety
- Fix CSS layout problems (navbar overlap, z-index conflicts)
- Troubleshoot React state management issues

**Example**: When the logout button was unclickable due to a hover gap in the dropdown menu, I described the issue to Gemini, which suggested using `pt-2` padding instead of `mt-2` margin to bridge the gap.

#### 5. **Code Optimization**
AI helped optimize the codebase:
- Suggested performance improvements for the infinite marquee scroll
- Recommended better state management patterns with Zustand
- Identified and removed unused imports and variables
- Proposed more efficient database query patterns

### Reflection on AI Impact

**Positive Impact:**
- **Accelerated Development**: Tasks that would have taken hours (like setting up authentication, creating animations) were completed in minutes
- **Learning Opportunity**: AI explanations helped me understand complex concepts like JWT authentication and framer-motion APIs
- **Code Quality**: AI suggestions often included best practices and modern patterns I might not have considered
- **Creative Solutions**: For UI/UX challenges, AI provided creative approaches (like the custom frames and glassmorphism) that elevated the design

**Challenges & Limitations:**
- **Context Understanding**: Sometimes AI-generated code needed adjustments to fit the specific project context
- **Debugging AI Code**: Occasionally, AI suggestions introduced bugs that required manual debugging
- **Over-reliance Risk**: I had to be mindful not to blindly accept AI suggestions without understanding the code

**Best Practices I Developed:**
1. Always review and test AI-generated code before committing
2. Use AI for boilerplate and repetitive tasks, but make architectural decisions myself
3. Combine AI suggestions with official documentation for verification
4. Iterate on AI-generated code to match project-specific requirements

**Overall Assessment:**
AI tools were invaluable in this project, reducing development time by approximately 40-50% while maintaining high code quality. The key was using AI as a collaborative tool rather than a replacement for critical thinking and problem-solving skills.

## 📝 License

This project was created as part of the Incubyte hiring process. All rights reserved.

---

**Built with ❤️ and AI assistance**
