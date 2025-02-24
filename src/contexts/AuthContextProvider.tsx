import {createContext, PropsWithChildren } from "react";
import { LOGIN, LOGOUT } from '../state/authState/authSlice';
import { RootState } from '../state/store';
import {useSelector} from 'react-redux';

interface AuthContext {
    currentUser: User | null | undefined;
    token: string | null | undefined;
}

export const authContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;


const AuthContextProvider = ({children} : AuthProviderProps) => {
    const {currentUser, token} = useSelector((state: RootState) => state.authState);

    return (
        <authContext.Provider value = {{
            currentUser,
            token
        } }>
            {children}
        </authContext.Provider>
    )
}


export default AuthContextProvider;