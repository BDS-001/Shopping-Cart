import { describe, it, expect } from 'vitest';
import useCart from '../../hooks/useCart.js'
import { renderHook, act, waitFor } from '@testing-library/react';

describe('useCart Functionality', () => {
    const prodData = { 
        id: 2,
        imageUrl: "website",
        title: "Test Item",
        price: 22.3,
    }

    const setupCart = () => {
        const { result } = renderHook(() => useCart())
        act(() => {
            result.current.handleAddToCart(3, prodData)
        })
        return result
    }
    
   it ('initialized the cart and cartCount', () => {
    const { result } = renderHook(() => useCart());
        
    expect(result.current.cart).toEqual([]);
    expect(result.current.cartCount).toBe(0);
   })

   it('adds item to cart', () => {
    const cart = setupCart()

    expect(cart.current.cart).toHaveLength(1)
    expect(cart.current.cartCount).toBe(3)
    expect(cart.current.cart[0].amount).toBe(3)
    expect(cart.current.cart[0].productData).toMatchObject(prodData)
   })

   it('removed item from cart', () => {
    const cart = setupCart()

    act(() => {
        cart.current.handleRemoveFromCart(prodData.id)
    })

    expect(cart.current.cart).toHaveLength(0)
    expect(cart.current.cartCount).toBe(0)
   })

   it('adds item to cart', () => {
    const cart = setupCart()

    expect(cart.current.cart).toHaveLength(1)
    expect(cart.current.cartCount).toBe(3)
    expect(cart.current.cart[0].amount).toBe(3)
    expect(cart.current.cart[0].productData).toMatchObject(prodData)
   })

   it('changes item quantity', async () => {
    const cart = setupCart()

    act(() => {
        cart.current.handleQuantityChange('+', prodData.id)
    })

    await waitFor(() => {
        expect(cart.current.cart[0].amount).toBe(4)
        expect(cart.current.cartCount).toBe(4)
    })

    act(() => {
        cart.current.handleQuantityChange('-', prodData.id)
        cart.current.handleQuantityChange('-', prodData.id)
    })

    await waitFor(() => {
        expect(cart.current.cart[0].amount).toBe(2)
        expect(cart.current.cartCount).toBe(2)
    })

    act(() => {
        cart.current.handleQuantityChange('-', prodData.id)
        cart.current.handleQuantityChange('-', prodData.id)
    })

    await waitFor(() => {
        expect(cart.current.cartCount).toBe(0)
        expect(cart.current.cart).toHaveLength(0)
    })

   })
});