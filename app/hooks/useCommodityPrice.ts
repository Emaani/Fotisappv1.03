import { useState, useEffect } from 'react';

const commodityPrices = {
  Soybeans: 2500,
  Coffee: 13000,
  Maize: 900,
  Sesame: 6000,
  Sunflower: 1300,
};

export const useCommodityPrice = (commodityName: keyof typeof commodityPrices) => {
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrice = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setPricePerUnit(commodityPrices[commodityName] || 0);
      setLoading(false);
    };

    fetchPrice();
  }, [commodityName]);

  return { pricePerUnit, loading };
};