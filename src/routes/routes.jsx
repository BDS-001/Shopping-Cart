import App from "../App.jsx";
import Homepage from "../pages/Homepage.jsx";
import ShopPage from "../pages/ShopPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import Cart from "../pages/CartPage.jsx";
import ProductPage from "../pages/ProductPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "shop", 
        element: <ShopPage />,
        children: [
          { path: ':name', element: <ProductPage /> }
        ]
      },
      { path: "cart", element: <Cart /> },
    ],
  },
];

export default routes;
