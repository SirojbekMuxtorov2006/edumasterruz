import { useState, useEffect } from 'react';
import { OlympiadLevel } from '../data/olympiadData';
import { mockUser, UserProfile } from '../data/userData';

export interface User extends Partial<UserProfile> {
  name: string;
  phone: string;
  level: OlympiadLevel;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const savedUser = localStorage.getItem('turon_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      // Merge with mock stats for the profile view
      setUser({ ...mockUser, ...parsed });
    }
    setLoading(false);
  }, []);

  const register = (userData: User) => {
    localStorage.setItem('turon_user', JSON.stringify(userData));
    // Merge input data with mock profile data
    setUser({ ...mockUser, ...userData });
  };

  const logout = () => {
    localStorage.removeItem('turon_user');
    setUser(null);
    // Navigation should be handled by the component call, or we can't use useNavigate here easily 
    // without wrapping in a component context, but for hooks pattern usually return function
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    register,
    logout
  };
};
