// src/viewmodels/featuresComparisonViewModel.js
import { useState, useEffect } from 'react';
import { getPremiumPrice } from '../repositories/priceRepository';

const useFeaturesComparisonViewModel = () => {
  const [premiumPrice, setPremiumPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const price = await getPremiumPrice();
        setPremiumPrice(price);
      } catch (e) {
        setError("Failed to load price.");
        console.error("Error fetching premium price:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrice();
  }, []);

  return { premiumPrice, isLoading, error };
};

export default useFeaturesComparisonViewModel;