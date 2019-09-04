import React, {Component} from 'react';
import DateInput from '../General/DateInput';
import NameInput from '../General/NameInput';

class LaptopForm extends Component {

  state = {
    laptopName: '',
    leaseDate: ''
  };

  handleChange = (e) => {
    // [e.target.name] is a computed property name
    let newState = {[e.target.name]: e.target.value };
    this.setState(st => {
      return newState;
    });
  }

  handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page on submit
    // Create laptop object
    var laptop = {
      name: this.state.laptopName,
      leaseDate: this.state.leaseDate
    }
    // Clear form
    this.setState(st => {
      return {
        laptopName: '',
        leaseDate: ''
      };
    });
    if(this.state.laptopName) {
      // Call addLaptop(), which is passed from LaptopListView as a prop
      this.props.addLaptop(laptop);
    }
  }

  render() {
    return (
      <form id="laptopInput">
        <NameInput
          name='laptopName'
          value={this.state.laptopName}
          onChange={this.handleChange}
          placeholder='Laptop Name'
        />
        <DateInput
          name='leaseDate'
          placeholder='Lease Date'
          value={this.state.leaseDate} 
          onChange={this.handleChange}>
        </DateInput>
        <button 
          onClick={this.handleSubmit}
        >Add Laptop</button>
      </form>
    )
  }
}

export default LaptopForm;