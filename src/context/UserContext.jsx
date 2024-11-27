import { useEffect, useState, createContext } from "react";
import { fetchUserData } from "../services/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const loadUserData = async () => {
            const userData = await fetchUserData();
            setUser(userData);
            setName(userData.name);
            setPoints(userData.points);
        };

        loadUserData();

        }, []);

        const updateName = (newName) => {
            setName(newName);
        };

        return (
          <UserContext.Provider value = {{ user, points, setPoints, updateName, name }}>
            {children}
          </UserContext.Provider>
        );
};
