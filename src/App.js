import { Redirect, Route, Switch } from "react-router-dom";
import { Box } from "@material-ui/core";
import {
  TransactionList,
  CardList,
  TransactionItem,
  CardItem,
} from "./Components";
import { Breadcrumb, LinkList } from "./Elements";

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
