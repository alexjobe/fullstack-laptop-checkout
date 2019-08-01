import React, {Component} from 'react';
import LaptopItem from './LaptopItem';
import LaptopForm from './LaptopForm';
import * as apiCalls from '../api';
import EditLaptopForm from './EditLaptopForm';

class LaptopListView extends Component {
  constructor(props){
    super(props);
    this.state = {
      laptops: [], // An array of all laptops to display in the list
      laptopToUpdate: null // Laptop that is selected for editing (initially null)
    }
    this.addLaptop = this.addLaptop.bind(this);
    this.updateLaptop = this.updateLaptop.bind(this);
    this.enableEditMode = this.enableEditMode.bind(this);
  }

  componentWillMount(){
    this.loadLaptops();
  }

  async loadLaptops(){
    // Get all laptops and set state
    let laptops = await apiCalls.getLaptops()
    this.setState({laptops});
  }

  async addLaptop(val){
    // Create new laptop and update state
    let newLaptop = await apiCalls.createLaptop(val);
    this.setState({laptops: [...this.state.laptops, newLaptop]})
  }

  async updateLaptop(laptop){
    // Update laptop
    let updatedLaptop = await apiCalls.updateLaptop(laptop);
    // Find laptop in laptops and replace it with updatedLaptop
    const laptops = this.state.laptops.map(laptop => {
      return (laptop === updatedLaptop._id ? updatedLaptop : laptop);
    });
    this.setState({laptops: laptops})
    this.setState({laptopToUpdate: null})
  }

  async deleteLaptop(id){
    // Delete laptop
    await apiCalls.removeLaptop(id);
    // Update state to reflect deletion
    const laptops = this.state.laptops.filter(laptop => laptop._id !== id);
    this.setState({laptops: laptops});
  }

  async enableEditMode(laptop){
    // Set laptopToUpdate to laptop
    this.setState({laptopToUpdate: laptop});
  }

  render(){
    // For each laptop in laptops, create a LaptopItem
    const laptops = this.state.laptops.map((laptop) => (
      <LaptopItem
        key={laptop._id}
        laptop={laptop}
        onDelete={this.deleteLaptop.bind(this, laptop._id)}
        // selectLaptop() is passed from App as a prop
        onSelect={this.props.selectLaptop.bind(this, laptop._id)}
        onEdit={this.enableEditMode.bind(this, laptop)}
        // If laptop is currently checked out, and the current date is past the dueDate, set isOverdue to true
        isOverdue={laptop.currentCheckout && new Date(laptop.currentCheckout.dueDate) < Date.now()}
      />
    ));
    return (
      <section id="laptopView">
        <h1>MAI</h1>
        <h2><i className="fa fa-laptop"></i> laptop<span>checkout</span></h2> 
        <ul id="laptopList">
          {laptops}
        </ul>
        {
          // If there is a laptopToUpdate, render EditLaptopForm. Otherwise, render LaptopForm for adding new laptops
          (this.state.laptopToUpdate ? 
            <EditLaptopForm laptop={this.state.laptopToUpdate} updateLaptop={this.updateLaptop}/> 
            : 
            <LaptopForm addLaptop={this.addLaptop} />
          )
        }
      </section>
    )
  }
}

export default LaptopListView;
