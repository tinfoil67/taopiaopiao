import React, { Component } from 'react'
import './App.css'

import Movies from './containers/Movies'
import Cinemas from './containers/Cinemas'
import Profile from './containers/Profile'

import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="content">
            <Route path="/movies" render={(conf) => <Movies match={conf.match} />} />
            <Route path="/cinemas" render={(conf) => <Cinemas match={conf.match} />} />
            <Route path="/profile" render={(conf) => <Profile match={conf.match} />} />
          </div>
          <div className="bottom-bar">
            <ul>
              <li>
                <NavLink to="/movies">
                  <span className="icon-movies"></span>
                  <span>热映</span>
                </NavLink>
              </li>
              <li><NavLink to="/cinemas">
                  <span className="icon-cinemas"></span>
                  <span>影院</span>
                </NavLink>
              </li>
              <li><NavLink to="/profile">
                  <span className="icon-profile"></span>
                  <span>我的</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
