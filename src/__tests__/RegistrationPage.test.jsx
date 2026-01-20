import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegistrationPage from '../pages/RegistrationPage';
import { describe, it, expect, beforeAll, vi } from 'vitest';

describe('RegistrationPage', () => {
  beforeAll(() => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => 'STUDENT'),
        setItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  it('renders the student registration form', () => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    );

    const registrationTitle = screen.getByText(/STUDENT Registration/i);
    expect(registrationTitle).toBeInTheDocument();
  });
});
