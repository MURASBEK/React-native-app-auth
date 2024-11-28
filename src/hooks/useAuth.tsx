import React from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Uygulama başladığında token kontrolü
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userData = await AsyncStorage.getItem('user');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        console.error('Token check error:', err);
      }
    };

    checkToken();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Giriş isteği
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      });

      const token = response.data.token;
      await AsyncStorage.setItem('token', token);

      // Kullanıcı bilgilerini al
      const userResponse = await axios.get('https://fakestoreapi.com/users/1');
      const userData = userResponse.data;

      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
