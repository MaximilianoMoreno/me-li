import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Home from "./../home/Home";
import Detalle from "./../detalle/Detalle";
import Resultado from "./../resultado/Resultado";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }
  
  render() {
    return (
        <Router>
          <div>
            <Route exact path='/' component={Home}/>
            <Route exact path="/items" component={Resultado}/>
            <Route exact path="/items/:id" component={Detalle}/>
          </div>
        </Router>
    );
  }
}

export default App;
