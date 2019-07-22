import React, {Component} from 'react';
import * as apiCalls from '../api';
import CheckoutForm from './CheckoutForm';
import CurrentCheckoutItem from './CurrentCheckoutItem';
import CheckoutHistory from './CheckoutHistory';
import BackButton from './BackButton';

class CheckoutView extends Component {
  constructor(props){
    super(props);
    this.state = {
      laptop: {}
    }
    this.updateCheckoutHistory = this.updateCheckoutHistory.bind(this);
  }

  componentWillMount() {
    this.loadLaptop();
  }

  async loadLaptop() {
    let laptop = await apiCalls.getLaptop(this.props.laptopId);
    this.setState({laptop});
  }

  async addCheckout(val){
    let newCheckout = await apiCalls.createCheckout({...val, laptop: this.state.laptop._id});
    let updatedLaptop = await apiCalls.updateLaptop({...this.state.laptop, currentCheckout: newCheckout});
    this.setState({laptop: updatedLaptop});
  }

  async returnLaptop(){
    await apiCalls.updateCheckout({...this.state.laptop.currentCheckout, returnDate: Date.now()});
    let updatedLaptop = await apiCalls.updateLaptop({...this.state.laptop, currentCheckout: null});
    this.setState({laptop: updatedLaptop});
  }

  async updateCheckoutHistory(checkouts){
    this.setState({laptop: {...this.state.laptop, checkoutHistory: checkouts}});
  }

  renderCheckoutForm() {
    return (
      <section id="checkoutView">
        <BackButton onClick={this.props.selectLaptop.bind(this, null)}></BackButton>
        <h1>{this.state.laptop.name}</h1>
        <h3 id="available">Available</h3>
        <CheckoutForm
          addCheckout={this.addCheckout.bind(this)}
        />
        <CheckoutHistory laptop={this.state.laptop} updateCheckoutHistory={this.updateCheckoutHistory}/>
      </section>
    )
  }

  renderCurrentCheckout() {
    return (
      <section id="checkoutView">
        <BackButton onClick={this.props.selectLaptop.bind(this, null)}></BackButton>
        <h1>{this.state.laptop.name}</h1>
        <CurrentCheckoutItem
          checkout={this.state.laptop.currentCheckout}
          onReturn={this.returnLaptop.bind(this)}
        />
        <CheckoutHistory laptop={this.state.laptop} updateCheckoutHistory={this.updateCheckoutHistory}/>
      </section>
    )
  }

  render(){
    if(this.state.laptop.currentCheckout) {
      return this.renderCurrentCheckout();
    }
    return this.renderCheckoutForm();
    
  }
}

export default CheckoutView;
