"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../schema/type";
// Create the authentication context
const AuthContext = createContext<{
  user: User | null;
  isAuthenticated: boolean;
  signIn: (userData: User) => void;
  signOut: () => void;
}>({
  user: null,
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
});
export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data: session, status } = useSession();
  useEffect(() => {
    const fetchSession = async () => {
      if (session && session.user) {
        // Create a User object from the Session
        const user: User = {
          name: session.user.name,
          email: session.user.email,
          id: undefined ,
          image: session.user.image,
        };
        // Set the user and set isAuthenticated to true
        setUser(user);
        signIn(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    fetchSession();
  }, [session , status]);
  const signIn = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };
  const signOut = async () => {
    setUser(null);
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
