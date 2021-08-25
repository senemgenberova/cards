import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";

const Pagination = ({ list, currentPage, perPage, setCurrentPage }) => {
  let pageSize = Math.ceil(list.length / perPage);

  const pages = [];
  for (let i = 1; i <= pageSize; i++) {
    pages.push(i);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ButtonGroup>
        {pages &&
          Array.isArray(pages) &&
          pages.map((page) => (
            <Button
              key={page}
              disabled={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
      </ButtonGroup>
    </>
  );
};

export default Pagination;
