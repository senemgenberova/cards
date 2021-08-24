import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { transactionListMock } from "../Data";

export default function TransactionItem() {
  const { transactionId } = useParams();
  const history = useHistory();
  console.log("history", history);

  const transactionItem = transactionListMock.find(
    (item) => item.transactionID === transactionId
  );

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <div>
      transactionId: {transactionId} - cardAccount:{" "}
      <button
        onClick={() =>
          handleClick(`${history.location.pathname}/${transactionItem.cardID}`)
        }
      >
        {transactionItem.cardAccount}
      </button>
    </div>
  );
}
