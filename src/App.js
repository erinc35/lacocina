import React, { Component } from 'react';
import Search from './Search/Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <h2>
            la cocina
          </h2>
          <Search />
        </header>
      </div>
    );
  }
}

export default App;
