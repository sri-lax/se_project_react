const baseUrl = "http://localhost:3001";

//  Reusable response handler
function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// Helper to get auth headers
function getAuthHeaders() {
  const token = localStorage.getItem("jwt");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Get all items
function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: getAuthHeaders(),
  }).then(checkResponse);
}

// Add a new item (requires auth)
function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

// Delete an item by ID (requires auth)
function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(checkResponse);
}

//  Add a like to an item
function addCardLike(itemId) {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: getAuthHeaders(),
  }).then(checkResponse);
}

//  Remove a like from an item
function removeCardLike(itemId) {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(checkResponse);
}

export {
  getItems,
  addItem,
  deleteItem,
  checkResponse,
  addCardLike,
  removeCardLike,
};
