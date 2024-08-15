import App from "../App.jsx";
import Homepage from "../pages/Homepage.jsx";
import ShopPage from "../pages/ShopPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import Cart from "../pages/CartPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "cart", element: <Cart /> },
    ],
  },
];

export default routes;
