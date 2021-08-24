import { Button } from "@material-ui/core";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import TransactionItem from "./TransactionItem";

export default function TransactionList({ list }) {
  const history = useHistory();
  const { pathname } = useLocation();

  console.log("useLocation", useLocation());

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <>
      <ul>
        {list.map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(`${pathname}/${item.transactionID}`)}
          >
            {item.transactionID}
          </li>
        ))}
      </ul>
    </>
  );
}
