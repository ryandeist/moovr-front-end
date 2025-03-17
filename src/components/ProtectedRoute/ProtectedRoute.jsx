// imports
import { Navigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import api from '../../services/apiService';
import { useState, useEffect } from 'react';

// this component checks and passes token authorization to protected routes.
const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        try {
            needTokenRefresh();
        } catch {
            setIsAuthorized(false);
        };
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refresh');

        try {
            const res = await api.post('/api/token/refresh/', {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem('access', res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (err) {
            console.log(err);
            setIsAuthorized(false);
        };
    };

    const needTokenRefresh = async () => {
        const token = localStorage.getItem('access');
        if (!token) {
            setIsAuthorized(false);
            return;
        };

        const decodedToken = jwtDecode(token);
        const tokenExpiration = decodedToken.exp;
        const currentTime = Date.now() / 1000;

        if (tokenExpiration < currentTime) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        };
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>
    };

    return isAuthorized ? children : <Navigate to='/' />
};

export default ProtectedRoute;