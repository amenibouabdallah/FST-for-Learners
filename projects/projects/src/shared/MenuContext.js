// MenuContext.js
import React, { useState, createContext, useContext, useEffect } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menuData, setMenuData] = useState(() => {
        const storedData = localStorage.getItem('menuData');
        return storedData ? JSON.parse(storedData) : null;
    });

    const updateMenuData = (data) => {
        setMenuData(data);
        localStorage.setItem('menuData', JSON.stringify(data));
    };

    return (
        <MenuContext.Provider value={{ menuData, updateMenuData }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);
