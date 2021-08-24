import React from "react";
import { useParams } from "react-router-dom";
import { cardListMock } from "../Data";

export default function CardItem() {
  const { cardID } = useParams();
  const card = cardListMock.find((item) => item.cardID === cardID);

  return <div>{card.maskedCardNumber}</div>;
}
