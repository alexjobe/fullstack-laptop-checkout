import React, {Component} from 'react';
import LaptopListItem from './LaptopListItem';
import LaptopForm from './LaptopForm';
import * as apiCalls from '../api';
import EditLaptopForm from './EditLaptopForm';
import Search from '../General/Search';

class LaptopListView extends Component {

  state = {
    laptops: [], // An array of all laptops to display in the list
    laptopToUpdate: null // Laptop that is selected for editing (initially null)
  }

  componentDidMount(){
    this.loadLaptops();
  }

  loadLaptops = async() => {
    // Get all laptops and set state
    let laptops = await apiCalls.getLaptops();
    this.setState(st => {
      return {laptops};
    });
  }

  addLaptop = async(val) => {
    // Create new laptop and update state
    let newLaptop = await apiCalls.createLaptop(val);
    this.setState(st => {
      return {laptops: [...this.state.laptops, newLaptop]};
    });
  }

  updateLaptop = async(laptop) => {
    // Update laptop
    let updatedLaptop = await apiCalls.updateLaptop(laptop);
    // Find laptop in laptops and replace it with updatedLaptop
    const laptops = this.state.laptops.map(laptop => {
      return (laptop._id === updatedLaptop._id ? updatedLaptop : laptop);
    });
    this.setState(st => {
      return {laptops: laptops, laptopToUpdate: null};
    });
  }

  deleteLaptop = async(id) => {
    // Delete laptop
    await apiCalls.removeLaptop(id);
    // Update state to reflect deletion
    const laptops = this.state.laptops.filter(laptop => laptop._id !== id);
    this.setState(st => {
      return {laptops: laptops};
    });
  }

  enableEditMode = async(laptop) => {
    // Set laptopToUpdate to laptop
    await this.setState(st => {
      return {laptopToUpdate: null};
    });
    this.setState(st => {
      return {laptopToUpdate: {...laptop}};
    });
  }

  // Sort laptops by leaseDate
  sortLaptops = (laptops) => {
    laptops.sort(function(a, b) {
      // If a laptop doesn't have a leaseDate, it should be at the bottom of the list
      if(a.leaseDate && b.leaseDate) {
        return new Date(a.leaseDate) - new Date(b.leaseDate);
      }
      return new Date(b.leaseDate) - new Date(a.leaseDate);
    });
    return laptops;
  }

  searchLaptops = async(query) => {
    if(query !== '') {
      let matchingLaptops = await apiCalls.searchLaptops(query);
      this.setState(st => {
        return {laptops: matchingLaptops};
      });
    } else {
      let allLaptops = await apiCalls.getLaptops();
      this.setState(st => {
        return {laptops: allLaptops};
      });
    }
  }

  render(){
    // For each laptop in laptops, create a LaptopItem
    var sortedLaptops = this.sortLaptops(this.state.laptops);
    const laptops = sortedLaptops.map((laptop) => (
      <LaptopListItem
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
        <Search search={this.searchLaptops}/>
        { this.state.laptops && this.state.laptops.length > 0 ?
          <ul id="laptopList">
            {laptops}
          </ul>
          : <h3>No laptops found!</h3>
        }
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
