import React from 'react';

const CheckoutHistoryItem = ({checkout, onDelete}) => (
  <li>
    <span>
      Name: {checkout.userName}
      Approved By: {checkout.mgrName}
      Checked Out: {new Date(checkout.checkoutDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
      Due Date: {new Date(checkout.dueDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
      Returned: {new Date(checkout.returnDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
    </span>
    <span onClick={onDelete}> X </span>
  </li>
)

export default CheckoutHistoryItem;