const url = process.env.REACT_APP_BACKEND_URL;
async function fetchLocations() {
  const response = await fetch(`${url}/locations`);
  const data = await response.json();
  return data;
}

async function fetchLocationNameById(id) {
  if (id) {
    const response = await fetch(`${url}/location/${id}`);
    const data = await response.json();
    return data.name;
  }
}

async function fetchMealTypes() {
  const response = await fetch(`${url}/mealtypes`);
  const data = await response.json();
  return data;
}

async function fetchMealTypeNameById(id) {
  const response = await fetch(`${url}/mealtype/${id}`);
  const data = await response.json();
  return data.name;
}

async function fetchFilteredRestaurants(requestBody) {
  const response = await fetch(`${url}/filter`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const data = await response.json();
  return data;
}

async function fetchRestaurantById(id) {
  const response = await fetch(`${url}/getrestaurantbyid/${id}`);
  const data = await response.json();
  return data.restaurant;
}

async function fetchRestaurantsByLocationId(id) {
  const response = await fetch(`${url}/restaurantbylocation/${id}`);
  const data = await response.json();
  return data.restaurants;
}

async function addUser(payload) {
  const response = await fetch(`${url}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (response.status !== 200) return alert(data.error);
}

async function checkUserDetails(payload) {
  const response = await fetch(`${url}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (response.status !== 200) return alert(data.error);
  localStorage.setItem("accessToken", data.accessToken);
  return data.isLoggedIn ? true : alert(data.message);
}

async function getMenuItems(id) {
  const response = await fetch(
    `${url}/menuitemsbyrestaurant?restaurantId=${id}`
  );
  const data = await response.json();
  return data.items;
}

export {
  fetchLocations,
  fetchMealTypes,
  fetchFilteredRestaurants,
  fetchLocationNameById,
  fetchMealTypeNameById,
  fetchRestaurantById,
  fetchRestaurantsByLocationId,
  addUser,
  checkUserDetails,
  getMenuItems,
};
