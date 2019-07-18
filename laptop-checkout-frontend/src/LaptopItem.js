import React from 'react';

const LaptopItem = ({laptop, onDelete, onSelect}) => (
  <li>
    <span onClick={onSelect}>
      {laptop.name} {laptop.serialCode}
    </span>
    <span onClick={onDelete}> X </span>
  </li>
)

export default LaptopItem;