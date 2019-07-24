import React, {Component} from 'react';
import LaptopItem from './LaptopItem';
import LaptopForm from './LaptopForm';
import * as apiCalls from '../api';
import EditLaptopForm from './EditLaptopForm';

class LaptopListView extends Component {
  constructor(props){
    super(props);
    this.state = {
      laptops: [],
      laptopToUpdate: null
    }
    this.addLaptop = this.addLaptop.bind(this);
    this.updateLaptop = this.updateLaptop.bind(this);
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

  async updateLaptop(val){
    let updatedLaptop = await apiCalls.updateLaptop(val);
    const laptops = this.state.laptops.map(laptop => {
      return (laptop === updatedLaptop._id ? updatedLaptop : laptop);
    });
    this.setState({laptops: laptops})
    this.setState({laptopToUpdate: null})
  }

  async deleteLaptop(id){
    await apiCalls.removeLaptop(id);
    const laptops = this.state.laptops.filter(laptop => laptop._id !== id);
    this.setState({laptops: laptops});
  }

  async enableEditMode(laptop){
    this.setState({laptopToUpdate: laptop});
  }

  render(){
    const laptops = this.state.laptops.map((laptop) => (
      <LaptopItem
        key={laptop._id}
        laptop={laptop}
        onDelete={this.deleteLaptop.bind(this, laptop._id)}
        onSelect={this.props.selectLaptop.bind(this, laptop._id)}
        onEdit={this.enableEditMode.bind(this, laptop)}
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
          (this.state.laptopToUpdate ? 
            <EditLaptopForm laptop={this.state.laptopToUpdate} updateLaptop={this.updateLaptop.bind(this)}/> 
            : 
            <LaptopForm addLaptop={this.addLaptop} />
          )
        }
      </section>
    )
  }
}

export default LaptopListView;
