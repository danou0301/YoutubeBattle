import React from 'react';
import logo from './logo.svg';
import { Route, Switch} from 'react-router-dom';
import HomePage from './HomePage'
import AddPage from './AddPage'


import './App.css';

function App() {
  return (
    <div className="App">
        <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/Add" exact component={AddPage}/>

        </Switch>
    </div>
  );
}

export default App;
