import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/homepage';
import InputSubreddit from './components/InputSubreddit/inputSubreddit';


export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:subreddit/:count?" component={Homepage} />
        <Route from="/" component={InputSubreddit}/>
      </Switch>
    </BrowserRouter>
  );
}
