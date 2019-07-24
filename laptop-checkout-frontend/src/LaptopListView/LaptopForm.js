import React, {Component} from 'react';

class LaptopForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      laptopName: '',
      laptopCode: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault(); // Prevent form from reloading the page on submit
    var laptop = {
      name: this.state.laptopName,
      serialCode: this.state.laptopCode
    }
    this.setState({
      laptopName: '',
      laptopCode: ''
    })
    this.props.addLaptop(laptop);
  }

  render() {
    return (
      <form id="laptopInput">
        <input
          name='laptopName'
          type='text' 
          value={this.state.laptopName}
          onChange={this.handleChange}
          placeholder='Laptop Name'
        />
        <input 
          name='laptopCode'
          type='text'
          value={this.state.laptopCode}
          onChange={this.handleChange}
          placeholder='Serial Code'
        />
        <button 
          onClick={this.handleSubmit}
        >Add Laptop</button>
      </form>
    )
  }
}

export default LaptopForm;