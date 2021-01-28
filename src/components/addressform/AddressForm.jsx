import AddressBook from "../../assets/images/AddressBook.jpg";
import cancel from "../../assets/images/cancel.jpg";
import './AddressForm.css';
import { Link, withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import AddressBookService from '../../services/AddressBookService';

const service = new AddressBookService();

const AddressBookForm = (props) => {

    let inititalValue = {
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      isUpdate: false,
      error: {
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      }
    }
    const [formValue, setForm] = useState(inititalValue);
  
    const changeValue = (event) => {
      setForm({...formValue, [event.target.name]: event.target.value})
    }
  
    const onCheckChange = (name) => {
      let index = formValue.departmentValue.indexOf(name);
      let checkArray = [...formValue.departmentValue]
      if (index > -1)
        checkArray.splice(index, 1)
      else  
        checkArray.push(name);
      setForm({...formValue, departmentValue: checkArray}); 
    }
  
    const getChecked = (name) => {
      return formValue.departmentValue && formValue.departmentValue.includes(name);
    }
  
    const validData = async () => {
      let isError = false;
      let error = {
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      }
      if (formValue.name.length < 1) {
        error.name = 'name is required field'
        isError = true;
      }
      if (formValue.phone.length < 1) {
        error.phone = 'phone is required field'
        isError = true;
      }
      if (formValue.address.length < 1) {
        error.address = 'address is required field'
        isError = true;
      }
      if (formValue.city.length < 1) {
        error.city = 'city is required field'
        isError = true;
      }
      if (formValue.state.length < 1) {
        error.state = 'state is required field'
        isError = true;
      }
      if (formValue.zip.length < 1) {
        error.zip = 'zip is required field'
        isError = true;
      }
      await setForm({...formValue, error: error})
      return isError;
    }
  
    const save = async (event) => {
      event.preventDefault();
      console.log("save");
  
      if (await validData()) {
        console.log('error', formValue);
        return;
      }
      let object = {
        "name": formValue.name,
        "phone": formValue.phone,
        "address": formValue.address,
        "city": formValue.city,
        "state": formValue.state,
        "zip": formValue.zip
      }
  
      console.log(object);
      service.contactRegistration(object).then(data => {
        console.log(data);
        props.history.push('/');
      }).catch(err => {
        console.log(err);
      })
    }
  
    const reset = () => {
      setForm({...inititalValue, id: formValue.id, isUpdate: formValue.isUpdate});
    }  
  
    useEffect (() => {
      let contactId = localStorage.getItem('id');
      console.log(" contact id: ", contactId);
      formValue.isUpdate = true;
      service.getContactById(contactId).then((data) => {
  
          console.log(data.data.data);
      }).catch(err => {
        console.log(err)
      })
    })
  
    return (
      <div className="address-main">
          <header className="header-content header">
              <div className="logo-content">
                  <img className="logo-content-img" src={AddressBook} alt="Logo Image" />
                  <div>
                      <span className="address-text">ADDRESS</span><br />
                      <span className="address-text book-text">BOOK</span>
                  </div>
              </div>
          </header>
          <div className="form-content">
              <form className="form" action="#" onsubmit="save(event)" onreset="resetForm()">
                  <div className="form-head">
                      <div className="header-text">Person Address Form</div>
                      <div>
                          <a href="../homePage/HomePage.jsx"><img className="cancel-img" src="../assets/images/cancel.jpg" alt="Cancel Icon"></img></a>
                      </div>
                  </div>
                  <div className="row-content">
                      <label for="name" className="label text">Full Name</label>
                      <input type="text" className="input" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Your name.."></input>
                      <error-output className="text-error" for="text">{formValue.error.name}</error-output>
                  </div>
                  <div className="row-content">
                      <label for="tel" className="label text">Phone Number</label>
                      <input type="tel" id="tel" name="tel" className="input" value={formValue.phone} onChange={changeValue} placeholder="Your number.."></input>
                      <error-output className="mobno-error" for="tel">{formValue.error.phone}</error-output>
                  </div>
                  <div className="row-content">
                      <label for="address" className="label-text">Address</label>
                      <textarea className="input text" name="address" id="address" style="height: 104px" value={formValue.address} onChange={changeValue} placeholder="your address.."></textarea>
                  </div>
                  <div className="select-item">
                      <div name="citySelect" id="citySelect" className="selectDiv">
                          <label for="city" className="label text">City</label>
                          <select onChange={changeValue} name="city" id="city">
                                <option value="">Select City</option>
                                <option value="Visakhapatnam">Visakhapatnam</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Pune">Pune</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Bangalore">Bangalore</option>
                          </select>
                      </div>
                      <div name="stateSelect" id="stateSelect" className="selectDiv">
                          <label for="state" className="label text">State</label>
                          <select onChange={changeValue} name="state" id="state">
                                <option value="">Select State</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="TamilNadu">TamilNadu</option>
                                <option value="Karnataka">Karnataka</option>
                          </select>
                      </div>
                      <div name="zip" id="zip">
                          <label for="zip" className="label-text">Zip Code</label>
                          <input className="input" type="tel" id="zip" name="zip" value={formValue.zip} onChange={changeValue} required></input>
                      </div>
                  </div>
                  <div className="buttonParent">
                      <div className="submit-reset">
                          <button type="submit" className="button submitButton" onClick={save}>Add</button>
                          <button type="reset" className="resetButton button" onClick={reset}>Reset</button>
                      </div>
                  </div>
              </form>
          </div>
      </div>
    )
  }
  export default withRouter(AddressBookForm);