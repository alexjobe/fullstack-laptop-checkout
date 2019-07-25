import React, {Component} from 'react';
import DateInput from './DateInput';
import NameInput from './NameInput';

class EditCheckoutForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName: this.props.checkout.userName,
      mgrName: this.props.checkout.mgrName,
      dueDate: '',
      checkoutDate: '',
      returnDate: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if(this.props.checkout.dueDate) {
      this.setState({dueDate: new Date(this.props.checkout.dueDate).toISOString().substring(0, 10)});
    }
    if(this.props.checkout.checkoutDate) {
      this.setState({checkoutDate: new Date(this.props.checkout.checkoutDate).toISOString().substring(0, 10)});
    }
    if(this.props.checkout.returnDate) {
      this.setState({returnDate: new Date(this.props.checkout.returnDate).toISOString().substring(0, 10)});
    }
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
          <NameInput
            name='userName'
            value={this.state.userName}
            onChange={this.handleChange.bind(this)}
            placeholder='User Name'
          />
          <NameInput
            name='mgrName'
            value={this.state.mgrName}
            onChange={this.handleChange.bind(this)}
            placeholder='Approved By'
          />
          <DateInput
            name='checkoutDate'
            placeholder='Checkout Date'
            value={this.state.checkoutDate} 
            onChange={this.handleChange.bind(this)} >
          </DateInput>
          <DateInput
            name='dueDate'
            placeholder='Due Date'
            value={this.state.dueDate} 
            onChange={this.handleChange.bind(this)} >
          </DateInput>
          {this.props.checkout.returnDate ?
            <DateInput
              name='returnDate'
              placeholder='Return Date'
              value={this.state.returnDate} 
              onChange={this.handleChange.bind(this)} >
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