// /composables/useAuth.ts
// Composable simple para manejar sesión en el cliente.
// - No maneja el token (va en cookie httpOnly).
// - Expone: user, isLoggedIn, loading, fetchMe, login, register, logout.

type Me = {
  id: number;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
};

export const useAuth = () => {
  const user = useState<Me | null>('user', () => null);
  const loading = useState<boolean>('authLoading', () => false);
  const isLoggedIn = computed(() => !!user.value);

  // Obtiene el usuario actual (si la cookie es válida)
  const fetchMe = async () => {
    loading.value = true;
    try {
      const { data, error } = await useFetch('/api/me'); // la cookie viaja sola
      user.value = error.value ? null : (data.value as Me);
    } finally {
      loading.value = false;
    }
  };

  // Iniciar sesión
  const login = async (email: string, password: string) => {
    const { error } = await useFetch('/api/login', {
      method: 'POST',
      body: { email, password }
    });
    if (error.value) {
      throw createError(error.value.data || { statusMessage: 'Error de login' });
    }
    // Hidrata el usuario tras crear la cookie en el servidor
    await fetchMe();
  };

  // Registrar usuario (y quedar logueado)
  const register = async (payload: { email: string; password: string; repeat_password: string; first_name?: string | null; last_name?: string | null }) => {
    const { error } = await useFetch('/api/register', {
      method: 'POST',
      body: payload
    });
    if (error.value) {
      throw createError(error.value.data || { statusMessage: 'Error de registro' });
    }
    await fetchMe();
  };

  // Cerrar sesión
  const logout = async () => {
    await useFetch('/api/logout', { method: 'POST' });
    user.value = null;
  };

  return { user, isLoggedIn, loading, fetchMe, login, register, logout };
};
