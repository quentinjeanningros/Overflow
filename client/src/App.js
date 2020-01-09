import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Admin from './pages/admin/Admin'
import Events from './pages/events/Events'
import Files from "./pages/admin/files/Files";
import Home from './pages/home/Home'
import Login from "./pages/login/Login";
import Partnership from './pages/partnership/Partnership'
import './App.css'
import './config.css'

function renderAuth(auth, component) {
    return () => {
        if (auth && localStorage.getItem('token')) {
            return component;
        } else if (!auth && !localStorage.getItem('token')) {
            return component;
        } else if (!auth && localStorage.getItem('token')) {
            return <Redirect to="/admin"/>;
        } else {
            return <Redirect to="/login"/>;
        }
    }
}

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/partnership" component={Partnership}/>
          <Route exact path="/events" component={Events}/>

          <Route exact path="/login" render={renderAuth(false, <Login/>)}/>

          <Route exact path="/admin" render={renderAuth(true, <Admin/>)}/>
          <Route exact path="/admin/contacts" render={renderAuth(true, <Admin/>)}/>
          <Route exact path="/admin/events" render={renderAuth(true, <Admin/>)}/>
          <Route exact path="/admin/partnership" render={renderAuth(true, <Admin/>)}/>
          <Route exact path="/admin/files" render={renderAuth(true, <Files/>)}/>

          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
