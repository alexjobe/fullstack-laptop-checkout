import React from 'react';

const LaptopItem = ({laptop, isOverdue, onDelete, onSelect}) => (
  <li className={isOverdue ? "overdue" : ""}>
    <span onClick={onSelect}>
      <strong>Laptop: </strong>{laptop.name} 
      <strong> Serial Code: </strong>{laptop.serialCode}
    </span>
    <span className="delete" onClick={onDelete}> X </span>
  </li>
)

export default LaptopItem;