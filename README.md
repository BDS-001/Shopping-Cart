# Shopping Site

A React-based e-commerce application that simulates an online shopping experience. This project was built to practice React concepts, external API integration, and React Router.

## 📖 Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [What I Learned](#what-i-learned)
- [Future Improvements](#future-improvements)

## ✨ Features

- **Homepage**: Featuring promotional content, featured products, category listings, and a newsletter signup
- **Shop Page**: Displays all products from Fake Store API with ability to add items to cart
- **Product Detail Page**: Shows detailed information about a specific product
- **Shopping Cart**: Keeps track of items, quantities, and total cost
- **Responsive Design**: Works across desktop and mobile devices
- **Checkout Process**: Simulates a payment processing flow

## 💻 Technologies

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation between different pages
- **Fake Store API**: External API providing product data
- **CSS**: Custom styling with a responsive design
- **PropTypes**: Runtime type checking for React props

## 📂 Project Structure

```
shopping-site/
│
├── src/
│   ├── components/      # Reusable components
│   │   ├── CartItem.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── PageFooter.jsx
│   │   ├── PageHeader.jsx
│   │   └── ProductCard.jsx
│   │
│   ├── pages/           # Application pages
│   │   ├── CartPage.jsx
│   │   ├── ErrorPage.jsx
│   │   ├── Homepage.jsx
│   │   ├── ProductPage.jsx
│   │   └── ShopPage.jsx
│   │
│   ├── hooks/           # Custom React hooks
│   │   └── useCart.js
│   │
│   ├── services/        # API services
│   │   └── FakeStoreAPI.jsx
│   │
│   ├── styles/          # CSS styles
│   │   ├── App.css
│   │   ├── CartItem.css
│   │   ├── CartPage.css
│   │   └── ...
│   │
│   ├── routes/          # Route configuration
│   │   └── routes.jsx
│   │
│   ├── App.jsx          # Main component
│   └── main.jsx         # Entry point
│
└── README.md
```

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shopping-site.git
   cd shopping-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎮 Usage

### Browsing Products
- Visit the Shop page to view all available products
- Click on a product to view detailed information

### Shopping Cart
- Adjust quantity using the + and - buttons or by typing directly
- Add items to your cart from the product page or shop page
- Remove items from your cart with the X button
- View your cart total including tax
- Proceed to checkout from the cart page

## 🔌 API

This project uses the [Fake Store API](https://fakestoreapi.com/) to fetch product data.

Key endpoints used:
- `GET /products`: Fetches all products
- `GET /products/categories`: Fetches product categories

## 📚 What I Learned

Through this project, I practiced:

- Creating a multi-page application with React Router
- Managing state across multiple components
- Using custom hooks to encapsulate shopping cart logic
- Fetching and displaying data from an external API
- Implementing responsive design principles
- Type checking with PropTypes
- Creating an intuitive shopping cart experience

## 🔮 Future Improvements

- User authentication system
- Filtering products by category, price, and rating
- Search functionality
- Wishlist feature
- Product reviews system
- Persistent cart (localStorage or backend)
- More detailed product information
- Real payment processing integration
- Unit and integration tests with React Testing Library