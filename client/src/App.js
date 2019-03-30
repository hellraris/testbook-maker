import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import testManager from './components/manager/Testbook'
import viewer from './components/viewer/TestSelector'
import testViewer from './components/viewer/TestViewer'
import './App.css';

class App extends Component {
  render() {
    return (
      <div class="App">
        <Route exact path='/viewer' component={viewer}/>
        <Route path='/viewer/:id' component={testViewer} />
        <Route path='/manager' component={testManager} />
      </div>
    );
  }
}

export default App;
