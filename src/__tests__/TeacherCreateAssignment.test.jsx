import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TeacherCreateAssignment from '../pages/TeacherCreateAssignment';
import { describe, it, expect } from 'vitest';

describe('TeacherCreateAssignment', () => {
  it('renders the create assignment form', () => {
    render(
      <BrowserRouter>
        <TeacherCreateAssignment />
      </BrowserRouter>
    );

    const titleInput = screen.getByPlaceholderText(/Title/i);
    const descriptionInput = screen.getByPlaceholderText(/Description/i);
    const createButton = screen.getByRole('button', { name: /Create/i });

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
  });
});
