import React, {Component} from 'react';

class Search extends Component {

  state = {
    searchQuery: ''
  };

  handleChange = async(e) => {
    // [e.target.name] is a computed property name
    let newState = {[e.target.name]: e.target.value };
    await this.setState(st => {
      return newState;
    });
    // Call search(), which is passed to this component as a prop
    this.props.search(this.state.searchQuery);
  }

  handleSubmit = async(e) => {
    e.preventDefault(); // Prevent form from reloading the page on submit

    // Call search(), which is passed to this component as a prop
    await this.props.search(this.state.searchQuery);
  }

  clearSearch = async(e) => {
    e.preventDefault(); // Prevent form from reloading the page on submit
    this.setState(st => {
      return { searchQuery: '' };
    });
    await this.props.search(this.state.searchQuery);
  }

  render() {
    return (
      <form id="searchForm">
        <input
          type='text'
          name='searchQuery'
          value={this.state.searchQuery}
          onChange={this.handleChange}
          placeholder='Search'
        />
        <input type='submit' onClick={this.handleSubmit} style={{display: 'none'}}></input>
      </form>
    )
  }
}

export default Search;