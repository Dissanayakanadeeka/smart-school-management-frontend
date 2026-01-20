import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PrincipalDashboard from '../pages/PrincipalDashbord';
import { describe, it, expect, beforeAll } from 'vitest';

describe('PrincipalDashboard', () => {
  beforeAll(() => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => 'true'),
        setItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  it('renders the principal dashboard with a create classroom button', () => {
    render(
      <BrowserRouter>
        <PrincipalDashboard />
      </BrowserRouter>
    );

    const createClassroomButton = screen.getByText(/Create Classroom/i);
    expect(createClassroomButton).toBeInTheDocument();
  });
});
