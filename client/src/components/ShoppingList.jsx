import React, { useEffect, useState } from 'react';
import { fetchItems, addItem, updateItem, deleteItem } from '../api';
import ShoppingListItem from './ShoppingListItem';

export default function ShoppingList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems()
      .then(setItems)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    try {
      const item = await addItem(newItem);
      setItems([...items, item]);
      setNewItem('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id, purchased) => {
    try {
      const updated = await updateItem(id, purchased);
      setItems(items.map(item => item._id === id ? updated : item));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color:'red'}}>Error: {error}</div>;

  return (
    <div>
      <h2>Shopping List</h2>
      <form onSubmit={handleAdd}>
        <input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          placeholder="Add item..."
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map(item => (
          <ShoppingListItem
            key={item._id}
            item={item}
            onToggle={() => handleToggle(item._id, !item.purchased)}
            onDelete={() => handleDelete(item._id)}
          />
        ))}
      </ul>
    </div>
  );
} 