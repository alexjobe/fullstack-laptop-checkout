import React, { Component } from 'react';
import LaptopListView from './LaptopListView/LaptopListView';
import CheckoutView from './CheckoutView/CheckoutView';
import './App.css';
import './assets/font-awesome/css/font-awesome.min.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedLaptop: null
    }
    this.selectLaptop = this.selectLaptop.bind(this);
  }

  async selectLaptop(laptop){
    this.setState({selectedLaptop: laptop});
  }

  renderLaptopListView() {
    return (
      <div className="App">
        <LaptopListView selectLaptop={this.selectLaptop.bind(this)} />
      </div>
    )
  }

  renderCheckoutView() {
    return (
      <div className="App">
        <CheckoutView laptopId={this.state.selectedLaptop} selectLaptop={this.selectLaptop.bind(this)} />
      </div>
    )
  }

  render() {
    if(this.state.selectedLaptop){
      return this.renderCheckoutView();
    }
    return this.renderLaptopListView();
  }
}

export default App;
