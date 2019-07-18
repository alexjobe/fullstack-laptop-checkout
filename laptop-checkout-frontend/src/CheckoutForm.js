import React, {Component} from 'react';

class CheckoutForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName: '',
      mgrName: '',
      dueDate: ''
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

  render() {
    return (
      <form>
        <input
          name='userName'
          type='text' 
          value={this.state.userName}
          onChange={this.handleChange}
        />
        <input 
          name='mgrName'
          type='text'
          value={this.state.mgrName}
          onChange={this.handleChange}
        />
        <input 
          name='dueDate'
          type='date'
          value={this.state.dueDate}
          onChange={this.handleChange}
        />
        <button 
          onClick={this.handleSubmit}
        >Check out</button>
      </form>
    )
  }
}

export default CheckoutForm;