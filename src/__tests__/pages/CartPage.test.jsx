/* eslint-disable react/prop-types */
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from '../../pages/CartPage';


vi.mock('react-router-dom', () => ({
    useOutletContext: vi.fn(),
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  }));

import { useOutletContext } from 'react-router-dom';

describe('cart component', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    const cartData = [
        {
          "id": 4,
          "amount": 2,
          "productData": {
            "id": 4,
            "imageUrl": "url1",
            "title": "Shirt",
            "price": 15.99
          }
        },
        {
          "id": 10,
          "amount": 1,
          "productData": {
            "id": 10,
            "imageUrl": "url2",
            "title": "SanDisk SSD",
            "price": 109
          }
        }
      ]

    it('renders empty cart message when cart is empty', () => {
        useOutletContext.mockReturnValue({
            cart: [],
            cartCount: 0,
            handleQuantityChange: vi.fn(),
            handleRemoveFromCart: vi.fn(),
            processPayment: vi.fn(),
          });

          render(<Cart />);

          expect(screen.getByText(/Your Cart is Empty!/i)).toBeInTheDocument();
          expect(screen.getByText(/Shopping Page/i)).toBeInTheDocument();
          expect(screen.getByText(/to get some items!/i)).toBeInTheDocument();
    })

    it('renders cart items', () => {
        useOutletContext.mockReturnValue({
            cart: cartData,
            cartCount: 3,
            handleQuantityChange: vi.fn(),
            handleRemoveFromCart: vi.fn(),
            processPayment: vi.fn(),
          });

          render(<Cart />)

          expect(screen.getByText(cartData[0].productData.title)).toBeInTheDocument();
          expect(screen.getByText(cartData[1].productData.title)).toBeInTheDocument();
          expect(screen.getByText(`$${cartData[0].productData.price.toFixed(2)}`)).toBeInTheDocument();
          expect(screen.getByText(`$${cartData[1].productData.price.toFixed(2)}`)).toBeInTheDocument();
    })

    it('renders cart cost', () => {
        useOutletContext.mockReturnValue({
            cart: cartData,
            cartCount: 3,
            handleQuantityChange: vi.fn(),
            handleRemoveFromCart: vi.fn(),
            processPayment: vi.fn(),
          });

          render(<Cart />)

          expect(screen.getByText('Subtotal: $140.98')).toBeInTheDocument();
          expect(screen.getByText('HST(13%): $18.33')).toBeInTheDocument();
          expect(screen.getByText(`Total: $159.31`)).toBeInTheDocument();
    })

    it('checkout functions', async () => {
        useOutletContext.mockReturnValue({
            cart: cartData,
            cartCount: 3,
            handleQuantityChange: vi.fn(),
            handleRemoveFromCart: vi.fn(),
            processPayment: vi.fn(),
          });
          const user = userEvent.setup()

          render(<Cart />)
          const checkout = screen.getByRole('button', {name: 'Checkout'})

          expect(checkout).toBeInTheDocument();
          await user.click(checkout)
          expect(useOutletContext().processPayment).toHaveBeenCalled();
    })


})