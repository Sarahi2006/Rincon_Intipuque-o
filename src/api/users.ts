export async function getUsers() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const error = await response.json();
      console.error('Error de login:', error);
    }

    const data = await response.json();
    return data;
  }catch(error) {
    throw error;
  }
}
