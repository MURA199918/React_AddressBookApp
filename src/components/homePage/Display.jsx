import { Link } from "react-router-dom"
import React from 'react';
import './HomePage.css';
import deleteIcon from '../../assets/icons/delete-black-18dp.svg';
import editIcon from '../../assets/icons/create-black-18dp.svg';
import AddressBookService from "../../services/AddressBookService";

const service =  new AddressBookService();

export default class Display extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addressArray: [],
      update: ''
    }
  }

  updateAddress = (id) => {
    console.log(id)
    localStorage.setItem('idA', id);
  }

  deleteAddress = (id) => {
    console.log(id);
    service.deleteAddress(id).then(() => {
      console.log("deleted successfully");
      this.setState({update: "updates"});
      this.props.callUpdate();
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return(
      <table id="table-diplay" className="table">
        <tbody>
          <tr key={-1}>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Email Id</th>
            <th>Zip Code</th>
            <th>Actions</th>
          </tr>
          {
            this.props.addressArray && this.props.addressArray.map((element) => (
              <tr key={element.contactId}>
                <td>{element.firstName}</td>
                <td>{element.lastName}</td>
                <td>{element.phone}</td>
                <td>{element.address}</td>
                <td>{element.city}</td>
                <td>{element.state}</td>
                <td>{element.email}</td>
                <td>{element.zip}</td>
                { <td><img onClick={() => this.deleteAddress(element.contactId)} src={deleteIcon} alt="delete" />
                    <Link to="Update">
                      <img onClick={() => this.updateAddress(element.contactId)} src={editIcon} alt="edit" />
                    </Link>
                </td> }
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}