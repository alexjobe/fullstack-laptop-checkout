import React, {Component} from 'react';
import DateInput from '../General/DateInput';
import NameInput from '../General/NameInput';

class EditLaptopForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      laptopName: this.props.laptop.name,
      leaseDate: this.props.laptop.leaseDate
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Set state with formatted dates
    if(this.props.laptop.leaseDate) {
      this.setState({leaseDate: new Date(this.props.laptop.leaseDate).toISOString().substring(0, 10)});
    }
  }

  handleChange(e){
    // [e.target.name] is a computed property name
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault(); // Prevent form from reloading the page on submit
    // Update laptop object
    var laptop = this.props.laptop;
    laptop.name = this.state.laptopName;
    laptop.leaseDate = this.state.leaseDate;
    
    // Call updateLaptop(), which is passed from LaptopListView as a prop
    if(this.state.laptopName) {
      this.props.updateLaptop(laptop);
    }

    // Clear form
    this.setState({
      laptopName: '',
      leaseDate: ''
    })
  }

  render() {
    if(this.props.laptop) {
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
          >Update Laptop</button>
        </form>
      )
    }
  }
}

export default EditLaptopForm;