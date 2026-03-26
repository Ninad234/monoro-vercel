# Monoro 👗🛒

**Monoro** is a modern, full-stack E-Commerce web application for fashion lovers. It brings together the latest trends and timeless classics, offering a seamless shopping experience for everyone.

---

## ✨ Features

- 🛍️ **Product Catalog:** Browse a wide range of fashion products for men, women, and kids.
- 🔐 **User Authentication:** Signup, login, and secure user sessions.
- 🛒 **Cart & Checkout:** Add products to cart, update quantities, and checkout securely.
- 💳 **Online Payments:** Integrated with Stripe for safe and easy payments.
- 📦 **Order Management:** View your orders and order history.
- 📬 **Contact Form:** Get in touch with the Monoro team.
- 📱 **Responsive Design:** Works beautifully on mobile, tablet, and desktop.
- ⚡ **Latest Collections:** See trending and discounted products on the homepage.
- ⭐ **Product Ratings:** See ratings and reviews for each product.
- 🛡️ **Secure:** Passwords are hashed, and sensitive data is protected.
- 🖼️ **Beautiful UI:** Clean, modern, and user-friendly interface.

---

## 🏗️ Tech Stack

### Frontend
- **React** (with Vite)
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Stripe** for payments
- **React Hot Toast** for notifications

### Backend
- **Node.js** + **Express.js**
- **MongoDB** (with Mongoose)
- **Stripe** for payment processing
- **bcryptjs** for password hashing
- **dotenv** for environment variables
- **CORS** for secure API access

---

## 🚀 Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/Ninad234/Monoro.git
cd Monoro
```

### 2. Setup Backend

```sh
cd Backend
npm install
# Create a .env file with your MongoDB URI and Stripe secret key
npm start
```

**Local Development .env Example (Backend):**
```
PORT=Frontend port_url
MongoDBURI=your_mongodb_connection_string
CLIENT_URL=get in the terminal by the vs code only.
STRIPE_SECRET_KEY=your_stripe_secret_key starts with sk_test....
```

```sh
cd ../Frontend
npm install
# Create a .env.local file with VITE_API_URL and VITE_STRIPE_PUBLIC_KEY
npm run dev
```

**Local Development .env.local Example (Frontend):**
```
VITE_API_URL=http://localhost:frontend_port_number (for local you can get it from the vs code or other code editor)
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key starts with pk_test...
```

### 4. Production Deployment (Vercel & Render)

**NEVER commit `.env` files to GitHub!** Instead, set these environment variables directly in the deployment dashboards.

**Render (Backend Dashboard):**
- `PORT`: Your Backend Port Url Here
- `CLIENT_URL`: (Your Vercel URL)
- `MongoDBURI`: Your MongoDB Atlas Connection String
- `STRIPE_SECRET_KEY`: Your Stripe Secret Key (`sk_live_...` or `sk_test_...`)

**Vercel (Frontend Dashboard):**
- `VITE_API_URL`: (Your Render URL, no trailing slash)
- `VITE_STRIPE_PUBLIC_KEY`: Your Stripe Public Key (`pk_live_...` or `pk_test_...`)

---

## 🖥️ Usage

- Visit `http://localhost:5173`(local) or your vercel url in your browser to access the frontend.
- Register or login to your account.
- Browse collections, add products to your cart, and checkout securely.
- View your order history and manage your profile.
- Contact us for any queries or support.

---

## 📂 Project Structure

```
Monoro/
  ├── Backend/      # Express + MongoDB API
  └── Frontend/     # React + Vite client
```

---

## 🤝 Contributing

We welcome contributions! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 🙌 About Us

Welcome to **Monoro Clothing Industries Ltd!**  
We are passionate about bringing you the latest trends and timeless classics in fashion. Our mission is to make everyone look and feel amazing, regardless of style or budget. Since 2020, we have been committed to providing reliable, high-quality products and a seamless shopping experience.

**Our Vision:**
    > To be the go-to destination for fashion lovers seeking quality, affordability, and style.

**Our Values:**
    > Integrity, customer satisfaction, and a relentless pursuit of excellence in everything we do.

---

## 📧 Contact

For any queries or support, reach out at:  
**Email:** ninadgawade149@gmail.com
**Phone:** +1 555-770-7727

Or open an issue on [GitHub Issues](https://github.com/Ninad234/Monoro/issues)

---

## 📝 License

This project is licensed under the ISC License.

---

**Happy Shopping!**  
_Your style, our passion!_ 
