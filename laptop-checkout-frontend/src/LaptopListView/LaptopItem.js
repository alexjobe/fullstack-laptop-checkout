import React from 'react';

const LaptopItem = ({laptop, isOverdue, onDelete, onSelect}) => (
  <li className={isOverdue ? "overdue" : ""}>
    <span style={{display:'flex', width:'100%'}} onClick={onSelect}>
      <span style={{flex:'1', textAlign:'left'}}><strong>Laptop: </strong>{laptop.name}</span>
      <span style={{flex:'1', textAlign:'left'}}><strong> Serial Code: </strong>{laptop.serialCode}</span>
    </span>
    <span className="delete" onClick={onDelete}> X </span>
  </li>
)

export default LaptopItem;