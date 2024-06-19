import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() =>
        localStorage.getItem("access_token")
    );
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            if (authToken) {
                try {
                    const response = await axios.get("/api/get_user/", {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    });
                    setUser(response.data.user);
                } catch (err) {
                    if (err.response.status === 401) {
                        localStorage.removeItem("access_token");
                        setAuthToken(null);
                    }
                }
            }
        };
        console.log(user);
        fetchUser();
    }, [authToken]);

    const value = { authToken, setAuthToken, user, setUser };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
