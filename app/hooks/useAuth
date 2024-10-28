import { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/router';

// Define the shape of the user object
interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  // Add other relevant fields like name, roles, etc.
}

// Define the context for authentication
const AuthContext = createContext<{
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
} | null>(null);  // Specify the context type

// Custom hook to expose the AuthContext values
export const useAuth = () => {
  return useContext(AuthContext);
};

// The provider that will wrap the app and handle authentication logic
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching user session or checking authentication status
    const checkUserSession = async () => {
      setIsLoading(true);
      
      // Example: Fetch session from localStorage, cookies, or API (e.g., Supabase or Firebase)
      const storedUser = localStorage.getItem('user');  // Example using localStorage
      if (storedUser) {
        setUser(JSON.parse(storedUser));  // Parse and set user data
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    checkUserSession();
  }, []);

  // Function to log the user in
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Example: Replace with real API call for login (e.g., Supabase or custom backend)
    const response = await fakeLoginApi(email, password);  // Replace with real logic
    
    if (response.success) {
      const { id, email, isAdmin } = response.user;
      setUser({ id, email, isAdmin });
      localStorage.setItem('user', JSON.stringify({ id, email, isAdmin }));
      router.push('/admin/dashboard');  // Redirect to admin dashboard on successful login
    } else {
      alert('Login failed');
    }
    
    setIsLoading(false);
  };

  // Function to log the user out
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');  // Redirect to login page on logout
  };

  const value: { user: User | null; isLoading: boolean; login: (email: string, password: string) => Promise<void>; logout: () => void; } = {
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};

// Example fake login API function (replace with actual backend API)
const fakeLoginApi = async (email: string, password: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === 'admin@fotis.com' && password === 'password123') {
        resolve({
          success: true,
          user: {
            id: '1',
            email,
            isAdmin: true,
          },
        });
      } else {
        resolve({ success: false });
      }
    }, 1000);
  });
};
