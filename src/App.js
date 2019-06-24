import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
// import Search from './Search/Search';
import Navigation from './Navigation/Navigation';
// import Auth from './Auth/Auth';
// import Authenticating from './Auth/Authenticating';
import './App.css';


class App extends Component {
  
  render() {
    const id = localStorage.getItem('userId');
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          
          <Navigation id={id} login={this.props.auth.login} logout={this.props.auth.logout} isAuthenticated={this.props.auth.isAuthenticated} />

        </header>
      </div>
    );
  }
}

export default App;
