import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import {
  TransactionList,
  CardList,
  TransactionItem,
  CardItem,
} from "./Components";
import Breadcrumb from "./Elements/Breadcrumb";
import LinkList from "./Elements/LinkList";
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
          path="/transactions/:transactionId/:cardId"
          component={CardItem}
        />

        <Route
          path="/transactions/:transactionId"
          component={TransactionItem}
        />

        <Route path="/transactions" component={TransactionList} />

        <Route
          path="/cards/:cardId/transactions/:transactionId"
          component={TransactionItem}
        />

        <Route path="/cards/:cardId/transactions" component={TransactionList} />

        <Route path="/cards/:cardId" component={CardItem} />

        <Route path="/cards" component={CardList} />

        <Redirect exact from="/" to="/transactions" />
      </Switch>
    </Box>
  );
}

export default App;
