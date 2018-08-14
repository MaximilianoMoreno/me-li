import React, { Component } from 'react';
import './loading.css';
import constants from "../constants/constants";
import loading from "./../images/Loading_icon.gif"

class Loading extends Component {
  
  render() {
    return (
        <div className="columns loading">
          <span className="offset-by-one ten columns loading">{constants.LITERALS.CARGANDO}</span>
          <img className="offset-by-one ten columns" src={loading} alt=""/>
        </div>
    );
  }
}

export default Loading;
