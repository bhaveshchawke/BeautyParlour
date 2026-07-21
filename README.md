# 🌸 Beauty Parlour Management & E-Commerce System

![Beauty Parlour Banner](https://via.placeholder.com/1200x400.png?text=Beauty+Parlour+E-Commerce+%26+Booking+Platform)

Welcome to the **Beauty Parlour Management System**, a full-stack MERN application that serves as a dual-purpose platform. It seamlessly integrates a fully functional **E-Commerce Shop** for buying beauty products and a **Service Booking System** for scheduling parlour appointments.

## 🔗 Links
- **Live Demo:** [https://beauty-parlour-ti9z.vercel.app/](https://beauty-parlour-ti9z.vercel.app/)
- **GitHub Repository:** [https://github.com/bhaveshchawke/BeautyParlour.git](https://github.com/bhaveshchawke/BeautyParlour.git)

---

## ✨ Features

### 🛍️ E-Commerce Module
- Browse and search beauty products.
- Add items to cart and manage quantities.
- Secure and fast checkout experience.

### 📅 Service Booking System
- Browse available parlour services (haircuts, facials, etc.).
- Book appointments seamlessly.
- View and manage your bookings.

### 💳 Payment Integration
- **Razorpay** integrated for secure, real-time online payments.

### 🔐 Authentication & Security
- Secure user registration and login.
- Email OTP verification for enhanced security.
- Role-based access control (Admin & User).

### ⚙️ Admin Dashboard
- Centralized dashboard for the parlour owner.
- Add, edit, and delete products and services.
- View all user appointments and e-commerce orders.
- Image uploads managed securely via Cloudinary.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)

**Third-Party Services:**
- Razorpay (Payments)
- Cloudinary (Image Hosting)
- Vercel (Deployment)

---

## 🚀 Installation & Local Setup

If you want to run this project locally on your machine, follow these steps:

### Prerequisites
- Node.js installed
- MongoDB installed or MongoDB Atlas URI
- Cloudinary Account
- Razorpay Account

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bhaveshchawke/BeautyParlour.git
   cd BeautyParlour
   ```

2. **Backend Setup:**
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in the `Backend` directory and add your credentials:
   ```env
   PORT=3000
   MONGO_URL=your_mongodb_connection_string
   SESSION_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   FRONTEND_URL=http://localhost:5173
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../Frontend
   npm install
   ```
   Create a `.env` file in the `Frontend` directory:
   ```env
   VITE_BACKEND_URL=http://localhost:3000/api
   ```
   Start the frontend server:
   ```bash
   npm run dev
   ```

---

## 📸 Screenshots

*(Add screenshots of your project here by uploading them to GitHub and replacing these links)*

- **Homepage:** `![Homepage](link_to_image)`
- **Products/Shop:** `![Shop](link_to_image)`
- **Admin Dashboard:** `![Admin](link_to_image)`
- **Razorpay Checkout:** `![Checkout](link_to_image)`

---

## 👨‍💻 Author

**Bhavesh Chawke**
- GitHub: [@bhaveshchawke](https://github.com/bhaveshchawke)

Feel free to reach out if you have any questions or feedback about the project! Don't forget to leave a ⭐ if you liked this project!
