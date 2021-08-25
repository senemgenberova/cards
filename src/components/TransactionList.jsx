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
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { currencyListMock } from "../Data";
import CheckBox from "../Elements/CheckBox";
import _ from "lodash";
import { formatDate } from "../Utils";
import Pagination from "../Elements/Pagination";

const PER_PAGE = 10;

const TransactionList = ({ transactionList }) => {
  const match = useRouteMatch();

  const [list, setList] = useState([]);

  const [search, setSearch] = useState({
    cardID: "",
    cardAccount: "",
    minAmount: "",
    maxAmount: "",
    currencies: [],
    date: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const { cardID, cardAccount, minAmount, maxAmount, currencies, date } =
    search;

  const filterProps = [
    {
      label: "cardID",
      value: cardID,
      attr: "cardID",
    },
    {
      label: "cardAccount",
      value: cardAccount,
      attr: "cardAccount",
    },
    {
      label: "Min amount",
      type: "number",
      value: minAmount,
      filterFunc: (item) => item.amount > minAmount,
    },
    {
      label: "Max amount",
      type: "number",
      value: maxAmount,
      filterFunc: (item) => item.amount < maxAmount,
    },
    {
      value: currencies,
      type: "checkbox",
      filterFunc: (item) => currencies.includes(item.currency),
    },
    {
      label: "date",
      type: "datepicker",
      value: formatDate(date),
      attr: "transactionDate",
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
      setSearch(({ currencies, ...restPrevState }) => ({
        ...restPrevState,
        currencies: checked
          ? [...currencies, value]
          : currencies.filter((c) => c !== value),
      }));
    },
    filterList: () => {
      const filteredList = transactionList.filter((c) => {
        for (const { attr, value, filterFunc } of appliedFilters) {
          if (attr !== "undefined" && c.hasOwnProperty(attr)) {
            const itemValue = c[attr].toString();

            if (itemValue.indexOf(value) === -1) return false;
          }

          if (filterFunc !== "undefined" && typeof filterFunc === "function") {
            const isFiltered = filterFunc(c);
            if (!isFiltered) return false;
          }
        }

        return true;
      });

      return filteredList;
    },
  };

  useEffect(() => {
    const filteredList = operations.filterList();
    console.log("filteredList", filteredList);

    setList(filteredList);
  }, [search, currentPage]);

  const currentList = list.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

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
                  checked={currencies.includes(curr)}
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

      <Box marginY={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>cardID</TableCell>
                <TableCell>cardAccount</TableCell>
                <TableCell>amount</TableCell>
                <TableCell>currency</TableCell>
                <TableCell>date</TableCell>
                <TableCell>detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentList.map(({ transactionID, ...restItem }, index) => (
                <TableRow key={transactionID}>
                  <TableCell>{restItem.cardID}</TableCell>
                  <TableCell>{restItem.cardAccount}</TableCell>
                  <TableCell>{restItem.amount}</TableCell>
                  <TableCell>{restItem.currency}</TableCell>
                  <TableCell>{restItem.transactionDate}</TableCell>
                  <TableCell>
                    <Link to={`${match.url}/${transactionID}`}>View</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Pagination
        list={list}
        currentPage={currentPage}
        perPage={PER_PAGE}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default TransactionList;
