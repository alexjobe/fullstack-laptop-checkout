import React, { Component } from 'react';
import LaptopListView from './LaptopListView/LaptopListView';
import CheckoutView from './CheckoutView/CheckoutView';
import './css/App.css';
import './assets/font-awesome/css/font-awesome.min.css';

class App extends Component {

  state = {
    selectedLaptop: null // Set when a laptop is selected in LaptopListView
  }

  selectLaptop = async (laptop) => {
    // Called when a laptop is selected in LaptopListView
    this.setState(st => {
      return {selectedLaptop: laptop};
    });
  }

  deselectLaptop = async () => {
    // Called when BackButton is clicked in CheckoutView
    this.setState(st => {
      return {selectedLaptop: null};
    });
  }

  renderLaptopListView() {
    return (
      <div className="App">
        <LaptopListView 
          selectLaptop={this.selectLaptop} 
        />
      </div>
    )
  }

  renderCheckoutView() {
    return (
      <div className="App">
        <CheckoutView 
          laptopId={this.state.selectedLaptop} 
          deselectLaptop={this.deselectLaptop} 
        />
      </div>
    )
  }

  render() {
    // If a laptop is selected, render its CheckoutView. Otherwise, render LaptopListView
    if(this.state.selectedLaptop){
      return this.renderCheckoutView();
    }
    return this.renderLaptopListView();
  }
}

export default App;
