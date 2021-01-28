import './App.css';
import React from 'react';

import AddressBookForm from './components/addressform/AddressForm';

import { BrowserRouter as Router, Route} from "react-router-dom";

class AppRouter extends React.Component {
    render () {
      return (
        <div className="app-main">
          <Router>
            <div className="App">
              <Route path="/AddressForm" component={AddressBookForm}></Route>
            </div>
          </Router>
        </div>
      );
    }
  }
  export default AppRouter;