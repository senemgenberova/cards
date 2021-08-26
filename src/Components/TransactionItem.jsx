import { useEffect, useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { transactionListMock } from "../Data";

export default function TransactionItem() {
  const {
    url,
    params: { cardId, transactionId },
  } = useRouteMatch();
  const [transactionItem, setTransactionItem] = useState({});

  useEffect(() => {
    const item = transactionListMock.find(
      (item) => item.transactionID === parseInt(transactionId)
    );

    setTransactionItem(item);
  }, [transactionId]);

  return (
    <>
      <ul>
        <li>transactionID: {transactionItem.transactionID}</li>
        <li>cardAccount: {transactionItem.cardAccount}</li>
        <li>
          cardID:
          {cardId ? (
            transactionItem.cardID
          ) : (
            <Link to={`${url}/${transactionItem.cardID}`}>
              {transactionItem.cardID}
            </Link>
          )}
        </li>
        <li>amount: {transactionItem.amount}</li>
        <li>currency: {transactionItem.currency}</li>
        <li>transactionDate: {transactionItem.transactionDate}</li>
        <li>merchantInfo: {transactionItem.merchantInfo}</li>
      </ul>
    </>
  );
}
