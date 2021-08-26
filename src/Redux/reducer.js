import {
  UPDATE_CARD_FILTERS,
  UPDATE_CARD_TRANSACTION_FILTERS,
  UPDATE_TRANSACTION_FILTERS,
} from "./actions";

const initialValue = {
  cardFilters: null,
  transactionFilters: null,
  cardTransactionFilters: null,
};

export default function reducer(state = initialValue, action) {
  switch (action.type) {
    case UPDATE_CARD_FILTERS:
      return {
        ...state,
        cardFilters: action.payload,
      };
    case UPDATE_TRANSACTION_FILTERS:
      return {
        ...state,
        transactionFilters: action.payload,
      };
    case UPDATE_CARD_TRANSACTION_FILTERS:
      return {
        ...state,
        cardTransactionFilters: action.payload,
      };

    default:
      return state;
  }
}
