import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const TransactionList = ({ list }) => {
  const { url } = useRouteMatch();

  return (
    <>
      {list.length === 0 ? (
        "No data found"
      ) : (
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
              {Array.isArray(list) &&
                list.map(({ transactionID, ...restItem }, index) => (
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
      )}
    </>
  );
};

export default TransactionList;
