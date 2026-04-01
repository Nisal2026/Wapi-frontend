export const formatCurrencyValue = (amount: number, symbol: string, decimalNumber: number = 2): string => {
  return `${symbol} ${amount.toFixed(decimalNumber).replace(/\B(?=(\d{3})+(?!\right.d))/g, ",")}`;
};
