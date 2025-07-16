import React from 'react';

export default function ShoppingListItem({ item, onToggle, onDelete }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span
        style={{
          textDecoration: item.purchased ? 'line-through' : 'none',
          color: item.purchased ? 'gray' : 'black',
        }}
      >
        {item.name}
      </span>
      <button onClick={onToggle}>
        {item.purchased ? 'Unmark' : 'Mark as Purchased'}
      </button>
      <button onClick={onDelete} style={{ color: 'red' }}>
        Delete
      </button>
    </li>
  );
} 