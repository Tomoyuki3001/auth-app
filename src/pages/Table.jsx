import React from "react";

export const Table = ({ item, deleteNumber }) => {
  return (
    <tr>
      <td>{item.date}</td>
      <td>{item.status}</td>
      <td>{item.number}</td>
      <td>
        <button onClick={() => deleteNumber(item.id)}>Remove</button>
      </td>
    </tr>
  );
};
