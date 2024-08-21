import './styles/App.css'
import { Outlet } from "react-router-dom";
import { useEffect, useState } from 'react';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';
import LoadingScreen from './components/LoadingScreen';
import { getProducts, getCategories } from './services/FakeStoreAPI';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([])

  const handleAddToCart = (itemCount, productData) => {
    setCartCount(prevCount => prevCount + itemCount )
    if (cart.some(prod => prod.id === productData.id)) {
      setCart(prevCart => {
        return prevCart.map(entry =>
          entry.id === productData.id ? {...entry, amount: entry.amount + itemCount} : entry
        )
      });
    } else {
      setCart(prevCart =>
        [
          ...prevCart,
          {
            id: productData.id,
            amount: itemCount,
            productData: productData
          }
        ]
      )
    }
    console.log(cart)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts('https://fakestoreapi.com/products'),
          getCategories()
        ]);
        console.log(productsData)
        console.log(categoriesData)
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

  return (
      <>
        <PageHeader cartCount={cartCount} />
        <main>
          {loading ? <LoadingScreen /> : <Outlet context={{ products, categories, cartCount, setCartCount, handleAddToCart, cart }} />}
        </main>
        <PageFooter />
      </>
  )
}

export default App
