import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../../routes/routes';

vi.mock('../../services/FakeStoreAPI.jsx', () => ({
    getProducts: vi.fn(() => Promise.resolve([])),
    getCategories: vi.fn(() => Promise.resolve([]))
  }));

describe('Routes', () => {
  it('renders homepage for root path', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    await waitFor(() => {
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Welcome To shopping Site')).toBeInTheDocument();
  });

  it('renders shop page for /shop path', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
    render(<RouterProvider router={router} />);

    await waitFor(() => {
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('Shop Page')).toBeInTheDocument();
  });

  it('renders cart page for /cart path', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/cart'] });
    render(<RouterProvider router={router} />);
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    // Use a more flexible matching strategy
    expect(screen.getByText(/Your Cart is Empty!/i)).toBeInTheDocument();
    expect(screen.getByText(/Shopping Page/i)).toBeInTheDocument();
    expect(screen.getByText(/to get some items!/i)).toBeInTheDocument();
  });

  it('renders error page for undefined route', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/undefined-route'] });
    render(<RouterProvider router={router} />);
    
    expect(screen.getByText(/This Page does not exist, return to the/i)).toBeInTheDocument();
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });
});