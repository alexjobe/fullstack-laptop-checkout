import React, {Component} from 'react';
import DueDateInput from './DueDateInput';

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
        <DueDateInput 
          dueDate={this.dueDate} 
          handleChange={this.handleChange.bind(this)} 
          handleFocus={this.handleFocus.bind(this)} 
          handleBlur={this.handleBlur.bind(this)} 
          hasFocus={this.state.dateHasFocus} >
        </DueDateInput>
        <button 
          onClick={this.handleSubmit}
        >Check out</button>
      </form>
    )
  }
}

export default CheckoutForm;