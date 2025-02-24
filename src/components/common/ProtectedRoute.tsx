import React, {PropsWithChildren} from 'react'
import {useAuthContextProvider} from '../../hooks/useAuthContextProvider'

type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles: User['roles'];
}

const ProtectedRoute = ({allowedRoles, children }: ProtectedRouteProps) => {
    const {currentUser} = useAuthContextProvider();

    if(currentUser === undefined){
        return <div>Loading...</div>
    }



    if(currentUser === null ||
       (allowedRoles && !currentUser.roles.some(role => allowedRoles.includes(role)))
    ){
        return <div>Permission Denied!.You don't have permission to access this page</div>
    }


    return children
}

export default ProtectedRoute
