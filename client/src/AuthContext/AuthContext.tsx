import React, { useContext, useState } from "react";

type AuthContextType = {
    auth: boolean;
    setAuth(value: boolean): void;
    user: { id: string; email: string };
    setUser({ id, email }: { id: string; email: string }): void;
};

type Props = {
    children: React.ReactNode;
};

const defaults = {
    auth: false,
    user: { id: "", email: "string" },
} as AuthContextType;

const AuthContext = React.createContext(defaults);

const AuthContextProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({ id: "", email: "" });

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext };

export default AuthContextProvider;
