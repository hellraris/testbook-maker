import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import testManager from './components/manager/Testbook'
import viewer from './components/viewer/TestSelector'
import testViewer from './components/viewer/TestViewer'
import testComplete from './components/viewer/TestComplete'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/viewer' component={viewer}/>
        <Route exact path='/viewer/:id' component={testViewer} />
        <Route exact path='/complete' component={testComplete} />
        <Route exact path='/manager' component={testManager} />
      </div>
    );
  }
}

export default App;
