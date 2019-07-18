import React, {Component} from 'react';
import CheckoutHistoryItem from './CheckoutHistoryItem';
import * as apiCalls from './api';

class CheckoutHistory extends Component {

    async deleteCheckout(id){
      await apiCalls.removeCheckoutFromHistory(this.props.laptop._id, id)
      await apiCalls.removeCheckout(id);
      const checkouts = this.props.laptop.checkoutHistory.filter(checkout => checkout._id !== id);
      this.props.updateCheckouts(checkouts);
    }
  
    renderCheckoutList() {
      const checkouts = this.props.laptop.checkoutHistory.map((checkout) => (
        <CheckoutHistoryItem
          key={checkout._id}
          checkout={checkout}
          onDelete={this.deleteCheckout.bind(this, checkout._id)}
        />
      ));
      return (
        <div>
          <h1>Checkout History</h1>
          <ul>
            {checkouts}
          </ul>
        </div>
      )
    }
  
    render(){
      return this.renderCheckoutList();
    }
  }
  
  export default CheckoutHistory;
  