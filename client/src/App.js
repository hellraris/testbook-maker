import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';

import TopPage from './components/TopPage'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <TopPage />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
