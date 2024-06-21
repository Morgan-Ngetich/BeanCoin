import React, { createContext, useState } from 'react';

const PrincipalIdContext = createContext();

export const PrincipalIdProvider = ({ children }) => {
    const [principalId, setPrincipalId] = useState(null);

    return (
        <PrincipalIdContext.Provider value={{ principalId, setPrincipalId }}>
            {children}
        </PrincipalIdContext.Provider>
    );
};

export default PrincipalIdContext;
