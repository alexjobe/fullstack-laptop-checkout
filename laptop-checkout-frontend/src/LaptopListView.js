import React, {Component} from 'react';
import LaptopItem from './LaptopItem';
import LaptopForm from './LaptopForm';
import * as apiCalls from './api';
import CheckoutView from './CheckoutView';

class LaptopListView extends Component {
  constructor(props){
    super(props);
    this.state = {
      laptops: [],
      selectedLaptop: null
    }
    this.addLaptop = this.addLaptop.bind(this);
  }

  componentWillMount(){
    this.loadLaptops();
  }

  async loadLaptops(){
    let laptops = await apiCalls.getLaptops()
    this.setState({laptops});
  }

  async addLaptop(val){
    let newLaptop = await apiCalls.createLaptop(val);
    this.setState({laptops: [...this.state.laptops, newLaptop]})
  }

  async deleteLaptop(id){
    await apiCalls.removeLaptop(id);
    const laptops = this.state.laptops.filter(laptop => laptop._id !== id);
    this.setState({laptops: laptops});
  }

  async selectLaptop(laptop){
    this.setState({selectedLaptop: laptop});
  }

  renderLaptopList() {
    const laptops = this.state.laptops.map((laptop) => (
      <LaptopItem
        key={laptop._id}
        laptop={laptop}
        onDelete={this.deleteLaptop.bind(this, laptop._id)}
        onSelect={this.selectLaptop.bind(this, laptop)}
      />
    ));
    return (
      <div>
        <h1>Laptop List</h1>
        <ul>
          {laptops}
        </ul>
        <LaptopForm addLaptop={this.addLaptop} />
      </div>
    )
  }

  renderCheckoutView() {
    return (
      <CheckoutView laptop={this.state.selectedLaptop} />
    )
  }

  render(){
    if(this.state.selectedLaptop){
      return this.renderCheckoutView();
    }
    return this.renderLaptopList();
  }
}

export default LaptopListView;
