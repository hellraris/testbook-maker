import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import testManager from './components/manager/Testbook'
import viewer from './components/viewer/testSelector'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path='/manager' component={testManager}/>
        <Route path='/' component={viewer}/>
      </BrowserRouter>
    );
  }
}

export default App;
