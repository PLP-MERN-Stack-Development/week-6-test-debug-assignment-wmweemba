import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
jest.mock('../../api');
import * as api from '../../api';
import { AuthProvider } from '../../context/AuthContext';
import App from '../../App';

describe('Frontend Auth Integration', () => {
  beforeEach(() => {
    api.fetchItems.mockResolvedValue([]);
    api.addItem.mockResolvedValue({ _id: '1', name: 'Milk', purchased: false });
    api.updateItem.mockResolvedValue({ _id: '1', name: 'Milk', purchased: true });
    api.deleteItem.mockResolvedValue({ message: 'Item deleted' });
  });
  afterEach(() => jest.clearAllMocks());

  it('shows validation errors on login and register', async () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
    // Try to login with invalid email
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'bad' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText(/login/i));
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
    // Switch to register
    fireEvent.click(screen.getByText(/register/i));
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'bad' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText(/^register$/i));
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });

  it('registers and logs in a user, then shows shopping list', async () => {
    // Mock register/login API
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ token: 'testtoken' }) }) // register
      .mockResolvedValueOnce({ ok: true, json: async () => ({ token: 'testtoken' }) }); // login
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
    // Register
    fireEvent.click(screen.getByText(/register/i));
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/^register$/i));
    await waitFor(() => expect(screen.getByText(/shopping list/i)).toBeInTheDocument());
    // Logout
    fireEvent.click(screen.getByText(/logout/i));
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    // Login
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/login/i));
    await waitFor(() => expect(screen.getByText(/shopping list/i)).toBeInTheDocument());
  });
}); 