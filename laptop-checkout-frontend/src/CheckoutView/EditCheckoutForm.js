import React, {Component} from 'react';
import DateInput from '../General/DateInput';
import NameInput from '../General/NameInput';

class EditCheckoutForm extends Component {

  state = {
    userName: this.props.checkout.userName,
    userEmail: this.props.checkout.userEmail,
    mgrName: this.props.checkout.mgrName,
    dueDate: '',
    checkoutDate: '',
    returnDate: ''
  };

  componentDidMount() {
    // Set state with formatted dates
    if(this.props.checkout.dueDate) {
      this.setState(st => {
        return {dueDate: new Date(this.props.checkout.dueDate).toISOString().substring(0, 10)};
      });
    }
    if(this.props.checkout.checkoutDate) {
      this.setState(st => {
        return {checkoutDate: new Date(this.props.checkout.checkoutDate).toISOString().substring(0, 10)};
      });
    }
    if(this.props.checkout.returnDate) {
      this.setState(st => {
        return {returnDate: new Date(this.props.checkout.returnDate).toISOString().substring(0, 10)};
      });
    }
  }

  handleChange = (e) => {
    // [e.target.name] is a computed property name
    let newState = {[e.target.name]: e.target.value };
    this.setState(st => {
      return newState;
    });
  }

  handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page on submit
    // Create checkout object with updated form data
    var checkout = this.props.checkout;
      checkout.userName = this.state.userName;
      checkout.userEmail = this.state.userEmail;
      checkout.mgrName = this.state.mgrName;
      checkout.dueDate = this.state.dueDate;
      checkout.checkoutDate = this.state.checkoutDate;
    // Update checkout
    if(this.props.checkout.returnDate) {
      // Check to make sure inputs are not empty
      if(this.state.userName && this.state.mgrName && this.state.dueDate && this.state.checkoutDate && this.state.returnDate && this.state.userEmail) {
        checkout.returnDate = this.state.returnDate;
        this.props.updateCheckout(checkout);
      }
    }
    else if(this.state.userName && this.state.mgrName && this.state.dueDate && this.state.checkoutDate && this.state.userEmail) {
        this.props.updateCheckout(checkout);
    }
  }
  
  render() {
    if(this.props.checkout) {
      return (
        <form id="checkoutInput">
          <NameInput
            name='userName'
            value={this.state.userName}
            onChange={this.handleChange}
            placeholder='User Name'
          />
          <NameInput
            name='userEmail'
            value={this.state.userEmail}
            onChange={this.handleChange}
            placeholder='Email'
          />
          <NameInput
            name='mgrName'
            value={this.state.mgrName}
            onChange={this.handleChange}
            placeholder='Approved By'
          />
          <DateInput
            name='checkoutDate'
            placeholder='Checkout Date'
            value={this.state.checkoutDate} 
            onChange={this.handleChange} >
          </DateInput>
          <DateInput
            name='dueDate'
            placeholder='Due Date'
            value={this.state.dueDate} 
            onChange={this.handleChange} >
          </DateInput>
          {this.props.checkout.returnDate ?
            <DateInput
              name='returnDate'
              placeholder='Return Date'
              value={this.state.returnDate} 
              onChange={this.handleChange} >
            </DateInput>
            : ''
          }
          <button 
            onClick={this.handleSubmit}
          >Update Checkout</button>
        </form>
      )
    }
  }
}

export default EditCheckoutForm;