// src/data/pricing.ts

// Define the interface for a pricing entry
export interface PricingEntry {
  model: string;
  storage: string;
  carrier: string;
  condition: string;
  price: number;
}

// Create an array of pricing entries
export const pricingData: PricingEntry[] = [
  // iPhone 15 Pro Max
  // 256GB Unlocked
  { model: 'iphone 15 pro max', storage: '256gb', carrier: 'unlocked', condition: 'A/B', price: 750 },
  { model: 'iphone 15 pro max', storage: '256gb', carrier: 'unlocked', condition: 'C', price: 450 },
  { model: 'iphone 15 pro max', storage: '256gb', carrier: 'unlocked', condition: 'D', price: 200 },
  // 256GB Locked
  { model: 'iphone 15 pro max', storage: '256gb', carrier: 'locked', condition: 'A/B', price: 575 },
  { model: 'iphone 15 pro max', storage: '256gb', carrier: 'locked', condition: 'C', price: 345 },
  { model: 'iphone 15 pro max', storage: '256gb', carrier: 'locked', condition: 'D', price: 115 },

  // 512GB Unlocked
  { model: 'iphone 15 pro max', storage: '512gb', carrier: 'unlocked', condition: 'A/B', price: 815 },
  { model: 'iphone 15 pro max', storage: '512gb', carrier: 'unlocked', condition: 'C', price: 505 },
  { model: 'iphone 15 pro max', storage: '512gb', carrier: 'unlocked', condition: 'D', price: 205 },
  // 512GB Locked
  { model: 'iphone 15 pro max', storage: '512gb', carrier: 'locked', condition: 'A/B', price: 660 },
  { model: 'iphone 15 pro max', storage: '512gb', carrier: 'locked', condition: 'C', price: 400 },
  { model: 'iphone 15 pro max', storage: '512gb', carrier: 'locked', condition: 'D', price: 120 },

  // 1TB Unlocked
  { model: 'iphone 15 pro max', storage: '1tb', carrier: 'unlocked', condition: 'A/B', price: 865 },
  { model: 'iphone 15 pro max', storage: '1tb', carrier: 'unlocked', condition: 'C', price: 555 },
  { model: 'iphone 15 pro max', storage: '1tb', carrier: 'unlocked', condition: 'D', price: 205 },
  // 1TB Locked
  { model: 'iphone 15 pro max', storage: '1tb', carrier: 'locked', condition: 'A/B', price: 710 },
  { model: 'iphone 15 pro max', storage: '1tb', carrier: 'locked', condition: 'C', price: 450 },
  { model: 'iphone 15 pro max', storage: '1tb', carrier: 'locked', condition: 'D', price: 120 },

  // iPhone 15 Pro
  // 128GB Unlocked
  { model: 'iphone 15 pro', storage: '128gb', carrier: 'unlocked', condition: 'A/B', price: 595 },
  { model: 'iphone 15 pro', storage: '128gb', carrier: 'unlocked', condition: 'C', price: 295 },
  { model: 'iphone 15 pro', storage: '128gb', carrier: 'unlocked', condition: 'D', price: 165 },
  // 128GB Locked
  { model: 'iphone 15 pro', storage: '128gb', carrier: 'locked', condition: 'A/B', price: 445 },
  { model: 'iphone 15 pro', storage: '128gb', carrier: 'locked', condition: 'C', price: 250 },
  { model: 'iphone 15 pro', storage: '128gb', carrier: 'locked', condition: 'D', price: 90 },

  // 256GB Unlocked
  { model: 'iphone 15 pro', storage: '256gb', carrier: 'unlocked', condition: 'A/B', price: 650 },
  { model: 'iphone 15 pro', storage: '256gb', carrier: 'unlocked', condition: 'C', price: 350 },
  { model: 'iphone 15 pro', storage: '256gb', carrier: 'unlocked', condition: 'D', price: 170 },
  // 256GB Locked
  { model: 'iphone 15 pro', storage: '256gb', carrier: 'locked', condition: 'A/B', price: 500 },
  { model: 'iphone 15 pro', storage: '256gb', carrier: 'locked', condition: 'C', price: 250 },
  { model: 'iphone 15 pro', storage: '256gb', carrier: 'locked', condition: 'D', price: 95 },

  // Continue adding entries for all models, storages, carriers, and conditions
  // ...

  // For brevity, only a portion of the data is shown here.
  // You need to add entries for all combinations as per your pricing.
];


  
