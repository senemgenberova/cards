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
import {
  cardListMock,
  currencyListMock,
  STATUS_ACTIVE,
  STATUS_BLOCKED,
} from "../Data";
import CheckBox from "../Elements/CheckBox";
import _ from "lodash";
import Pagination from "../Elements/Pagination";
import { connect } from "react-redux";
import { updateCardFilters } from "../Redux/actions";

const PER_PAGE = 10;

const CardList = ({ cardFilters, updateCardFilters }) => {
  const { url } = useRouteMatch();

  const [list, setList] = useState([]);
  const [filter, setFilter] = useState(
    cardFilters ?? {
      cardID: "",
      cardAccount: "",
      currencies: [],
      statuses: [],
    }
  );
  const [currentPage, setCurrentPage] = useState(1);

  const { cardID, cardAccount, currencies, statuses } = filter;

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
      value: currencies,
      filterFunc: (item) => currencies.includes(item.currency),
    },
    {
      value: statuses,
      filterFunc: (item) => statuses.includes(item.status),
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
      const filteredList = cardListMock.filter((c) => {
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
    updateCardFilters(filter);
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

          <Grid item md={3}>
            <FormGroup row>
              {currencyListMock.map((curr) => (
                <CheckBox
                  key={curr}
                  onClick={operations.handleCheckBoxChange("currencies")}
                  value={curr}
                  label={curr}
                  checked={
                    currencies &&
                    currencies.length > 0 &&
                    currencies.includes(curr)
                  }
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item md={3}>
            <FormGroup row>
              {[STATUS_ACTIVE, STATUS_BLOCKED].map((curr) => (
                <CheckBox
                  key={curr}
                  onClick={operations.handleCheckBoxChange("statuses")}
                  value={curr}
                  label={curr}
                  checked={
                    statuses && statuses.length > 0 && statuses.includes(curr)
                  }
                />
              ))}
            </FormGroup>
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
                <TableCell>currency</TableCell>
                <TableCell>status</TableCell>
                <TableCell>detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentList.map(({ cardID, ...restItem }, index) => (
                <TableRow key={cardID}>
                  <TableCell>{cardID}</TableCell>
                  <TableCell>{restItem.cardAccount}</TableCell>
                  <TableCell>{restItem.currency}</TableCell>
                  <TableCell>{restItem.status}</TableCell>
                  <TableCell>
                    <Link to={`${url}/${cardID}`}>View</Link>
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
  cardFilters: filterReducer.cardFilters,
});

const mapDispatchToProps = (dispatch) => ({
  updateCardFilters: (value) => dispatch(updateCardFilters(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
