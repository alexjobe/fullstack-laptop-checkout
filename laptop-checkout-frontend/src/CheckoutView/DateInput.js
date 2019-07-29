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
    // The onBlur DOM event occurs when an object loses focus
    this.setState({dateHasFocus: false});
  }

  handleFocus() {
    // The onFocus DOM event occurs when an object has focus
    this.setState({dateHasFocus: true});
  }

  render() {
    var placeholder = this.props.placeholder;
    if(this.props.value) {
      // If value is passed as a prop, render placeholder and formatted value, for example: "Due Date: 1/2/1999" where
      // placeholder is "Due Date" and value is the date to be formatted
      placeholder = placeholder + ': ' + new Date(this.props.value).toLocaleDateString('en-US', { timeZone: 'UTC' })
    }
    return (
      <input 
        name={this.props.name}
        type={this.state.dateHasFocus? 'date' : 'text'}
        value={this.state.dateHasFocus? this.props.value : ''}
        onChange={this.props.onChange}
        placeholder={placeholder}
        onFocus = {this.handleFocus}
        onBlur= {this.handleBlur}
      />
    )
  }
}

export default DateInput;