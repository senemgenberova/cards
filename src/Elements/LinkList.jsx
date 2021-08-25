import { Link } from "react-router-dom";
import React from "react";

export default function LinkList({ links, ...restProps }) {
  return (
    <>
      {links.map(({ title, ...restButton }, index) => (
        <Link key={index} style={{ marginRight: 8 }} {...restButton}>
          {title}
        </Link>
      ))}
    </>
  );
}
