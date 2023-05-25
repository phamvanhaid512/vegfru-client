import React, { useEffect, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { isLogin } from './logics/logics';

const PrivateRoutes = () => {
    let login = isLogin();
    if(login) return <Outlet />
    else return <Navigate to={"/"} />

}

export default PrivateRoutes
