import { useForm } from 'react-hook-form';
import { AuthSchema } from '../authSchema';
import { yupResolver } from '@hookform/resolvers/yup';
export const useAuthHook = () => {
    return useForm({
        resolver: yupResolver(AuthSchema),
        mode: 'onChange',
    });
}