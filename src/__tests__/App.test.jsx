import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});

describe('App', () => {
    it('renders headline', () => {
      render(
        <BrowserRouter>
          <App title="React" />
        </BrowserRouter>
      );
  
      screen.debug();
  
      // check if App components renders headline
    });
  });