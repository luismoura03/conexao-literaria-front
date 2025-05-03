import { defineStore } from 'pinia';
import { useApolloClient } from '@vue/apollo-composable';
import { LOGOUT_USER } from '../graphql/mutations/users/users';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem('user') || 'null')
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
    username: (state) => state.user?.username || '',
    role: (state) => state.user?.role || 'guest'
  },
  
  actions: {
    login(user) {
      this.user = user;
      
      sessionStorage.setItem('user', JSON.stringify(user));
    },
    
    async logout() {
      const { client } = useApolloClient();

      try {
        await client.mutate({
          mutation: LOGOUT_USER
        });

        this.user = null;
        sessionStorage.removeItem('user');

        return true;
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
        return false;
      }
    }
  }
});