import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
jest.mock('../../api');
jest.mock('../../components/ShoppingListItem', () => ({
  __esModule: true,
  default: ({ item, onToggle, onDelete }) => (
    <li data-testid="mock-item">{item.name}</li>
  ),
}));
import { fetchItems, addItem } from '../../api';
import ShoppingList from '../../components/ShoppingList';

describe('ShoppingList', () => {
  beforeEach(() => {
    fetchItems.mockResolvedValue([
      { _id: '1', name: 'Milk', purchased: false },
      { _id: '2', name: 'Bread', purchased: true },
    ]);
    addItem.mockResolvedValue({ _id: '3', name: 'Eggs', purchased: false });
  });

  afterEach(() => jest.clearAllMocks());

  it('renders items from API', async () => {
    render(<ShoppingList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(await screen.findByText('Milk')).toBeInTheDocument();
    expect(screen.getByText('Bread')).toBeInTheDocument();
  });

  it('can add a new item', async () => {
    render(<ShoppingList />);
    await waitFor(() => screen.getByText('Milk'));
    fireEvent.change(screen.getByPlaceholderText(/add item/i), {
      target: { value: 'Eggs' },
    });
    fireEvent.click(screen.getByText(/add$/i));
    expect(await screen.findByText('Eggs')).toBeInTheDocument();
  });
}); 