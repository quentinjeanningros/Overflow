import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Events from './pages/events/Events'
import Home from './pages/home/Home'
import Partnership from './pages/partnership/Partnership'
import './App.css'
import './config.css'


function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/partnership" component={Partnership}/>
          <Route exact path="/events" component={Events}/>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
