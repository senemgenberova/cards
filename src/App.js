import { Redirect, Route, Switch } from "react-router-dom";
import { Box } from "@material-ui/core";
import { TransactionItem, CardItem } from "./Components";
import { Breadcrumb, LinkList } from "./Elements";
import TransactionPage from "./Pages/TransactionPage";
import CardPage from "./Pages/CardPage";

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

        <Route path="/transactions" component={TransactionPage} />

        <Route
          path="/cards/:cardId/transactions/:transactionId"
          component={TransactionItem}
        />

        <Route path="/cards/:cardId/transactions" component={TransactionPage} />

        <Route path="/cards/:cardId" component={CardItem} />

        <Route path="/cards" component={CardPage} />

        <Redirect exact from="/" to="/transactions" />
      </Switch>
    </Box>
  );
}

export default App;
