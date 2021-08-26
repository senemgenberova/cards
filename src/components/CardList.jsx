import React, { useState } from "react";
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

import { connect } from "react-redux";
import { CheckBox, Pagination } from "../Elements";
import { updateCardFilters } from "../Redux/actions";
import useFilter from "../useFilter";
import {
  cardListMock,
  currencyListMock,
  STATUS_ACTIVE,
  STATUS_BLOCKED,
} from "../Data";

const CardList = ({ cardFilters, updateCardFilters }) => {
  const { url } = useRouteMatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(
    cardFilters ?? {
      cardID: "",
      cardAccount: "",
      currencies: [],
      statuses: [],
    }
  );

  const { cardID, cardAccount, currencies, statuses } = filters;

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

  const { handleChange, handleCheckBoxChange, list } = useFilter(
    cardListMock,
    filterProps,
    filters,
    setFilters,
    updateCardFilters
  );

  const currentList = list.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <>
      <Box component={Paper} elevation={3} padding={2}>
        <Grid container spacing={5}>
          <Grid item md={2}>
            <TextField
              value={cardID}
              label="cardID"
              fullWidth
              onChange={handleChange("cardID")}
            />
          </Grid>

          <Grid item md={2}>
            <TextField
              value={cardAccount}
              label="cardAccount"
              fullWidth
              onChange={handleChange("cardAccount")}
            />
          </Grid>

          <Grid item md={3}>
            <FormGroup row>
              {currencyListMock.map((curr) => (
                <CheckBox
                  key={curr}
                  onClick={handleCheckBoxChange("currencies")}
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
                  onClick={handleCheckBoxChange("statuses")}
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
        perPage={10}
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
