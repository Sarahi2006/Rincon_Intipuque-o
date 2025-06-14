export const url = import.meta.env.VITE_API_URL || 'https://backend-rincon-intipuquenio.onrender.com';

export const getProducts = async () => {
  const response = await fetch(`${url}/api/products`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};
