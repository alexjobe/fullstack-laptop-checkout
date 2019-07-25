import React from 'react';

const CurrentCheckoutItem = ({checkout, onReturn, onEdit}) => (

  <div id="currentCheckout">
    <h3>Checked out to:</h3>
    <div id="currentCheckoutInfo">
      <span className="edit" onClick={onEdit}><i className="fa fa-edit"></i></span>
      <p>
        Name: {checkout.userName} <br />
        Approved By: {checkout.mgrName} <br />
        Checked Out: {new Date(checkout.checkoutDate).toLocaleDateString('en-US', { timeZone: 'UTC' })} <br />
        Due Date: {new Date(checkout.dueDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
      </p>
    </div>
    <button id="returnButton" onClick={onReturn}>Return Laptop</button>
  </div>

)

export default CurrentCheckoutItem;