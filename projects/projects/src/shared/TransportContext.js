// TransportContext.js
import React, { useState, useContext } from 'react';

const TransportContext = React.createContext();

export const TransportProvider = ({ children }) => {
    const [transports, setTransports] = useState([]);

    const addTransport = (transport) => {
        setTransports([...transports, transport]);
    };

    const removeTransport = (id) => {
        setTransports(transports.filter(transport => transport.id !== id));
    };

    return (
        <TransportContext.Provider value={{ transports, addTransport, removeTransport }}>
            {children}
        </TransportContext.Provider>
    );
};

export const useTransportContext = () => {
    return useContext(TransportContext);
};
