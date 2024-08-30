import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CartItem from '../../components/CartItem';

describe('CartItem', () => {
    const mockItem = {
        id: '1',
        amount: 2,
        productData: {
          id: 'prod1',
          imageUrl: 'test.jpg',
          title: 'Test Product',
          price: 9.99
        }
      };
    
    const mockHandleQuantityChange = vi.fn();
    const mockHandleRemoveFromCart = vi.fn();

    it('renders correctly with given props', () => {
        render (
        <CartItem 
        item={mockItem} 
        handleQuantityChange={mockHandleQuantityChange} 
        handleRemoveFromCart={mockHandleRemoveFromCart}
        />)

        screen.debug()
        
        //check that title get displayed
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        
        //check that image gets displayed
        const img = screen.getByAltText('Test Product');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', 'test.jpg')

        //check that price gets displayed
        expect(screen.getByText('$9.99')).toBeInTheDocument()

        //check that quantitity gets displayed
        expect(screen.getByText('2')).toBeInTheDocument()

        //check that buttons are displayed
        expect(screen.getByRole('button', {name: '+'})).toBeInTheDocument()
        expect(screen.getByRole('button', {name: '-'})).toBeInTheDocument()
        expect(screen.getByRole('button', {name: 'X'})).toBeInTheDocument()

      });
  });