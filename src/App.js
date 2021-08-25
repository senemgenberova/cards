import { Route, Switch } from "react-router-dom";
import "./App.css";
import { TransactionList, CardList, TransactionItem } from "./components";
import Breadcrumb from "./components/Breadcrumb";
import LinkList from "./components/LinkList";
import CardItem from "./components/CardItem";
import { cardListMock, transactionListMock } from "./Data";

function App() {
  const links = [
    {
      to: "/transactions",
      title: "Transactions",
    },
    {
      to: "/cards",
      title: "Cards",
    },
  ];

  return (
    <>
      <LinkList links={links} />

      <Breadcrumb />

      <Switch>
        <Route
          path="/transactions/:transactionId"
          component={TransactionItem}
        />
        <Route
          path="/transactions"
          component={() => <TransactionList list={transactionListMock} />}
        />
        <Route
          path="/cards"
          component={() => <CardList list={cardListMock} />}
        />
      </Switch>
    </>
  );
}

export default App;
