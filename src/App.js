import React, { Component } from 'react';
import Search from './Search/Search';
import Recipes from './Recipes/Recipes';
import { Route } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>la cocina</h2>
          <Search />
          <Route exact path="/" component={Recipes} />
        </header>
      </div>
    );
  }
}

export default App;
