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

  async sendOverdueEmail() {
    await apiCalls.notifyOverdue(this.props.laptop);
    this.setState({emailSent: true});
    this.props.loadLaptop();
  }

  async sendReminderEmail() {
    await apiCalls.notify(this.props.laptop);
    this.setState({emailSent: true});
    this.props.loadLaptop();
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
            Due Date: {new Date(this.props.checkout.dueDate).toLocaleDateString('en-US', { timeZone: 'UTC' })} <br /> <br />
          </p>
        </div>
        { this.props.checkout.lastEmailDate ?
          <i>Last Notified On: {new Date(this.props.checkout.lastEmailDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</i>
          : ''
        }
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