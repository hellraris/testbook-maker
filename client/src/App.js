import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopPage from './components/manager/TopPage'
import './App.css';

class App extends Component {
  render() {
    return (
        <div style={{backgroundColor: 'steelblue'}} className="App">
          <TopPage/>
        </div>
    );
  }
}

export default App;
