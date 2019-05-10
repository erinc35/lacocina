import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Search from './Search/Search';
import Auth from './Auth/Auth';
import Authenticating from './Auth/Authenticating';
import './App.css';

// Create new Auth session
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
  
  render() {
    const id = localStorage.getItem('userId');

    return (
      <div className="App">
        <header className="App-header">
          <Search id={id} login={auth.login} logout={auth.logout} isAuthenticated={auth.isAuthenticated}/>
          {/* <Route exact path="/" component={Recipe} /> */}
          <Route exact path="/authenticating" render={(props) => {
            handleAuthentication(props);
            return <Authenticating {...props} />
          }} />
        </header>
      </div>
    );
  }
}

export default App;
