import React from 'react';

const laptopStyle = {
  display:'flex', 
  width: '100%'
}

const laptopNameStyle = {
  flex:'1', 
  textAlign:'left'
}

const laptopDateStyle = {
  flex:'1', 
  textAlign:'left'
}

const laptopCheckoutStyle = {
  flex:'.5',
  textAlign:'left'
}


const LaptopListItem = ({laptop, isOverdue, onDelete, onSelect, onEdit}) => (
  <li className={isOverdue ? "overdue" : ""}> {/* If laptop is overdue, apply class 'overdue' */}
    <span className="delete" onClick={onDelete}><i className="fa fa-trash"></i></span>
    <span className="edit" onClick={onEdit}><i className="fa fa-edit"></i></span>
    <span onClick={onSelect} style={laptopStyle}>
      <span style={laptopNameStyle}><strong>Laptop: </strong>{laptop.name}</span>
      <span style={laptopDateStyle}>
        <strong> Lease Date: </strong>
        {laptop.leaseDate ? new Date(laptop.leaseDate).toLocaleDateString('en-US', { timeZone: 'UTC' })
          : 'N/A'
        }
      </span>
      <span style={laptopCheckoutStyle}>
        {laptop.currentCheckout ? 'Checked Out'
          : ''
        }
      </span>
    </span>
  </li>
)

export default LaptopListItem;