export const cardListMock = [
  {
    cardID: "1",
    cardAccount: "1",
    maskedCardNumber: "1111 2222 3333 4444",
    expireDate: "10/22",
    currency: "AZN",
    status: "active",
    balance: "100",
  },
  {
    cardID: "2",
    cardAccount: "1",
    maskedCardNumber: "3333 4444 1111 2222",
    expireDate: "01/24",
    currency: "EUR",
    status: "active",
    balance: "70",
  },
  {
    cardID: "3",
    cardAccount: "1",
    maskedCardNumber: "1111 4444 2222 3333",
    expireDate: "12/21",
    currency: "USD",
    status: "blocked",
    balance: "150",
  },
];

export const transactionListMock = [
  {
    transactionID: "1",
    cardAccount: "1",
    cardID: "1",
    amount: "10",
    currency: "AZN",
    transactionDate: "10-02-2021",
    merchantInfo: "name 1",
  },
];

export const currencyListMock = ["AZN", "USD", "EUR"];

export const STATUS_ACTIVE = "active";
export const STATUS_BLOCKED = "blocked";
