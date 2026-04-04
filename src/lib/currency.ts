export type Currency = 'PKR' | 'USD';

export const EXCHANGE_RATE = 280; // 1 USD = 280 PKR

export function convertPrice(price: number, from: Currency, to: Currency): number {
  if (from === to) return price;
  
  if (from === 'USD' && to === 'PKR') {
    return price * EXCHANGE_RATE;
  }
  
  if (from === 'PKR' && to === 'USD') {
    return price / EXCHANGE_RATE;
  }
  
  return price;
}

export function formatPrice(price: number, currency: Currency): string {
  const symbol = currency === 'USD' ? '$' : 'Rs. ';
  
  // For PKR, we usually don't show decimals if it's a large amount, but let's keep it consistent
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: currency === 'USD' ? 2 : 0,
    maximumFractionDigits: currency === 'USD' ? 2 : 0,
  }).format(price);
  
  return `${symbol}${formatted}`;
}
