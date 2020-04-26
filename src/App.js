import React from 'react';
import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Index from "./Component/welcome/index";

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Index} />
        </Switch>
      </Router>
  );
}

export default App;
