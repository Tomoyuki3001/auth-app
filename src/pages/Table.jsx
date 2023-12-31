import React from "react";

export const Table = ({ item, deleteNumber }) => {
  let nowDate = new Date(item.date);

  return (
    <tr>
      <td>{nowDate.toDateString().substring(4)}</td>
      <td>{item.status}</td>
      <td>{item.amount}</td>
      <td className="td-button">
        <button
          className="td-button-remove"
          onClick={() => deleteNumber(item.id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};
