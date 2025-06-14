export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })

    // Manejamos errores HTTP
    if (!response.ok) {
      const error = await response.json();
      console.error('Error de login:', error);
      throw new Error(error.message || 'Login fallido');
    }

    // Si todo va bien
    const data = await response.json();
    console.log('Login exitoso:', data);
    return data;

  }catch(error) {
    throw error
  }
}


export async function profile(){
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const error = await response.json();
      console.error('Error de login:', error);
      throw new Error(error.message || 'Login fallido');
    }
    const data = await response.json();
    return data;
  }catch (error) {
    throw error;
  }
}
