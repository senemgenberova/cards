import { Box, Button } from "@material-ui/core";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import { TransactionList, CardList, TransactionItem } from "./components";
import CardItem from "./components/CardItem";
import { cardListMock, transactionListMock } from "./Data";

function App() {
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <>
      <Box>
        <Button
          variant="contained"
          onClick={() => handleClick("/transactions")}
        >
          Transactions
        </Button>
        <Button variant="contained" onClick={() => handleClick("/cards")}>
          Cards
        </Button>
      </Box>

      <Switch>
        <Route
          path="/transactions/:transactionId/:cardID"
          component={CardItem}
        />
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
