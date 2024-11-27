import { useEffect, useState, createContext } from "react";
import { fetchUserData } from "../services/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [name, setName] = useState('');
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const loadUserData = async () => {
            const userData = await fetchUserData();
            setName(userData.name);
            setPoints(userData.points);
        };

        loadUserData();

        }, []);

        const updateName = (newName) => {
            setName(newName);
        };

        return (
          <UserContext.Provider value = {{ points, setPoints, updateName, name }}>
            {children}
          </UserContext.Provider>
        );
};
