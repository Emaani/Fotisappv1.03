import { useState, useEffect } from 'react';

export const useTokenBalance = () => {
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTokenBalance = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setTokenBalance(1500); // Hardcoded token balance for demonstration
      setLoading(false);
    };

    fetchTokenBalance();
  }, []);

  const refreshBalance = async () => {
    setLoading(true);
    setTokenBalance(tokenBalance); // Replaced 'tokenBalanceValue' with 'tokenBalance'
  };

  return { tokenBalance, loading, refreshBalance };
};