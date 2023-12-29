import React from "react";

export const Table = ({ item, deleteNumber, date }) => {
  return (
    <tr>
      <td>{item.date}</td>
      <td>{item.number}</td>
      <td>
        <button onClick={() => deleteNumber(item.id)}>Remove</button>
      </td>
    </tr>
  );
};
