import React, {Component} from 'react';
import CheckoutHistoryItem from './CheckoutHistoryItem';
import * as apiCalls from '../api';
import '../css/CheckoutHistory.css';

class CheckoutHistory extends Component {

  state = {
    historyLength: 5
  };

  handleChange = (e) => {
    // [e.target.name] is a computed property name
    let newState = {[e.target.name]: e.target.value };
    this.setState(st => {
      return newState;
    });
  }

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

    // If historyLength is specified, only display that many history items
    if(this.state.historyLength > 0) {
      checkoutHistory = checkoutHistory.slice(0, this.state.historyLength);
    }

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
        <h3 id="checkoutHistoryTitle">
          Checkout History
          {this.state.historyLength > 0 ? 
            ' (Last ' + this.state.historyLength + ' Checkouts)'
            : ' (All Checkouts)'
          }
        </h3>

          <select id='historySelect' name='historyLength' onChange = {this.handleChange}>
            <option value={5}>5 Checkouts</option>
            <option value={10}>10 Checkouts</option>
            <option value={20}>20 Checkouts</option>
            <option value={0}>All Checkouts</option>
          </select>

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
  