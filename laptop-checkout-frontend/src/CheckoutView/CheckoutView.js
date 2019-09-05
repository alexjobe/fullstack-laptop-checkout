import React, {Component} from 'react';
import * as apiCalls from '../api';
import CheckoutForm from './CheckoutForm';
import CurrentCheckoutItem from './CurrentCheckoutItem';
import CheckoutHistory from './CheckoutHistory';
import BackButton from '../General/BackButton';
import EditCheckoutForm from './EditCheckoutForm';

class CheckoutView extends Component {

  state = {
    laptop: null, // The selected laptop
    checkoutToUpdate: null, // Checkout that is selected for editing (initially null)
    viewHistory: false
  }

  componentDidMount() {
    this.loadLaptop();
  }

  loadLaptop = async() => {
    // Get the selected laptop object, based on the laptopId passed from App
    let laptop = await apiCalls.getLaptop(this.props.laptopId);
    this.setState(st => {
      return {laptop};
    });
  }

  addCheckout = async(checkout) =>{
    // Create new checkout, and set its laptop to currently selected laptop
    let newCheckout = await apiCalls.createCheckout({...checkout});
    // Update laptop's currentCheckout to newCheckout, and update state
    let updatedLaptop = await apiCalls.updateLaptop({...this.state.laptop, currentCheckout: newCheckout}); // ... is the spread operator
    this.setState(st => {
      return {laptop: {...updatedLaptop}};
    });
  }

  returnLaptop = async() => {
    // Update currentCheckout's returnDate
    await apiCalls.updateCheckout({...this.state.laptop.currentCheckout, returnDate: Date.now()});
    // Set laptop's currentCheckout to null, and update state
    let updatedLaptop = await apiCalls.updateLaptop({...this.state.laptop, currentCheckout: null}); // ... is the spread operator
    this.setState(st => {
      return {laptop: {...updatedLaptop}};
    });
  }

  enableEditMode = async(checkout) => {
    // Set checkoutToUpdate to checkout
    if(!this.state.checkoutToUpdate) {
      this.setState(st => {
        return {checkoutToUpdate: {...checkout}};
      });
    }
  }

  disableEditMode = async() => {
    this.setState(st => {
      return {checkoutToUpdate: null};
    });
  }

  enableViewHistory = async() => {
    this.setState(st => {
      return {viewHistory: true};
    });
  }

  disableViewHistory = async() => {
    this.setState(st => {
      return {viewHistory: false};
    });
  }

  updateCheckout = async(checkout) => {
    // Update checkout
    await apiCalls.updateCheckout(checkout);
    // Update checkoutHistory to reflect updated checkout
    this.loadLaptop();
    // Set checkoutToUpdate to null
    this.setState(st => {
      return {checkoutToUpdate: null};
    });
  }

  renderCheckoutView() {
    return (
      <section id="checkoutView">
        {/* deselectLaptop() is passed from App. When BackButton is clicked, 
        sets selectedLaptop to null, so App will render LaptopListView */}
        <BackButton onClick={this.props.deselectLaptop}></BackButton>
        <h1>Laptop: {this.state.laptop.name}</h1>
        <h3>
          Lease Date: {this.state.laptop.leaseDate ? new Date(this.state.laptop.leaseDate).toLocaleDateString('en-US', { timeZone: 'UTC' })
            : 'N/A'
          }
        </h3>
        { // If there is a currentCheckout and NOT a checkoutToUpdate, render CurrentCheckoutItem
          (this.state.laptop.currentCheckout ?
            <CurrentCheckoutItem
              laptop={this.state.laptop}
              checkout={this.state.laptop.currentCheckout}
              onReturn={this.returnLaptop}
              onEdit={this.enableEditMode.bind(this, this.state.laptop.currentCheckout)}
              loadLaptop={this.loadLaptop}
            /> : ''
          )
        }
        { // If there is NOT a currentCheckout and NOT a checkoutToUpdate, render CheckoutForm to add new checkout
          (
            !this.state.laptop.currentCheckout ?
            <CheckoutForm
              addCheckout={this.addCheckout}
            /> : ''
          )
        }
        <button id="historyButton" onClick={this.enableViewHistory}>Checkout History</button>
      </section>
    )
  }

  renderUpdateCheckoutView() {
    return(
      <section id="checkoutView">
        <BackButton onClick={this.disableEditMode}></BackButton>
        <h1>Laptop: {this.state.laptop.name}</h1>
        <h3>
          Lease Date: {this.state.laptop.leaseDate ? new Date(this.state.laptop.leaseDate).toLocaleDateString('en-US', { timeZone: 'UTC' })
            : 'N/A'
          }
        </h3>
        <EditCheckoutForm
          updateCheckout={this.updateCheckout}
          checkout={this.state.checkoutToUpdate}
        />
      </section>
    )
  }

  renderHistoryView() {
    /* Render the laptop's checkout history*/
    return(
      <section id="checkoutView">
        <BackButton onClick={this.disableViewHistory}></BackButton>
        <h1>Laptop: {this.state.laptop.name}</h1>
        <h3>
          Lease Date: {this.state.laptop.leaseDate ? new Date(this.state.laptop.leaseDate).toLocaleDateString('en-US', { timeZone: 'UTC' })
            : 'N/A'
          }
        </h3>
        <CheckoutHistory 
          laptop={this.state.laptop} 
          updateCheckoutHistory={this.loadLaptop} 
          enableEditMode={this.enableEditMode}
        />
      </section>
    )
  }

  render(){
    if(this.state.laptop && !this.state.viewHistory && !this.state.checkoutToUpdate) { 
      return this.renderCheckoutView();
    }
    else if(this.state.laptop && this.state.viewHistory && !this.state.checkoutToUpdate) {
      return this.renderHistoryView();
    }
    else if(this.state.laptop && this.state.checkoutToUpdate) {
      return this.renderUpdateCheckoutView();
    }
    else {
      return (
        <section id="checkoutView">
          <BackButton onClick={this.props.deselectLaptop}></BackButton>
          <h1>Loading...</h1>
        </section>
      )
    }
  }
}

export default CheckoutView;
