import React from 'react';

const CheckoutHistoryItem = ({checkout, onDelete}) => (
  <li>
    <span>
      <strong>Name:</strong> {checkout.userName}
      <strong>Approved By:</strong> {checkout.mgrName}
      <strong>Checked Out:</strong> {new Date(checkout.checkoutDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
      <strong>Due:</strong> {new Date(checkout.dueDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
      <strong>Returned:</strong> {new Date(checkout.returnDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
    </span>
    <span className="delete" onClick={onDelete}> X </span>
  </li>
)

export default CheckoutHistoryItem;