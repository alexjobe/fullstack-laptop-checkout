import React, {Component} from 'react';
import CheckoutHistoryItem from './CheckoutHistoryItem';
import * as apiCalls from '../api';

class CheckoutHistory extends Component {

  constructor(props){
    super(props);
    this.deleteCheckout = this.deleteCheckout.bind(this);
  }

  async deleteCheckout(checkoutId){
    await apiCalls.removeCheckoutFromHistory(this.props.laptop._id, checkoutId)
    await apiCalls.removeCheckout(checkoutId);
    const checkouts = this.props.laptop.checkoutHistory.filter(checkout => checkout._id !== checkoutId);
    this.props.updateCheckoutHistory(checkouts);
  }
  
  renderCheckoutList(checkoutHistory) {
    if(this.props.laptop.currentCheckout) {
      checkoutHistory = checkoutHistory.filter(checkout => checkout._id !== this.props.laptop.currentCheckout._id);
    }

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
    if(this.props.laptop.checkoutHistory && this.props.laptop.checkoutHistory.length > 0){
      if(!this.props.laptop.currentCheckout) {
        return (
          this.renderCheckoutList(this.props.laptop.checkoutHistory)
        )
      }
      if(this.props.laptop.currentCheckout && this.props.laptop.checkoutHistory.length > 1) {
        return (
          this.renderCheckoutList(this.props.laptop.checkoutHistory)
        )
      }
    }
    return (
      <div></div>
    )
  }
}
  
export default CheckoutHistory;
  