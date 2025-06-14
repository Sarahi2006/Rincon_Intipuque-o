export async function register(name: string, lastname: string, email: string, password: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ name, lastname, email, password })
    })

    if (!response.ok) {
      const error = await response.json();
      console.error('Error de registro:', error);
      throw new Error(error.message || 'Registro fallido');
    }

    const data = await response.json();
    console.log('Registro exitoso:', data);
    return data;

  } catch(error) {
    throw error;
  }
}
