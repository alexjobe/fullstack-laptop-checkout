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
    // [e.target.name] is a computed property name
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault(); // Prevent form from reloading the page on submit
    // Create laptop object
    var laptop = {
      name: this.state.laptopName,
      serialCode: this.state.laptopCode
    }
    // Clear form
    this.setState({
      laptopName: '',
      laptopCode: ''
    })
    if(this.state.laptopName && this.state.laptopCode) {
      // Call addLaptop(), which is passed from LaptopListView as a prop
      this.props.addLaptop(laptop);
    }
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