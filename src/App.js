import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/homepage';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:subreddit/:count" component={Homepage} />
        <Redirect from="/" to="/oakland/0"/>
      </Switch>
    </BrowserRouter>
  );
}
