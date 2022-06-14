import React, { useState } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return  (
        <LoadingContext.Provider value={{
            loading,
            setLoading
        }}>
            {children}
        </LoadingContext.Provider>
    )
}