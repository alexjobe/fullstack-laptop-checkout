import React, {Component} from 'react';
import * as apiCalls from './api';
import CheckoutForm from './CheckoutForm';
import CurrentCheckoutItem from './CurrentCheckoutItem';
import CheckoutHistory from './CheckoutHistory';

class CheckoutView extends Component {
  constructor(props){
    super(props);
    this.state = {
      laptop: this.props.laptop,
      checkout: this.props.laptop.currentCheckout
    }
    this.updateCheckoutHistory = this.updateCheckoutHistory.bind(this);
  }

  async addCheckout(val){
    let newCheckout = await apiCalls.createCheckout({...val, laptop: this.props.laptop._id});
    let updatedLaptop = await apiCalls.updateLaptop({...this.state.laptop, currentCheckout: newCheckout});
    this.setState({checkout: newCheckout, laptop: updatedLaptop});
  }

  async returnLaptop(val){
    let updatedLaptop = await apiCalls.updateLaptop({...this.state.laptop, currentCheckout: null});
    await apiCalls.updateCheckout({...this.state.checkout, returnDate: Date.now()});
    this.setState({checkout: null, laptop: updatedLaptop});
  }

  async updateCheckoutHistory(checkouts){
    this.setState({laptop: {...this.state.laptop, checkoutHistory: checkouts}});
  }

  renderCheckoutForm() {
    return (
      <div>
        <h1>{this.state.laptop.name}</h1>
        <CheckoutForm
          addCheckout={this.addCheckout.bind(this)}
        />
        <CheckoutHistory laptop={this.state.laptop} />
      </div>
    )
  }

  renderCurrentCheckout() {
    return (
      <div>
        <CurrentCheckoutItem
          checkout={this.state.checkout}
          onReturn={this.returnLaptop.bind(this)}
        />
        <CheckoutHistory laptop={this.state.laptop} updateCheckouts={this.updateCheckoutHistory.bind(this)} />
      </div>
    )
  }

  render(){
    if(this.state.checkout) {
      return this.renderCurrentCheckout();
    }
    return this.renderCheckoutForm();
    
  }
}

export default CheckoutView;
