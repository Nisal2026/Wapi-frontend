import { Currency } from "@/src/types/currency";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const STORAGE_KEY = "selected_currency";

const getPersistedCurrency = (): Currency | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Currency) : null;
  } catch {
    return null;
  }
};

interface CurrencyState {
  selectedCurrency: Currency | null;
}

const initialState: CurrencyState = {
  selectedCurrency: getPersistedCurrency(),
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setSelectedCurrency: (state, action: PayloadAction<Currency>) => {
      state.selectedCurrency = action.payload;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
        } catch {
          // ignore storage errors
        }
      }
    },
    clearSelectedCurrency: (state) => {
      state.selectedCurrency = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
  },
});

export const { setSelectedCurrency, clearSelectedCurrency } = currencySlice.actions;
export default currencySlice.reducer;
