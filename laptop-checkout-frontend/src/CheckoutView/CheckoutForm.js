import React, {Component} from 'react';
import DateInput from './DateInput';

class CheckoutForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName: '',
      mgrName: '',
      dueDate: '',
      dateHasFocus: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault(); // Prevent form from reloading the page on submit
    var checkout = {
      userName: this.state.userName,
      mgrName: this.state.mgrName,
      dueDate: this.state.dueDate
    }
    this.props.addCheckout(checkout);
  }

  handleBlur() {
    this.setState({dateHasFocus: false});
  }

  handleFocus() {
    this.setState({dateHasFocus: true});
  }

  render() {
    return (
      <section id="checkoutForm">
        <h3 id="available">Available</h3>
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
            name='dueDate'
            placeholder='Due Date'
            value={this.state.dueDate} 
            handleChange={this.handleChange.bind(this)} 
            handleFocus={this.handleFocus.bind(this)} 
            handleBlur={this.handleBlur.bind(this)} 
            hasFocus={this.state.dateHasFocus} >
          </DateInput>
          <button 
            onClick={this.handleSubmit}
          >Check out</button>
        </form>
      </section>
    )
  }
}

export default CheckoutForm;