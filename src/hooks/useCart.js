import { useState, useCallback } from 'react';

function useCart() {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (itemCount, productData) => {
    console.log(productData)
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

  const handleQuantityChange = useCallback((adjustmentDirection, id) => {
    setCart(prevCart => {
      const product = prevCart.find(item => item.id === id);
      if (!product) return prevCart;

      if (product.amount === 1 && adjustmentDirection === '-') {
        setCartCount(prev => prev - 1);
        return prevCart.filter(item => item.id !== id);
      }

      const adjustmentFactor = adjustmentDirection === '+' ? 1 : -1;
      setCartCount(prev => prev + adjustmentFactor);

      return prevCart.map(item =>
        item.id === id ? { ...item, amount: item.amount + adjustmentFactor } : item
      );
    });
  }, []);

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
    overlay.innerHTML = 'Processing...'
    overlay.classList.remove('disabled-overlay')
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      overlay.innerHTML = 'Payment Complete!'
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch(error) {
      console.log(error)
    } finally {
      processCart()
      overlay.classList.add('disabled-overlay')
    }
  }

  return {
    cartCount,
    setCartCount,
    cart,
    handleQuantityChange,
    handleAddToCart,
    handleRemoveFromCart,
    processPayment,
  };
}

export default useCart