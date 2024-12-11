import { pricingData } from '../data/pricing'; // Ensure the path is correct

// Helper function to normalize strings
const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '').trim();

// Helper function to find the price in the pricingData array
export const getQuote = (
  model: string,
  storage: string,
  carrier: string,
  condition: string
): number | null => {
  const normalizedModel = normalize(model);
  const normalizedStorage = normalize(storage);
  const normalizedCarrier = normalize(carrier);
  const normalizedCondition = condition.toUpperCase().trim();

  // Debugging statements
  console.log('Searching for:', {
    model: normalizedModel,
    storage: normalizedStorage,
    carrier: normalizedCarrier,
    condition: normalizedCondition,
  });

  // Find the matching pricing entry
  const entry = pricingData.find(
    (item) =>
      normalize(item.model) === normalizedModel &&
      normalize(item.storage) === normalizedStorage &&
      normalize(item.carrier) === normalizedCarrier &&
      item.condition.toUpperCase().trim() === normalizedCondition
  );

  if (entry) {
    console.log('Found entry:', entry);
    return entry.price;
  } else {
    console.error('No matching pricing entry found.');
    return null;
  }
};

