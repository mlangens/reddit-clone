import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/homepage';
import DefaultPage from './components/defaultpage/defaultpage';


export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:subreddit/:count?" component={Homepage} />
        <Route from="/" component={DefaultPage}/>
      </Switch>
    </BrowserRouter>
  );
}
