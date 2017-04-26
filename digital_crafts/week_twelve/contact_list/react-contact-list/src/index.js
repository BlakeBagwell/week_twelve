import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
  changeStateValue(stateName, event) {
    this.setState({
      [stateName]: event.target.value
    });
  }
  submitForm() {
    this.state.contactArray.push({name: this.state.contactName, number: this.state.contactNumber, email: this.state.contactEmail, type: this.state.contactType});
    this.setState ({
      contactName: '',
      contactNumber: '',
      contactEmail: '',
      contactType: 'friend',
      contactArray: this.state.contactArray
    });
  }
  deleteContact(idx) {
    this.state.contactArray.splice(idx, 1);
    this.setState({
      contactArray: this.state.contactArray
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
        </div>
        <button onClick={() => this.submitForm()}>Add Contact</button>
        <ul>
        {this.state.contactArray.map((item, idx) =>
          <li>
          <br/>
          <label>Name: {item.name}</label><br/>
          <label>Num: {item.number}</label><br/>
          <label>Email: {item.email}</label><br/>
          <label>Type: {item.type}</label><br/>
          <button onClick={() => this.deleteContact(idx)}>Delete</button>
          </li>
        )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <AddContact/>,
  document.getElementById('root')
);
