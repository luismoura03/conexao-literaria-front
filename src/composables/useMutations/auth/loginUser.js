// src/composables/useMutations/auth/loginUser.js
import { useMutation } from '@vue/apollo-composable';
import { LOGIN_USER } from '../../../graphql/mutations/users/users';
import { useAuthStore } from '../../../stores/authStore';
import { useRouter } from 'vue-router';

export function useLoginUser() {
  const authStore = useAuthStore();
  const router = useRouter();
  
  const { mutate: loginUser, loading, error } = useMutation(LOGIN_USER);
  
  const login = async (username, password) => {
    try {
      const response = await loginUser({ username, password });
      const { token, user } = response.data.login;
      
      authStore.login(token, user);
      router.push('/home');
      
      return response;
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };
  
  return { login, loading, error };
}