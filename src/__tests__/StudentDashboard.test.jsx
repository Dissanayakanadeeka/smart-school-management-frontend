import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StudentDashboard from '../pages/StudentDashboard';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import api from '../api';

vi.mock('../api', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: { classId: '123' } })),
  },
}));

describe('StudentDashboard', () => {
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

  it('renders the student dashboard with a welcome message', () => {
    render(
      <BrowserRouter>
        <StudentDashboard />
      </BrowserRouter>
    );

    const welcomeMessage = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'span' && content.startsWith('Welcome back,');
    });
    const username = screen.getByText('testuser!');
    
    expect(welcomeMessage).toBeInTheDocument();
    expect(username).toBeInTheDocument();
  });
});
