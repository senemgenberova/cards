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

const CardList = ({ list }) => {
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
                <TableCell>currency</TableCell>
                <TableCell>status</TableCell>
                <TableCell>detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(list) &&
                list.map(({ cardID, ...restItem }, index) => (
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
      )}
    </>
  );
};

export default CardList;
