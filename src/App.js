import { Route, Switch } from "react-router-dom";
import "./App.css";
import { TransactionList, CardList, TransactionItem } from "./components";
import Breadcrumb from "./Elements/Breadcrumb";
import LinkList from "./Elements/LinkList";
import CardItem from "./components/CardItem";
import { cardListMock, transactionListMock } from "./Data";
import { Box } from "@material-ui/core";

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
    <Box padding={4}>
      <LinkList links={links} />

      <Breadcrumb />

      <Switch>
        <Route
          path="/transactions/:transactionId"
          component={TransactionItem}
        />
        <Route
          path="/transactions"
          component={() => (
            <TransactionList transactionList={transactionListMock} />
          )}
        />
        <Route
          path="/cards"
          component={() => <CardList list={cardListMock} />}
        />
      </Switch>
    </Box>
  );
}

export default App;
