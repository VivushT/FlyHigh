# ✈️ FlyHigh - Global Flight Booking Platform

<div align="center">

![FlyHigh Logo](https://img.shields.io/badge/FlyHigh-Premium%20Aviation-0A1F44?style=for-the-badge&logo=airplane&logoColor=white)

**A comprehensive, enterprise-grade flight booking web application with 30+ features**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express)](https://expressjs.com/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Screenshots](#-screenshots)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Demo Accounts](#-demo-accounts)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**FlyHigh** is a full-stack aviation service platform that handles every operation related to flight ticket booking and airport services worldwide. Built with modern architecture, clean scalable code, realistic dummy data, and a premium airline-style aesthetic UI.

### Why FlyHigh?

- 🌍 **Global Coverage**: 105+ airports across 50+ countries
- ✈️ **35+ Airlines**: Major carriers from all alliances
- 💎 **Premium UI/UX**: Luxury airline-inspired design
- 🔒 **Secure**: JWT authentication with bcrypt encryption
- 📱 **Responsive**: Mobile, tablet, and desktop optimized
- 🌓 **Dark Mode**: Complete dark/light theme support

---

## ✨ Features

### 🔐 User & Account Management (5 features)
- ✅ Email/phone registration & login with JWT
- ✅ Social login integration (Google, Facebook)
- ✅ Passport & traveler profile management
- ✅ Multiple travelers under one account
- ✅ Secure authentication with bcrypt hashing

### 🔍 Flight Search & Booking (6 features)
- ✅ Global flight search (one-way, round-trip, multi-city)
- ✅ Advanced filters (price, duration, stops, airline)
- ✅ Real-time airport autocomplete
- ✅ Interactive seat selection with aircraft map
- ✅ Multiple fare classes (Economy, Premium, Business, First)
- ✅ Complete booking flow with passenger details

### 🛋️ Airport & Travel Services (6 features)
- ✅ Airport lounge booking
- ✅ Extra baggage purchase
- ✅ In-flight meal preorder
- ✅ Visa assistance service
- ✅ Travel insurance booking
- ✅ Airport pickup & drop transportation

### 📊 Booking Management (4 features)
- ✅ Booking history with detailed view
- ✅ Flight reschedule functionality
- ✅ Booking cancellation
- ✅ Refund status tracking

### 👨‍💼 Admin & Operations (4 features)
- ✅ Admin dashboard with analytics
- ✅ Airline & airport management
- ✅ User management with role-based access
- ✅ Booking oversight & statistics

### 🤖 Smart Features (3+ features)
- ✅ Cheapest date finder algorithm
- ✅ Personalized flight sorting
- ✅ Carbon footprint calculator
- ✅ Dark/Light mode toggle

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS 3 + Custom Theme
- **Routing**: React Router DOM
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Animations**: Framer Motion + Custom CSS

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator
- **Security**: CORS, Rate Limiting

### Design System
- **Colors**: Midnight Blue (#0A1F44), Sky Blue (#4DA8DA), Gold (#F5C16C)
- **Typography**: Inter (body), Poppins (display)
- **Effects**: Glassmorphism, smooth gradients, premium shadows

---

## 🚀 Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/yourusername/FlyHigh.git
cd FlyHigh
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

The backend will start on `http://localhost:5001`

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env to point to your backend
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## 💻 Usage

### Starting the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Accessing the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001/api

---

## 📚 API Documentation

### Base URL
```
http://localhost:5001/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "securepassword"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Flight Endpoints

#### Search Flights
```http
GET /flights/search?from=JFK&to=LHR&date=2025-01-15&fareClass=Economy
```

#### Get Cheapest Dates
```http
GET /flights/cheapest-dates?from=JFK&to=LHR
```

#### Search Airports
```http
GET /flights/airports/search?query=london
```

### Booking Endpoints (Protected)

#### Create Booking
```http
POST /bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  "flightId": "uuid",
  "fareClass": "Economy",
  "passengers": [
    {
      "name": "John Doe",
      "dateOfBirth": "1990-01-01",
      "passportNumber": "AB1234567",
      "nationality": "US"
    }
  ]
}
```

For complete API documentation, see [API.md](./docs/API.md)

---

## 📁 Project Structure

```
FlyHigh/
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/     # Request handlers (6 controllers)
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── data/            # Dummy data (airports, airlines, flights)
│   │   └── index.js         # Server entry point
│   ├── package.json
│   └── .env
│
├── frontend/                # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components (10 pages)
│   │   ├── context/         # React context providers
│   │   ├── services/        # API client
│   │   ├── hooks/           # Custom React hooks
│   │   └── styles/          # Global CSS
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env
│
├── docs/                    # Documentation
├── .gitignore
└── README.md
```

---

## 🔑 Demo Accounts

### User Account
```
Email: user@flyhigh.com
Password: user123
```

### Admin Account
```
Email: admin@flyhigh.com
Password: admin123
```

---

## 📸 Screenshots

### Homepage
*Premium hero section with flight search*

### Flight Search Results
*Advanced filtering and sorting*

### Booking Dashboard
*Manage all your bookings*

### Admin Panel
*Analytics and management tools*

> *Note: Add actual screenshots to enhance the README*

---

## 🎨 Design Features

### Color Palette
- **Primary**: Midnight Blue (#0A1F44)
- **Secondary**: Sky Blue (#4DA8DA)
- **Accent**: Gold (#F5C16C)

### UI/UX Highlights
- ✨ Glassmorphism effects
- 🌊 Smooth animations and transitions
- 📱 Fully responsive design
- 🌓 Dark mode support
- 🎯 Accessibility-focused

---

## 🗺️ Roadmap

- [ ] Real-time flight tracking
- [ ] Price alerts & notifications
- [ ] Loyalty program integration
- [ ] Multi-language support (i18n)
- [ ] Mobile app (React Native)
- [ ] Payment gateway integration (Stripe)
- [ ] PostgreSQL database migration
- [ ] Redis caching layer

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- Design inspiration from premium airline websites
- Icons from [Heroicons](https://heroicons.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

## 📞 Support

For support, email support@flyhigh.com or open an issue in this repository.

---

<div align="center">

**Made with ❤️ for travelers worldwide**

⭐ Star this repo if you find it helpful!

</div>