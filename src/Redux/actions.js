export const UPDATE_CARD_FILTERS = "UPDATE_CARD_FILTERS";
export const UPDATE_CARD_TRANSACTION_FILTERS =
  "UPDATE_CARD_TRANSACTION_FILTERS";
export const UPDATE_TRANSACTION_FILTERS = "UPDATE_TRANSACTION_FILTERS";

export const updateCardFilters = (payload) => ({
  type: UPDATE_CARD_FILTERS,
  payload,
});

export const updateTransactionFilters = (payload) => ({
  type: UPDATE_TRANSACTION_FILTERS,
  payload,
});

export const updateCardTransactionFilters = (payload) => ({
  type: UPDATE_CARD_TRANSACTION_FILTERS,
  payload,
});
