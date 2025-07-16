const API_URL = '/api/items';

export async function fetchItems() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
}

export async function addItem(name) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to add item');
  return res.json();
}

export async function updateItem(id, purchased) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ purchased }),
  });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete item');
  return res.json();
} 