import React, {Component} from 'react';

class DateInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      dateHasFocus: false
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleBlur() {
    this.setState({dateHasFocus: false});
  }

  handleFocus() {
    this.setState({dateHasFocus: true});
  }

  render() {
    return (
      <input 
        name={this.props.name}
        type={this.state.dateHasFocus? 'date' : 'text'}
        value={this.state.dateHasFocus? this.props.value : ''}
        onChange={this.props.handleChange}
        placeholder={this.props.placeholder}
        onFocus = {this.handleFocus}
        onBlur= {this.handleBlur}
      />
    )
  }
}

export default DateInput;