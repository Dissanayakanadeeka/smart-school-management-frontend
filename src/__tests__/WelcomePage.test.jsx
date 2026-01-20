import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WelcomePage from '../pages/welcomePage';
import { describe, it, expect } from 'vitest';

describe('WelcomePage', () => {
  it('renders the welcome page with the main title', () => {
    render(
      <BrowserRouter>
        <WelcomePage />
      </BrowserRouter>
    );

    const titlePart1 = screen.getByText(/WELCOME TO/i);
    const titlePart2 = screen.getByText(/EDUMASTER/i);
    
    expect(titlePart1).toBeInTheDocument();
    expect(titlePart2).toBeInTheDocument();
  });
});
