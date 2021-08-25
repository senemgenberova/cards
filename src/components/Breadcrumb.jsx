import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@material-ui/core";

const Breadcrumb = () => {
  const { pathname } = useLocation();

  const pathNameArray = pathname.split("/");
  console.log(pathname, pathNameArray);
  const links = pathNameArray.reduce(
    (previousValue, currentValue, index, arr) => {
      const pathArray = arr.slice(0, index + 1);
      previousValue.push(
        currentValue !== ""
          ? {
              title: currentValue === "" ? "Home" : currentValue,
              to: pathArray.join("/"),
            }
          : {
              title: "Home",
              to: "/",
            }
      );

      return previousValue;
    },
    []
  );

  return (
    <Breadcrumbs>
      {links.map(({ to, title }, index) =>
        index === links.length - 1 ? (
          <Typography key={index}>{title}</Typography>
        ) : (
          <Link key={index} to={to}>
            {title}
          </Link>
        )
      )}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
