import React, {Component} from 'react';
import * as apiCalls from '../api';

class CurrentCheckoutItem extends Component {

  constructor(props){
    super(props);

    this.state = {
      emailSent: false
    }

    this.sendOverdueEmail = this.sendOverdueEmail.bind(this);
    this.sendReminderEmail = this.sendReminderEmail.bind(this);
  }

  sendOverdueEmail() {
    var dueDate = new Date(this.props.checkout.dueDate).toLocaleDateString('en-US', { timeZone: 'UTC' });
    var checkoutDate = new Date(this.props.checkout.checkoutDate).toLocaleDateString('en-US', { timeZone: 'UTC' });
    var message = 'Hello ' + this.props.checkout.userName + ',\n\n' +
    'The laptop you checked out was due ' +  dueDate + 
    '. Please return it to the MAI Animal Health IT department.\n\n' +
    '***Checkout Summary***\n\n' +
    'Laptop: ' + this.props.laptop + '\n' + 
    'Checked Out: ' + checkoutDate + '\n' +
    'Due Date: ' + dueDate;

    var email = {
      email: this.props.checkout.userEmail,
      subject: 'Laptop Overdue Notice',
      message: message
    }
    this.setState({emailSent: true});

    apiCalls.notify(email);
  }

  sendReminderEmail() {
    var dueDate = new Date(this.props.checkout.dueDate).toLocaleDateString('en-US', { timeZone: 'UTC' });
    var checkoutDate = new Date(this.props.checkout.checkoutDate).toLocaleDateString('en-US', { timeZone: 'UTC' });
    var message = 'Hello ' + this.props.checkout.userName + ',\n\n' +
    'The laptop you checked out will be due ' +  dueDate + 
    '. Please return it to the MAI Animal Health IT department before then.\n\n' +
    '***Checkout Summary***\n\n' +
    'Laptop: ' + this.props.laptop + '\n' + 
    'Checked Out: ' + checkoutDate + '\n' +
    'Due Date: ' + dueDate;

    var email = {
      email: this.props.checkout.userEmail,
      subject: 'Laptop Due Date Reminder',
      message: message
    }
    this.setState({emailSent: true});

    apiCalls.notify(email);
  }

  render() {
    return(
      <div id="currentCheckout">
        <h3>Checked out to:</h3>
        <div id="currentCheckoutInfo">
          <span className="edit" onClick={this.props.onEdit}><i className="fa fa-edit"></i></span>
          <p>
            Name: {this.props.checkout.userName} <br />
            Email: {this.props.checkout.userEmail} <br />
            Approved By: {this.props.checkout.mgrName} <br />
            Checked Out: {new Date(this.props.checkout.checkoutDate).toLocaleDateString('en-US', { timeZone: 'UTC' })} <br />
            Due Date: {new Date(this.props.checkout.dueDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
          </p>
        </div>
        {
          !this.state.emailSent && new Date(this.props.checkout.dueDate) < Date.now() ?
            <button id="emailButton" onClick={this.sendOverdueEmail}>Send Overdue Notice</button>
          : ''
        }
        {
          !this.state.emailSent && new Date(this.props.checkout.dueDate) >= Date.now() ?
            <button id="emailButton" onClick={this.sendReminderEmail}>Send Due Date Reminder</button>
          : ''
        }
        {
          this.state.emailSent ? <button id="emailButton" disabled>Notification Sent</button>
          : ''
        }
        <button id="returnButton" onClick={this.props.onReturn}>Return Laptop</button>
      </div>
    )
  }
}

export default CurrentCheckoutItem;