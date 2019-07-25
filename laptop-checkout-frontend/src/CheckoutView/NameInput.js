import React, {Component} from 'react';

class NameInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasFocus: false
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleBlur() {
    this.setState({hasFocus: false});
  }

  handleFocus() {
    this.setState({hasFocus: true});
  }

  render() {
    var placeholder = this.props.placeholder;
    if(this.props.value) {
      placeholder = placeholder + ': ' + this.props.value;
    }
    return (
      <input 
        name={this.props.name}
        type='text'
        value={this.state.hasFocus? this.props.value : ''}
        onChange={this.props.onChange}
        placeholder={placeholder}
        onFocus = {this.handleFocus}
        onBlur= {this.handleBlur}
      />
    )
  }
}

export default NameInput;