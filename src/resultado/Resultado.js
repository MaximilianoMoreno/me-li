import React, { Component } from 'react';
import './resultado.css';
import Header from "../header/Header";
import Listado from "../listado/Listado";

class Resultado extends Component {
  
  render() {
    return (
        <div className="App">
          <Header/>
          <Listado {...this.props}/>
        </div>
    );
  }
}

export default Resultado;
