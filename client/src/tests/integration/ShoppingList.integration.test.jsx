import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
jest.mock('../../api');
import * as api from '../../api';
import ShoppingList from '../../components/ShoppingList';

describe('ShoppingList Integration', () => {
  beforeEach(() => {
    api.fetchItems.mockResolvedValue([
      { _id: '1', name: 'Milk', purchased: false },
      { _id: '2', name: 'Bread', purchased: true },
    ]);
    api.addItem.mockResolvedValue({ _id: '3', name: 'Eggs', purchased: false });
    api.updateItem.mockImplementation((id, purchased) =>
      Promise.resolve({ _id: id, name: 'Milk', purchased })
    );
    api.deleteItem.mockResolvedValue({ message: 'Item deleted' });
  });

  afterEach(() => jest.clearAllMocks());

  it('renders items from API and allows adding a new item', async () => {
    render(<ShoppingList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(await screen.findByText('Milk')).toBeInTheDocument();
    expect(screen.getByText('Bread')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/add item/i), {
      target: { value: 'Eggs' },
    });
    fireEvent.click(screen.getByText(/add$/i));
    expect(await screen.findByText('Eggs')).toBeInTheDocument();
  });

  it('prevents adding empty item', async () => {
    render(<ShoppingList />);
    await waitFor(() => screen.getByText('Milk'));
    fireEvent.change(screen.getByPlaceholderText(/add item/i), {
      target: { value: ' ' },
    });
    fireEvent.click(screen.getByText(/add$/i));
    // Should not call addItem API
    expect(api.addItem).not.toHaveBeenCalled();
  });

  it('toggles purchased state', async () => {
    render(<ShoppingList />);
    await waitFor(() => screen.getByText('Milk'));
    const toggleButton = screen.getAllByText(/mark as purchased|unmark/i)[0];
    fireEvent.click(toggleButton);
    await waitFor(() => expect(api.updateItem).toHaveBeenCalled());
  });

  it('deletes an item', async () => {
    render(<ShoppingList />);
    await waitFor(() => screen.getByText('Milk'));
    const deleteButton = screen.getAllByText(/delete/i)[0];
    fireEvent.click(deleteButton);
    await waitFor(() => expect(api.deleteItem).toHaveBeenCalled());
  });
}); 