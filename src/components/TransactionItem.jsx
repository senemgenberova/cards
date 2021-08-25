import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { transactionListMock } from "../Data";

export default function TransactionItem() {
  const { transactionId } = useParams();
  const [transactionItem, setTransactionItem] = useState({});

  useEffect(() => {
    const item = transactionListMock.find(
      (item) => item.transactionID === parseInt(transactionId)
    );

    setTransactionItem(item);
  }, [transactionId]);

  return (
    <ul>
      <li>transactionID: {transactionItem.transactionID}</li>
      <li>cardAccount: {transactionItem.cardAccount}</li>
      <li>cardID: {transactionItem.cardID}</li>
      <li>amount: {transactionItem.amount}</li>
      <li>currency: {transactionItem.currency}</li>
      <li>transactionDate: {transactionItem.transactionDate}</li>
      <li>merchantInfo: {transactionItem.merchantInfo}</li>
    </ul>
  );
}
