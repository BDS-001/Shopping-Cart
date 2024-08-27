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
  };

  const handleQuantityChange = (adjustmentDirection, id) => {
    if (cart.find(product => product.id === id).amount === 1 && adjustmentDirection === '-') {
      handleRemoveFromCart(id)
      return
    }

    let adjustmentFactor = 1
    if (adjustmentDirection === '-') adjustmentFactor *= -1
    setCartCount(prevCount => prevCount + adjustmentFactor)
    setCart(prevCart => {
      return prevCart.map(entry =>
        (entry.id === id) ? {...entry, amount: entry.amount + adjustmentFactor} : entry
      )
    });
  };

  const handleRemoveFromCart = (id) => {
    const quantity = cart.find(product => product.id === id).amount
    setCart(prevCart => (
      prevCart.filter(entry => entry.id !== id)
    ));
    setCartCount(prevCount => prevCount - quantity)
  };

  const processCart = () => {
    console.log('processing payment...')
    setCart([])
    setCartCount(0)
    console.log('complete')
  }
  const processPayment = async () => {
    const overlay = document.querySelector('.overlay')
    overlay.innerHTML = 'Loading...'
    overlay.classList.remove('disabled-overlay')
    try {
      await new Promise(resolve => setTimeout(resolve, 5000))
      overlay.innerHTML = 'Payment Complete!'
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch(error) {
      console.log(error)
    } finally {
      processCart()
      overlay.classList.add('disabled-overlay')
    }
  }

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

  return (
      <>
        <PageHeader cartCount={cartCount} />
        <main>
          {loading ? <LoadingScreen /> : <Outlet context={{ products, categories, cartCount, setCartCount, handleAddToCart, cart, handleQuantityChange, handleRemoveFromCart, processPayment }} />}
        </main>
        <PageFooter />
      </>
  )
}

export default App
