import React from 'react';

const laptopStyle = {
  display:'flex', 
  width: '100%'
}

const laptopNameStyle = {
  flex:'.5', 
  textAlign:'left'
}

const laptopCodeStyle = {
  flex:'1', 
  textAlign:'left'
}


const LaptopItem = ({laptop, isOverdue, onDelete, onSelect, onEdit}) => (
  <li className={isOverdue ? "overdue" : ""}> {/* If laptop is overdue, apply class 'overdue' */}
    <span className="delete" onClick={onDelete}><i className="fa fa-trash"></i></span>
    <span className="edit" onClick={onEdit}><i className="fa fa-edit"></i></span>
    <span onClick={onSelect} style={laptopStyle}>
      <span style={laptopNameStyle}><strong>Laptop: </strong>{laptop.name}</span>
      <span style={laptopCodeStyle}>
        <strong> Lease Date: </strong>
        {laptop.leaseDate ? new Date(laptop.leaseDate).toLocaleDateString('en-US', { timeZone: 'UTC' })
          : 'N/A'
        }
      </span>
    </span>
  </li>
)

export default LaptopItem;