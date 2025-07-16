import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShoppingListItem from '../../components/ShoppingListItem';

describe('ShoppingListItem', () => {
  const item = { _id: '1', name: 'Milk', purchased: false };
  it('renders item name', () => {
    render(<ShoppingListItem item={item} onToggle={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText('Milk')).toBeInTheDocument();
  });

  it('calls onToggle when toggle button is clicked', () => {
    const onToggle = jest.fn();
    render(<ShoppingListItem item={item} onToggle={onToggle} onDelete={jest.fn()} />);
    fireEvent.click(screen.getByText(/mark as purchased/i));
    expect(onToggle).toHaveBeenCalled();
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = jest.fn();
    render(<ShoppingListItem item={item} onToggle={jest.fn()} onDelete={onDelete} />);
    fireEvent.click(screen.getByText(/delete/i));
    expect(onDelete).toHaveBeenCalled();
  });
}); 