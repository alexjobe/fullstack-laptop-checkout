import React, {Component} from 'react';
import * as apiCalls from '../api';
import CheckoutForm from './CheckoutForm';
import CurrentCheckoutItem from './CurrentCheckoutItem';
import CheckoutHistory from './CheckoutHistory';
import BackButton from './BackButton';
import EditCheckoutForm from './EditCheckoutForm';

class CheckoutView extends Component {
  constructor(props){
    super(props);
    this.state = {
      laptop: {},
      checkoutToUpdate: null
    }
    this.updateCheckoutHistory = this.updateCheckoutHistory.bind(this);
    this.updateCheckout = this.updateCheckout.bind(this);
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
    let updatedLaptop = await apiCalls.updateLaptop({...this.state.laptop, checkoutHistory: checkouts});
    this.setState({laptop: updatedLaptop});
  }

  async enableEditMode(checkout){
    this.setState({checkoutToUpdate: checkout});
  }

  async updateCheckout(val){
    let updatedCheckout = await apiCalls.updateCheckout(val);
    if(updatedCheckout.returnDate){ // If we are editing the current checkout, we do not want to add it to checkoutHistory yet
      const checkouts = this.state.laptop.checkoutHistory.map(checkout => {
        return (checkout._id === updatedCheckout._id ? updatedCheckout : checkout);
      });
      this.updateCheckoutHistory(checkouts); // Update checkoutHistory to reflect updated checkout
    }
    this.setState({checkoutToUpdate: null})
  }

  render(){
    return (
      <section id="checkoutView">
        <BackButton onClick={this.props.selectLaptop.bind(this, null)}></BackButton>
        <h1>{this.state.laptop.name}</h1>
        <h3>#{this.state.laptop.serialCode}</h3>
        { (this.state.checkoutToUpdate ?
            <EditCheckoutForm
              updateCheckout={this.updateCheckout.bind(this)}
              checkout={this.state.checkoutToUpdate}
            /> : ''
          )
        }
        {
          (this.state.laptop.currentCheckout && !this.state.checkoutToUpdate ?
            <CurrentCheckoutItem
              checkout={this.state.laptop.currentCheckout}
              onReturn={this.returnLaptop.bind(this)}
              onEdit={this.enableEditMode.bind(this, this.state.laptop.currentCheckout)}
            /> : ''
          )
        }
        {
          (
            !this.state.laptop.currentCheckout && !this.state.checkoutToUpdate ?
            <CheckoutForm
              addCheckout={this.addCheckout.bind(this)}
            /> : ''
          )
        }
        <CheckoutHistory 
          laptop={this.state.laptop} 
          updateCheckoutHistory={this.updateCheckoutHistory} 
          enableEditMode={this.enableEditMode.bind(this)}
        /> 
      </section>
    )
  }
}

export default CheckoutView;
