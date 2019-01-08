import React, { Component } from 'react';
import Search from './Search/Search';
import Recipe from './Recipe/Recipe';
import { Route } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Search />
          {/* <Route exact path="/" component={Recipe} /> */}
        </header>
      </div>
    );
  }
}

export default App;
