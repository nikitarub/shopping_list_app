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
import FavoriteList from './components/pages/favoriteList'
import HistoryList from './components/pages/historyList'
import ListOfList from './components/pages/listOfList'
import Share from './components/pages/share'
import Start from './components/pages/startScreen'

export default function App() {
  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route path="/history">
              <HistoryList />
            </Route>
            <Route path="/lists">
              <ListOfList />
            </Route>
            <Route path="/share">
              <Share />
            </Route>
            <Route path="/favorites">
              <FavoriteList />
            </Route>
            <Route path="/start">
              <Start />
            </Route>
            <Route path="/">
              <CurrentList />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
    
  );
}
