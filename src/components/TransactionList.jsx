import React from "react";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  TextField,
} from "@material-ui/core";

export default function TransactionList({ list }) {
  const match = useRouteMatch();

  return (
    <>
      <Grid container spacing={5}>
        <Grid item md={3}>
          <TextField label="cardID" fullWidth />
        </Grid>

        <Grid item md={3}>
          <TextField label="cardAccount" fullWidth />
        </Grid>

        <Grid item container md={4} justifyContent="space-between">
          <TextField label="Min amount" />
          <TextField label="Max amount" />
        </Grid>
      </Grid>

      <TableContainer>
        <Table style={{ maxWidth: 650 }}>
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
    </>
  );
}
