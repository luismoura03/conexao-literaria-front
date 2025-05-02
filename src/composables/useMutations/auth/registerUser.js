import { useMutation } from '@vue/apollo-composable';
import { REGISTER_USER } from '../../../graphql/mutations/users/users';
import { useRouter } from 'vue-router';
import useNotify from '../../notify/useNotify';

export function useRegisterUser() {
  const router = useRouter();
  const { notifySucess, notifyError } = useNotify();
  
  const { mutate: registerUser, loading, error } = useMutation(REGISTER_USER);
  
  const register = async (username, password, email, firstName, lastName) => {
    try {
      const response = await registerUser({
        input: {
            username,
            password,
            email,
            firstName,
            lastName
          }
        }
      );
      
      if (response.data?.register) {
        notifySucess({ 
          message: 'Registro realizado com sucesso! Por favor, faça login.'
        });
        
        router.push('/');
        return response;
      }
    } catch (err) {
      console.error('Erro no registro:', err);
      notifyError({ 
        message: 'Erro ao registrar usuário. Tente novamente.'
      });
      throw err;
    }
  };
  
  return { register, loading, error };
}