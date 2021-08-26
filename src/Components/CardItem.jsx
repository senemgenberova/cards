import { useEffect, useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { cardListMock } from "../Data";

export default function CardItem() {
  const {
    url,
    params: { cardId, transactionId },
  } = useRouteMatch();
  const [cardItem, setCardItem] = useState({});

  useEffect(() => {
    const item = cardListMock.find((item) => item.cardID === parseInt(cardId));

    setCardItem(item);
  }, [cardId]);

  return (
    <ul>
      <li> cardID: {cardItem.cardID}</li>
      <li> cardAccount: {cardItem.cardAccount}</li>
      <li> maskedCardNumber: {cardItem.maskedCardNumber}</li>
      <li> expireDate: {cardItem.expireDate}</li>
      <li> currency: {cardItem.currency}</li>
      <li> status: {cardItem.status}</li>
      <li> balance: {cardItem.balance}</li>
      {!transactionId && (
        <li>
          <Link to={`${url}/transactions`}>Card Transactions</Link>
        </li>
      )}
    </ul>
  );
}
