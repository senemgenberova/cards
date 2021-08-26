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
import { formatDate } from "../Utils";
import Pagination from "../Elements/Pagination";
import { connect } from "react-redux";
import {
  updateTransactionFilters,
  updateCardTransactionFilters,
} from "../Redux/actions";

const PER_PAGE = 10;

const TransactionList = ({
  transactionFilters,
  updateTransactionFilters,
  cardTransactionFilters,
  updateCardTransactionFilters,
}) => {
  const {
    url,
    params: { cardId },
  } = useRouteMatch();

  const [list, setList] = useState([]);

  const [filter, setFilter] = useState({
    cardID: cardId ?? "",
    cardAccount: "",
    minAmount: "",
    maxAmount: "",
    currencies: "",
    date: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const { cardID, cardAccount, minAmount, maxAmount, currencies, date } =
    filter;

  const filterProps = [
    {
      value: cardID,
      attr: "cardID",
    },
    {
      value: cardAccount,
      attr: "cardAccount",
    },
    {
      value: minAmount,
      filterFunc: (item) => item.amount > minAmount,
    },
    {
      value: maxAmount,
      filterFunc: (item) => item.amount < maxAmount,
    },
    {
      value: currencies,
      filterFunc: (item) => currencies.includes(item.currency),
    },
    {
      value: formatDate(date),
      attr: "transactionDate",
    },
  ];

  const appliedFilters = filterProps.filter(({ value }) => !_.isEmpty(value));

  const operations = {
    handleChange: (name) => (e) => {
      setFilter((prevState) => ({
        ...prevState,
        [name]: e.target.value,
      }));
    },
    handleCheckBoxChange: (name) => (e) => {
      let {
        target: { checked, value },
      } = e;

      setFilter((prevState) => ({
        ...prevState,
        [name]: checked
          ? [...prevState[name], value]
          : prevState[name].filter((c) => c !== value),
      }));
    },
    filterList: () => {
      const filteredList = transactionListMock.filter((c) => {
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
    const filters = cardId ? cardTransactionFilters : transactionFilters;

    setFilter(filters ?? filter);
  }, [cardId]);

  useEffect(() => {
    if (cardId) {
      updateCardTransactionFilters(filter);
    } else {
      updateTransactionFilters(filter);
    }

    const filteredList = operations.filterList();

    setList(filteredList);
  }, [filter]);

  const currentList = list.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  return (
    <>
      <Box component={Paper} elevation={3} padding={2}>
        <Grid container spacing={5}>
          {!cardId && (
            <Grid item md={2}>
              <TextField
                value={cardID}
                label="cardID"
                fullWidth
                onChange={operations.handleChange("cardID")}
              />
            </Grid>
          )}

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
                  onClick={operations.handleCheckBoxChange("currencies")}
                  value={curr}
                  label={curr}
                  checked={currencies.length > 0 && currencies.includes(curr)}
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
                    <Link to={`${url}/${transactionID}`}>View</Link>
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

const mapStateToProps = ({ filterReducer }) => ({
  transactionFilters: filterReducer.transactionFilters,
  cardTransactionFilters: filterReducer.cardTransactionFilters,
});

const mapDispatchToProps = (dispatch) => ({
  updateTransactionFilters: (value) =>
    dispatch(updateTransactionFilters(value)),
  updateCardTransactionFilters: (value) =>
    dispatch(updateCardTransactionFilters(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
