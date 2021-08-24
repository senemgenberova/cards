import React, { useState, useEffect } from "react";

const CardList = ({ cards }) => {
  const [cardList, setCardList] = useState(cards);
  const [search, setSearch] = useState({
    cardID: "",
    cardAccount: "",
  });

  const { cardID, cardAccount } = search;

  const operations = {
    handleChange: (name) => (e) => {
      setSearch((prevState) => ({
        ...prevState,
        [name]: e.target.value,
      }));
    },
  };

  return (
    <div className="card-list">
      <div className="search">
        <input
          type="text"
          value={cardID}
          onChange={operations.handleChange("cardID")}
          placeholder="cardID"
        />

        <input
          type="text"
          value={cardAccount}
          onChange={operations.handleChange("cardAccount")}
          placeholder="cardAccount"
        />
      </div>

      <table className="card-table">
        <thead>
          <th>cardID</th>
          <th>cardAccount</th>
          <th>currency</th>
          <th>status</th>
          <th>detail</th>
        </thead>
        <tbody>
          {cardList.map((card) => (
            <tr key={card.cardID}>
              <td>{card.cardID}</td>
              <td>{card.cardAccount}</td>
              <td>{card.currency}</td>
              <td>{card.status}</td>
              <td>view</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardList;
