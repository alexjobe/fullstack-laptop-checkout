import React, {Component} from 'react';
import DateInput from './DateInput';

class EditCheckoutForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName: this.props.checkout.userName,
      mgrName: this.props.checkout.mgrName,
      dueDate: new Date(this.props.checkout.dueDate).toISOString().substring(0, 10),
      checkoutDate: new Date(this.props.checkout.checkoutDate).toISOString().substring(0, 10),
      returnDate: new Date(this.props.checkout.returnDate).toISOString().substring(0, 10)
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault(); // Prevent form from reloading the page on submit
    var checkout = this.props.checkout;
    checkout.userName = this.state.userName;
    checkout.mgrName = this.state.mgrName;
    checkout.dueDate = this.state.dueDate;
    checkout.checkoutDate = this.state.checkoutDate;
    checkout.returnDate = this.state.returnDate;
    this.props.updateCheckout(checkout);
  }
  
  render() {
    if(this.props.checkout) {
      return (
        <form id="checkoutInput">
          <input
            name='userName'
            type='text' 
            value={this.state.userName}
            onChange={this.handleChange}
            placeholder='User Name'
          />
          <input 
            name='mgrName'
            type='text'
            value={this.state.mgrName}
            onChange={this.handleChange}
            placeholder='Approved By'
          />
          <DateInput
            name='checkoutDate'
            placeholder='Checkout Date'
            value={this.state.checkoutDate} 
            handleChange={this.handleChange.bind(this)} >
          </DateInput>
          <DateInput
            name='dueDate'
            placeholder='Due Date'
            value={this.state.dueDate} 
            handleChange={this.handleChange.bind(this)} >
          </DateInput>
          <DateInput
            name='returnDate'
            placeholder='Return Date'
            value={this.state.returnDate} 
            handleChange={this.handleChange.bind(this)} >
          </DateInput>
          <button 
            onClick={this.handleSubmit}
          >Update Checkout</button>
        </form>
      )
    }
  }
}

export default EditCheckoutForm;