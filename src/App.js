import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './containers/Home';
import Genre from './containers/Genre';
import MovieDetail from './containers/MovieDetail';
import MovieBasedOnGenre from './containers/MovieBasedOnGenre';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/movie/:id" component={MovieDetail} />
          <Route path="/genre/:name" component={MovieBasedOnGenre} />
          <Route path="/genre" component={Genre} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
