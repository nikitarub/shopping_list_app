import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import CurrentList from './components/pages/currentList'
import HistoryList from './components/pages/historyList'


export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/history">
            <HistoryList />
          </Route>
          <Route path="/">
            <CurrentList />
          </Route>
        </Switch>


        <div className={"bottom-nav"}>
          <ul>
            <li>
              <Link to="/">Current List</Link>
            </li>
            <li>
              <Link to="/history">History</Link>
            </li>
          </ul>
        </div>
      </div>
    </Router>
  );
}
