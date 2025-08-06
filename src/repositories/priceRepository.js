// src/repositories/priceRepository.js
import { fetchDocData } from '../firebase';

export const getPremiumPrice = async () => {
  // Fetch the 'premium' document from the 'plans' collection
  const planData = await fetchDocData('plans', 'premium');
  // Return the 'price' field from the document data
  return planData ? planData.price : null;
};