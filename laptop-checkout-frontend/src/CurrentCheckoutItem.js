import React from 'react';

const CurrentCheckoutItem = ({checkout, onReturn}) => (

  <div>
    <h3>Checked out to:</h3>
    <p>
      Name: {checkout.userName} <br />
      Approved By: {checkout.mgrName} <br />
      Checked Out: {new Date(checkout.checkoutDate).toLocaleDateString('en-US', { timeZone: 'UTC' })} <br />
      Due Date: {new Date(checkout.dueDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
    </p>
    <button onClick={onReturn}>Return Laptop</button>
  </div>

)

export default CurrentCheckoutItem;