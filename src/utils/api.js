const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.jumpingcrab.com"
    : "http://localhost:3001";

function checkResponse(res) {
  return res.json().then((data) => {
    if (res.ok) return data;
    console.error("API Error:", data);
    return Promise.reject(data.message || `Error: ${res.status}`);
  });
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
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}

// Add a new item (requires auth)
function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthHeaders(),

    body: JSON.stringify({ name, imageUrl, weather }),
  })
    .then(checkResponse)
    .then((response) => {
      console.log("✅ Raw item from backend:", response);
      return response.data; // ✅ Extract the actual item
    });
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
