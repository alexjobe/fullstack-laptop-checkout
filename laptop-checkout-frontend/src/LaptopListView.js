import React, {Component} from 'react';
import LaptopItem from './LaptopItem';
import LaptopForm from './LaptopForm';
import * as apiCalls from './api';

class LaptopListView extends Component {
  constructor(props){
    super(props);
    this.state = {
      laptops: []
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

  renderLaptopList() {
    const laptops = this.state.laptops.map((laptop) => (
      <LaptopItem
        key={laptop._id}
        laptop={laptop}
        onDelete={this.deleteLaptop.bind(this, laptop._id)}
        onSelect={this.props.selectLaptop.bind(this, laptop._id)}
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

  render(){
    return this.renderLaptopList();
  }
}

export default LaptopListView;
