import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import ShopPage from '../../pages/ShopPage';

const mockProducts = [
    { id: 1, title: 'Product 1', image: 'img1.jpg', description: 'Desc 1', price: 10 },
    { id: 2, title: 'Product 2', image: 'img2.jpg', description: 'Desc 2', price: 20 },
  ];
const mockHandleAddToCart = vi.fn();


vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      Outlet: vi.fn(() => null),
      useOutletContext: vi.fn(() => ({
        products: mockProducts,
        handleAddToCart: mockHandleAddToCart
      })),
    };
});

describe('shop page', () => {
    it('renders all products when no name parameter is provided', () => {
        render(
            <MemoryRouter initialEntries={['/shop']}>
            <Routes>
              <Route path="/shop" element={
                <ShopPage products={mockProducts} handleAddToCart={mockHandleAddToCart} />
              }>
                <Route path=":name" element={<div>Product Details</div>} />
              </Route>
            </Routes>
          </MemoryRouter>
        );
    
        // Check if all product titles are rendered
        mockProducts.forEach(product => {
          expect(screen.getByText(product.title)).toBeInTheDocument();
        });

        screen.debug()
      });

      it('renders only the product page when there is a name parameter', () => {
        render(
            <MemoryRouter initialEntries={['/shop/Product 1']}>
            <Routes>
              <Route path="/shop" element={
                <ShopPage products={mockProducts} handleAddToCart={mockHandleAddToCart} />
              }>
                <Route path=":name" element={<div>Product Details</div>} />
              </Route>
            </Routes>
          </MemoryRouter>
        );
    
        // Check if all product titles are rendered
        mockProducts.forEach(product => {
            expect(screen.queryByText(product.title)).not.toBeInTheDocument();
          });
      });

      it('outlet is given the correct parameters', () => {
        render(
            <MemoryRouter initialEntries={['/shop/Product 1']}>
            <Routes>
              <Route path="/shop" element={
                <ShopPage products={mockProducts} handleAddToCart={mockHandleAddToCart} />
              }>
                <Route path=":name" element={<div>Product Details</div>} />
              </Route>
            </Routes>
          </MemoryRouter>
        );
    
        expect(Outlet).toHaveBeenCalledWith(
            expect.objectContaining({
              context: {
                product: mockProducts.find(p => p.title === 'Product 1'),
                handleAddToCart: mockHandleAddToCart
              }
            }),
            {}
          );

      });
});