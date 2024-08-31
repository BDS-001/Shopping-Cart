import { describe, it, expect } from 'vitest';
import useCart from '../../hooks/useCart.js'
import { renderHook, act } from '@testing-library/react';

describe('useCart Functionality', () => {
   it ('variables are rendered', () => {
    const { result } = renderHook(() => useCart());
        
    expect(result.current.cart).toEqual([]);
    expect(result.current.cartCount).toBe(0);
   })

   it('adds item to cart', () => {
    const { result } = renderHook(() => useCart());

    const prodData = { 
        id: 2,
        imageUrl: "website",
        title: "Test Item",
        price: 22.3,
    }

    act(() => {
        result.current.handleAddToCart(3, prodData)
    })

    expect(result.current.cart).toHaveLength(1)
    expect(result.current.cartCount).toBe(3)
    expect(result.current.cart[0].amount).toBe(3)
    expect(result.current.cart[0].productData).toMatchObject(prodData)
   })
    
  });