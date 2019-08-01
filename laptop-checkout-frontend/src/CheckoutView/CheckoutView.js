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
      laptop: {}, // The selected laptop
      checkoutToUpdate: null // Checkout that is selected for editing (initially null)
    }
    this.updateCheckoutHistory = this.updateCheckoutHistory.bind(this);
    this.updateCheckout = this.updateCheckout.bind(this);
    this.addCheckout = this.addCheckout.bind(this);
    this.returnLaptop = this.returnLaptop.bind(this);
    this.enableEditMode = this.enableEditMode.bind(this);
  }

  componentWillMount() {
    this.loadLaptop();
  }

  async loadLaptop() {
    // Get the selected laptop object, based on the laptopId passed from App
    let laptop = await apiCalls.getLaptop(this.props.laptopId);
    this.setState({laptop});
  }

  async addCheckout(checkout){
    // Create new checkout, and set its laptop to currently selected laptop
    let newCheckout = await apiCalls.createCheckout({...checkout});
    // Update laptop's currentCheckout to newCheckout, and update state
    let updatedLaptop = await apiCalls.updateLaptop({...this.state.laptop, currentCheckout: newCheckout}); // ... is the spread operator
    this.setState({laptop: updatedLaptop});
  }

  async returnLaptop(){
    // Update currentCheckout's returnDate
    await apiCalls.updateCheckout({...this.state.laptop.currentCheckout, returnDate: Date.now()});
    // Set laptop's currentCheckout to null, and update state
    let updatedLaptop = await apiCalls.updateLaptop({...this.state.laptop, currentCheckout: null}); // ... is the spread operator
    this.setState({laptop: updatedLaptop});
  }

  async updateCheckoutHistory(checkouts){
    // Set laptop's checkoutHistory to checkouts, and update state
    let updatedLaptop = await apiCalls.updateLaptop({...this.state.laptop, checkoutHistory: checkouts}); // ... is the spread operator
    this.setState({laptop: updatedLaptop});
  }

  async enableEditMode(checkout){
    // Set checkoutToUpdate to checkout
    if(!this.state.checkoutToUpdate) {
      this.setState({checkoutToUpdate: checkout});
    }
  }

  async updateCheckout(checkout){
    // Update checkout
    let updatedCheckout = await apiCalls.updateCheckout(checkout);
    if(updatedCheckout && updatedCheckout.returnDate){ // If we are editing the current checkout, we do not want to add it to checkoutHistory yet
      const checkouts = this.state.laptop.checkoutHistory.map(checkout => {
        return (checkout._id === updatedCheckout._id ? updatedCheckout : checkout);
      });
      // Update checkoutHistory to reflect updated checkout
      this.updateCheckoutHistory(checkouts); 
    }
    // Set checkoutToUpdate to null
    this.setState({checkoutToUpdate: null})
  }

  render(){
    return (
      <section id="checkoutView">
        {/* deselectLaptop() is passed from App. When BackButton is clicked, 
        sets selectedLaptop to null, so App will render LaptopListView */}
        <BackButton onClick={this.props.deselectLaptop}></BackButton>
        <h1>{this.state.laptop.name}</h1>
        <h3>#{this.state.laptop.serialCode}</h3>
        { // If there is a checkoutToUpdate, render EditCheckoutForm
          (this.state.checkoutToUpdate ?
            <EditCheckoutForm
              updateCheckout={this.updateCheckout}
              checkout={this.state.checkoutToUpdate}
            /> : ''
          )
        }
        { // If there is a currentCheckout and NOT a checkoutToUpdate, render CurrentCheckoutItem
          (this.state.laptop.currentCheckout && !this.state.checkoutToUpdate ?
            <CurrentCheckoutItem
              checkout={this.state.laptop.currentCheckout}
              onReturn={this.returnLaptop}
              onEdit={this.enableEditMode.bind(this, this.state.laptop.currentCheckout)}
            /> : ''
          )
        }
        { // If there is NOT a currentCheckout and NOT a checkoutToUpdate, render CheckoutForm to add new checkout
          (
            !this.state.laptop.currentCheckout && !this.state.checkoutToUpdate ?
            <CheckoutForm
              addCheckout={this.addCheckout}
            /> : ''
          )
        }
        {/* Render the laptop's checkout history*/}
        <CheckoutHistory 
          laptop={this.state.laptop} 
          updateCheckoutHistory={this.updateCheckoutHistory} 
          enableEditMode={this.enableEditMode}
        /> 
      </section>
    )
  }
}

export default CheckoutView;
