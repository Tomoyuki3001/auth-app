import React from "react";

export const Table = ({ email, number }) => {
  return (
    <tr>
      <td>Email:{email}</td>
      <td>Number:{number}</td>
    </tr>
  );
};
