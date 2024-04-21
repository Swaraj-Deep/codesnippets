'use client';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type AuthValue = { isLoggedIn: boolean; user: { firstName: string } };

export type AuthData = {
  data: AuthValue;
  handleAuthDataUpdate: (data: AuthValue) => void;
};

export const AuthContext = createContext<AuthData>({
  data: {
    isLoggedIn: false,
    user: { firstName: '' },
  },
  handleAuthDataUpdate: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [authData, setAuthData] = useState({
    isLoggedIn: false,
    user: { firstName: '' },
  });

  const handleAuthDataUpdate = useCallback(
    ({ isLoggedIn, user }: AuthValue) => {
      setAuthData({ isLoggedIn, user });
    },
    []
  );

  const value = useMemo(
    () => ({ data: authData, handleAuthDataUpdate }),
    [authData, handleAuthDataUpdate]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext) as AuthData;
