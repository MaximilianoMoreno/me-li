import React, {Component} from 'react';
import './header.css';
import searchIcon from './../images/search.png';
import mercadoLibre from './../images/mercado-libre.png';
import constants from './../constants/constants'

class Header extends Component {
  
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  
  render() {
    return (
        <header className="header">
          <div className="encabezado row">
            <div className="one column"></div>
            <div className="offset-by-one logo one column ">
              <img src={mercadoLibre} alt=""/>
            </div>
            <div className="buscador nine columns row alpha">
              <form className="buscar columns" onSubmit={this.handleFormSubmit}>
                <input className="eleven half columns" type="text" placeholder={constants.LITERALS.SEARCH_PLACEHOLDER}
                       name="search" onChange={this.handleChange}/>
                <button type="submit" className="half column alpha search"><img src={searchIcon} className="search"
                                                                                alt=""/></button>
              </form>
            </div>
            <div className="one column"></div>
          </div>
        </header>
    );
  }
  
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleFormSubmit(e) {
    e.preventDefault();
    window.location = '/items/?search=' + this.state.search;
  }
  
}

export default Header;
