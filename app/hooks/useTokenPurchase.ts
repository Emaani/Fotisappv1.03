import  { useState} from 'react';

export const useTokenPurchase = () => {
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const purchaseTokens = async (amount: number) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call for purchasing tokens
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Hardcoded success for demonstration
      if (amount > 0) {
        setPurchaseSuccess(true);
      } else {
        throw new Error('Invalid purchase amount');
      }
    } catch (err: any) {
      setPurchaseSuccess(false);
      setError(err.message || 'An error occurred during the purchase');
    } finally {
      setLoading(false);
    }
  };

  const resetPurchaseStatus = () => {
    setPurchaseSuccess(false);
    setError(null);
  };

  return { purchaseSuccess, loading, error, purchaseTokens, resetPurchaseStatus };
};
