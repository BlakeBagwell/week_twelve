import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';

class AddContact extends React.Component{
  constructor() {
    super();
    this.state = {
      contactName: '',
      contactNumber: '',
      contactEmail: '',
      contactType: 'friend',
      contactArray: []
    };
  }

  componentDidMount() {
    $.get('http://localhost:3000/api/contacts')
      .then(contacts => {
        this.setState({
          contactArray: contacts
        });
      });
  }

  changeStateValue(stateName, event) {
    this.setState({
      [stateName]: event.target.value
    });
  }
  submitForm() {
    let data = {
      name: this.state.contactName,
      phone: this.state.contactNumber,
      email: this.state.contactEmail,
      type: this.state.contactType,
      favorite: this.state.contactFavorite
    }
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/contacts',
      data: JSON.stringify(data),
      contentType: 'application/json'
    })
    .then(contact => {
      this.state.contactArray.push(contact);
      this.setState ({
        contactName: '',
        contactNumber: '',
        contactEmail: '',
        contactType: 'friend',
        contactFavorite: false,
        contactArray: this.state.contactArray
    })
    .catch(() => {
      alert('Could not add contact.')
    });


    });
  }
  deleteContact(key) {
    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:3000/api/contacts/' + key
    })
    .then(contact => {
      this.state.contactArray = this.state.contactArray.filter(
        contact => contact.id !== key
      );
      return this.setState({
        contactArray: this.state.contactArray
      });
    });
  }

  render() {
    return(
      <div className="form-group">
        <div>
        <label>Name: </label>
        <input type="text"
          className="form-control"
          value={this.state.contactName}
          onChange={event => this.changeStateValue('contactName', event)}/>
        </div>
        <div>
        <label>Phone: </label>
        <input type="text"
          className="form-control"
          value={this.state.contactNumber}
          onChange={event => this.changeStateValue('contactNumber', event)}/>
        </div>
        <div>
        <label>Email: </label>
        <input type="text"
          className="form-control"
          value={this.state.contactEmail}
          onChange={event => this.changeStateValue('contactEmail', event)}/>
        </div>
        <div>
        <label>Type: </label>
        <select
        className="form-control"
          value={this.state.contactType}
          onChange={event => this.changeStateValue('contactType', event)}>
          <option value="friend">Friend</option>
          <option value="family">family</option>
          <option value="work">Work</option>
          <option value="other">Other</option>
        </select>
        <button onClick={() => this.submitForm()}>Add Contact</button>
        </div>

        <ul>
        {this.state.contactArray.map((item) =>
          <ListContacts key={item.id} item={item} deleteContact={() => this.deleteContact(item.id)}/>
        )}
        </ul>
      </div>
    );
  }
}

class ListContacts extends React.Component{
  render() {
    return (
      <li>
      <br/>
      <label>Name: {this.props.item.name}</label><br/>
      <label>Num: {this.props.item.number}</label><br/>
      <label>Email: {this.props.item.email}</label><br/>
      <label>Type: {this.props.item.type}</label><br/>
      <button onClick={this.props.deleteContact}>Delete</button>
      </li>
    )
  }
}



ReactDOM.render(
  <AddContact/>,
  document.getElementById('root')
);
