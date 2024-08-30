import './styles/App.css'
import { Outlet } from "react-router-dom";
import { useEffect, useState, useMemo } from 'react';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';
import LoadingScreen from './components/LoadingScreen';
import { getProducts, getCategories } from './services/FakeStoreAPI';
import useCart from './hooks/useCart.js'

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartCount, cart, handleQuantityChange, handleAddToCart, processPayment, handleRemoveFromCart } = useCart()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts('https://fakestoreapi.com/products'),
          getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [])

  const outletContext = useMemo(() => ({
    products, 
    categories, 
    cartCount, 
    handleAddToCart, 
    cart, 
    handleQuantityChange, 
    handleRemoveFromCart, 
    processPayment
  }), [products, categories, cartCount, cart, handleQuantityChange, handleAddToCart, processPayment, handleRemoveFromCart]);

  return (
      <>
        <PageHeader cartCount={cartCount} />
        <main>
          {loading ? <LoadingScreen /> : <Outlet context={outletContext} />}
        </main>
        <PageFooter />
      </>
  )
}

export default App
