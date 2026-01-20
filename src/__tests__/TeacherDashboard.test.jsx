import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TeacherDashboard from '../pages/TeacherDashbord';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import api from '../api';

vi.mock('../api', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: { hasClass: true, classId: '123' } })),
  },
}));

describe('TeacherDashboard', () => {
  beforeAll(() => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key) => {
          if (key === 'profileCompleted') return 'true';
          if (key === 'username') return 'testuser';
          return null;
        }),
        setItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  it('renders the teacher dashboard with a welcome message', async () => {
    render(
      <BrowserRouter>
        <TeacherDashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Loading your workspace.../i)).not.toBeInTheDocument();
    });

    const welcomeMessage = screen.getByText(/Welcome back,/i);
    const username = screen.getByText(/testuser!/i);
    
    expect(welcomeMessage).toBeInTheDocument();
    expect(username).toBeInTheDocument();
  });
});
