'use client';

import { useState, useEffect } from 'react';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setIsMounted(true);
      const savedAuth = localStorage.getItem('isLoggedIn');
      if (savedAuth === 'true') {
        setIsLoggedIn(true);
      }
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Allow any email containing '@' and password with length >= 4
    if (email.includes('@') && password.length >= 4) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      return true;
    } else {
      setError('Please enter a valid email address and a password with at least 4 characters.');
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
  };

  return {
    isLoggedIn: isMounted ? isLoggedIn : false,
    isReady: isMounted,
    error,
    login,
    logout,
  };
}
