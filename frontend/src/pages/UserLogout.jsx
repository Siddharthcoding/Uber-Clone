import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserLogout() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            console.error("No token found. Redirecting to login.");
            navigate('/login');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        })
        .catch((error) => {
            console.error("Logout Error:", error.response?.data || error.message);
            if (error.response?.status === 401) {
                // Handle token invalidation
                localStorage.removeItem('token');
                navigate('/login');
            }
        });
    }, [token, navigate]);

    return <div>Logging out...</div>;
}

export default UserLogout;
