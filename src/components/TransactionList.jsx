import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  TextField,
  FormGroup,
  Paper,
  Box,
} from "@material-ui/core";
import { currencyListMock, transactionListMock } from "../Data";
import CheckBox from "../Elements/CheckBox";
import _ from "lodash";

const TransactionList = ({ transactionList }) => {
  const match = useRouteMatch();

  const [list, setList] = useState([]);
  const [search, setSearch] = useState({
    cardID: "",
    cardAccount: "",
    minAmount: "",
    maxAmount: "",
    currency: [],
    date: "",
  });

  const { cardID, cardAccount, minAmount, maxAmount, currency, date } = search;

  const filterProps = [
    {
      filter: cardID,
      attr: "cardID",
    },
    {
      filter: cardAccount,
      attr: "cardAccount",
    },
    {
      filter: minAmount,
      filterFunc: (item) => item.amount > minAmount,
    },
    {
      filter: maxAmount,
      filterFunc: (item) => item.amount < maxAmount,
    },
    {
      filter: currency,
      filterFunc: (item) => currency.includes(item.currency),
    },
  ];

  const appliedFilters = filterProps.filter(({ filter }) => !_.isEmpty(filter));

  const operations = {
    handleChange: (name) => (e) => {
      setSearch((prevState) => ({
        ...prevState,
        [name]: e.target.value,
      }));
    },
    handleCurrencyChange: (e) => {
      let {
        target: { checked, value },
      } = e;
      setSearch((prevState) => ({
        ...prevState,
        currency: checked
          ? [...prevState.currency, value]
          : prevState.currency.filter((c) => c !== value),
      }));
    },
    filterList: () => {
      const filteredList = transactionList.filter((c) => {
        for (const { attr, filter, filterFunc, ...rest } of appliedFilters) {
          if (attr !== "undefined" && c.hasOwnProperty(attr)) {
            const value = c[attr].toString();
            console.log("attr", value, value.indexOf(filter));

            if (value.indexOf(filter) === -1) return false;
          }

          if (filterFunc !== "undefined" && typeof filterFunc === "function") {
            const isFiltered = filterFunc(c);
            console.log("isFiltered", isFiltered);
            if (!isFiltered) return false;
          }
        }

        return true;
      });

      return filteredList;
    },
  };

  useEffect(() => {
    // const appliedFilters = {};
    // for (let key in search) {
    //   if (!_.isEmpty(search[key])) appliedFilters[key] = search[key];
    // }

    const filteredList = operations.filterList();
    console.log("filteredList", filteredList);

    setList(filteredList);
  }, [search]);

  return (
    <>
      <Box component={Paper} elevation={3} padding={2}>
        <Grid container spacing={5}>
          <Grid item md={2}>
            <TextField
              value={cardID}
              label="cardID"
              fullWidth
              onChange={operations.handleChange("cardID")}
            />
          </Grid>

          <Grid item md={2}>
            <TextField
              value={cardAccount}
              label="cardAccount"
              fullWidth
              onChange={operations.handleChange("cardAccount")}
            />
          </Grid>

          <Grid item container md={3} justifyContent="space-between">
            <TextField
              value={minAmount}
              label="Min amount"
              type="number"
              fullWidth
              onChange={operations.handleChange("minAmount")}
            />
            <TextField
              value={maxAmount}
              label="Max amount"
              type="number"
              fullWidth
              onChange={operations.handleChange("maxAmount")}
            />
          </Grid>

          <Grid item md={3}>
            <FormGroup row>
              {currencyListMock.map((curr) => (
                <CheckBox
                  key={curr}
                  onClick={operations.handleCurrencyChange}
                  value={curr}
                  label={curr}
                  checked={currency.includes(curr)}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item md={2}>
            <TextField
              value={date}
              label="date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              onChange={operations.handleChange("date")}
            />
          </Grid>
        </Grid>
      </Box>

      <Box marginTop={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell key="cardID">cardID</TableCell>
                <TableCell key="cardAccount">cardAccount</TableCell>
                <TableCell key="amount">amount</TableCell>
                <TableCell key="currency">currency</TableCell>
                <TableCell key="date">date</TableCell>
                <TableCell key="detail">detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map(({ transactionID, ...restItem }) => (
                <TableRow key={transactionID}>
                  <TableCell>{restItem.cardID}</TableCell>
                  <TableCell>{restItem.cardAccount}</TableCell>
                  <TableCell>{restItem.amount}</TableCell>
                  <TableCell>{restItem.transactionDate}</TableCell>
                  <TableCell>{restItem.currency}</TableCell>
                  <TableCell>
                    <Link to={`${match.url}/${transactionID}`}>View</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TransactionList;

// const filteredList = transactionList.filter((c) => {
//   let inArray = true;
//   if (!_.isEmpty(cardID) && c.cardID != cardID) {
//     inArray = false;
//   }

//   if (!_.isEmpty(cardAccount) && c.cardAccount != cardAccount) {
//     inArray = false;
//   }

//   if (!_.isEmpty(minAmount) && c.amount < minAmount) {
//     inArray = false;
//   }

//   if (!_.isEmpty(maxAmount) && c.amount > maxAmount) {
//     inArray = false;
//   }

//   if (!_.isEmpty(currency) && !currency.includes(c.currency)) {
//     inArray = false;
//   }
//   console.log("inArray", c, inArray);

//   return inArray;
// });
