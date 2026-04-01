import { useAppSelector } from "../redux/hooks";
import { useGetExchangeRateQuery } from "../redux/api/currencyApi";
import { formatCurrencyValue } from "../utils/currencyValue";
import { useMemo } from "react";

export const useExchangeRate = (fromCode: string) => {
  const selectedCurrency = useAppSelector((state) => state.currency.selectedCurrency);
  const toCode = selectedCurrency?.code;

  const { data, isLoading, isFetching, isError } = useGetExchangeRateQuery({ from: fromCode, to: toCode || fromCode }, { skip: !toCode || fromCode?.toUpperCase() === toCode?.toUpperCase() });

  const isStale = useMemo(() => {
    return data?.success && data?.data?.to?.toUpperCase() !== toCode?.toUpperCase();
  }, [data, toCode]);

  const rate = useMemo(() => {
    if (fromCode?.toUpperCase() === toCode?.toUpperCase()) return 1;
    if (data?.success && data.data.rate && !isStale) {
      return data.data.rate;
    }
    return null;
  }, [data, toCode, fromCode, isStale]);

  return {
    rate,
    isLoading: isLoading || isFetching || (rate === null && !isError),
    isError,
    selectedCurrency,
  };
};

/**
 * Hook to convert and format a single amount.
 */
export const useCurrencyConverter = (amount: number, fromCode: string) => {
  const { rate, isLoading, isError, selectedCurrency } = useExchangeRate(fromCode);

  const convertedAmount = useMemo(() => (rate !== null ? amount * rate : null), [amount, rate]);

  const formattedValue = useMemo(() => {
    if (!selectedCurrency) return `${fromCode} ${amount}`;
    if (convertedAmount === null) return "...";
    return formatCurrencyValue(convertedAmount, selectedCurrency.symbol, selectedCurrency.decimal_number);
  }, [convertedAmount, selectedCurrency, fromCode, amount]);

  return {
    convertedAmount,
    formattedValue,
    isLoading,
    isError,
    selectedCurrency,
  };
};

/**
 * Hook to get the selected currency and a conversion function.
 */
export const useCurrency = () => {
  const selectedCurrency = useAppSelector((state) => state.currency.selectedCurrency);

  const convertAndFormat = (amount: number, rate: number | null = 1) => {
    if (rate === null) return "...";
    const converted = amount * rate;
    if (!selectedCurrency) return amount.toString();
    return formatCurrencyValue(converted, selectedCurrency.symbol, selectedCurrency.decimal_number);
  };

  return {
    selectedCurrency,
    convertAndFormat,
  };
};
