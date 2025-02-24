import {useContext} from "react";
import {authContext} from "../contexts/AuthContextProvider";

export const useAuthContextProvider =  () => {
    const context = useContext(authContext);


    if(!context){
        throw Error('useAuthContext should be used within the AuthContextProvider ')
    }

    return context;

}