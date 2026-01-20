import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { describe, it, expect } from 'vitest';

describe('Navbar', () => {
  it('renders the navbar with a logout button', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Navbar />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText(/Sign Out/i);
    expect(logoutButton).toBeInTheDocument();
  });
});
