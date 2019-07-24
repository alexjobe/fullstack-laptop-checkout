import React, {Component} from 'react';

class EditLaptopForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      laptopName: this.props.laptop.name,
      laptopCode: this.props.laptop.serialCode
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault(); // Prevent form from reloading the page on submit
    var laptop = this.props.laptop;
    laptop.name = this.state.laptopName;
    laptop.serialCode = this.state.laptopCode;
    this.setState({
      laptopName: '',
      laptopCode: ''
    })
    this.props.updateLaptop(laptop);
  }

  render() {
    if(this.props.laptop) {
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
          >Update Laptop</button>
        </form>
      )
    }
  }
}

export default EditLaptopForm;