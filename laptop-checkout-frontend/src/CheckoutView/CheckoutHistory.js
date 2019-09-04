import React, {Component} from 'react';
import CheckoutHistoryItem from './CheckoutHistoryItem';
import * as apiCalls from '../api';

class CheckoutHistory extends Component {

  deleteCheckout = async(checkoutId) => {
    // Remove checkout from selected laptop's history
    await apiCalls.removeCheckoutFromHistory(this.props.laptop._id, checkoutId)
    // Delete checkout
    await apiCalls.removeCheckout(checkoutId);
    // Update state in CheckoutView
    this.props.updateCheckoutHistory();
  }
  
  renderCheckoutList(checkoutHistory) {
    // If there is a currentCheckout, do not include it in checkoutHistory
    if(this.props.laptop.currentCheckout) {
      checkoutHistory = checkoutHistory.filter(checkout => checkout._id !== this.props.laptop.currentCheckout._id);
    }
    
    // Show most recent checkouts first
    checkoutHistory.sort(function(a, b) {
      return new Date(b.returnDate) - new Date(a.returnDate);
    });

    // For each checkout in checkoutHistory, render a CheckoutHistoryItem
    const checkoutList = checkoutHistory.map((checkout) => (
      <CheckoutHistoryItem
        key={checkout._id}
        checkout={checkout}
        onDelete={this.deleteCheckout.bind(this, checkout._id)}
        onEdit={this.props.enableEditMode.bind(this, checkout)}
      />
    ));
    return (
      <div>
        <h3 id="checkoutHistoryTitle">Checkout History</h3>
        <ul id="checkoutList">
          {checkoutList}
        </ul>
      </div>
    )
  }
  
  render(){
    return this.renderCheckoutList(this.props.laptop.checkoutHistory);
  }
}
  
export default CheckoutHistory;
  