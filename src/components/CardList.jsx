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

const PER_PAGE = 10;

const CardList = () => {
  const match = useRouteMatch();

  const [list, setList] = useState([]);

  const [search, setSearch] = useState({
    cardID: "",
    cardAccount: "",
    currencies: [],
    statuses: [],
  });

  const [currentPage, setCurrentPage] = useState(1);

  const { cardID, cardAccount, currencies, statuses } = search;

  const filterProps = [
    {
      label: "cardID",
      type: "text",
      value: cardID,
      attr: "cardID",
    },
    {
      label: "cardAccount",
      type: "text",
      value: cardAccount,
      attr: "cardAccount",
    },
    {
      value: currencies,
      type: "checkbox",
      data: currencyListMock,
      filterFunc: (item) => currencies.includes(item.currency),
    },
    {
      value: statuses,
      type: "checkbox",
      data: currencyListMock,
      filterFunc: (item) => statuses.includes(item.status),
    },
  ];

  const appliedFilters = filterProps.filter(({ value }) => !_.isEmpty(value));

  const operations = {
    handleChange: (name) => (e) => {
      setSearch((prevState) => ({
        ...prevState,
        [name]: e.target.value,
      }));
    },
    handleCheckBoxChange: (name) => (e) => {
      let {
        target: { checked, value },
      } = e;

      setSearch((prevState) => ({
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

          <Grid item md={3}>
            <FormGroup row>
              {currencyListMock.map((curr) => (
                <CheckBox
                  key={curr}
                  onClick={operations.handleCheckBoxChange("currencies")}
                  value={curr}
                  label={curr}
                  checked={currencies.includes(curr)}
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
                  checked={statuses.includes(curr)}
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
                    <Link to={`${match.url}/${cardID}`}>View</Link>
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

export default CardList;
