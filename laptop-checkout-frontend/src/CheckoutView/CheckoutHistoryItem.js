import React from 'react';

const checkoutStyle = {
  display:'flex', 
  width: '100%'
}

const nameStyle = {
  flex:'1',
  textAlign:'left',
  padding:'0 40px 0 0',
  width: '100%'
};

const dateStyle = {
  flex:'1',
  textAlign:'left',
  width: '100%'
};

const dueDateStyle = {
  flex:'1',
  textAlign:'left',
  padding:'0 40px',
  width: '100%'
};

const CheckoutHistoryItem = ({checkout, onDelete, onEdit}) => (
  <li>
    <span className="delete" onClick={onDelete}><i className="fa fa-trash"></i></span>
    <span className="edit" onClick={onEdit}><i className="fa fa-edit"></i></span>
    <span style={checkoutStyle}>
      <span style={nameStyle}><strong>Name:</strong> {checkout.userName}</span>
      <span style={nameStyle}><strong>Approved By:</strong> {checkout.mgrName}</span>
      <span style={dateStyle}><strong>Checked Out:</strong> {new Date(checkout.checkoutDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</span>
      <span style={dueDateStyle}><strong>Due:</strong> {new Date(checkout.dueDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</span>
      <span style={dateStyle}><strong>Returned:</strong> {new Date(checkout.returnDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</span>
    </span>
  </li>
)

export default CheckoutHistoryItem;