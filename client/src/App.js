import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import testManager from './components/manager/Testbook'
import viewer from './components/viewer/TestSelector'
import testViewer from './components/viewer/TestViewer'
import testComplete from './components/viewer/TestComplete'
import TopPage from './components/manager/TopPage'
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Route exact path='/booklist' component={TopPage} />
        </div>
    );
  }
}

export default App;
