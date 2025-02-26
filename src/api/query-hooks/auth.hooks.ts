import { authService } from '../services/auth.service';
import {useMutation} from '@tanstack/react-query';

export const useGoogleAuth = () => {
return useMutation({
    mutationFn: authService.initiateGoogleAuth,
    onMutate: () => {
    // Optional: Store pending state in global store
    sessionStorage.setItem('oauth_pending', 'true');
    },
    onSettled: () => {
    sessionStorage.removeItem('oauth_pending');
    },
});
};