import React, {Component} from 'react';
import './detalle.css';
import Header from "../header/Header";
import Loading from "../loading/Loading";
import constants from './../constants/constants'
import NumberFormat from "react-number-format";

class Detalle extends Component {
  constructor() {
    super();
    this.state = {
      product: undefined
    }
  };
  
  render() {
    return this.state.product ? (
      <div className="detail-page">
        <Header/>
        <div className="one column"></div>
        <div className="offset-by-one ten columns item-detail">
          <div className="offset-by-one four columns img-container">
            <img src={this.state.product.pictures[0].url} alt=""/>
          </div>
          <div className="offset-by-two five columns detail-container">
            <div className="columns top-description">
              <div> {constants.CONDITION[this.state.product.condition.toUpperCase()]} - {this.state.product.sold_quantity} {constants.LITERALS.VENDIDOS}</div>
            </div>
            <div className="alpha four columns title">
              <h2>{this.state.product.item.title}</h2>
              <div className="price"><NumberFormat value={this.state.product.item.price.amount} displayType={'text'}
                                                   thousandSeparator={'.'} decimalSeparator={','}
                                                   prefix={constants.CURRENCY[this.state.product.item.price.currency]}/>
              </div>
              
              <button type="submit" className="alpha nine columns">{constants.LITERALS.COMPRAR}</button>
            </div>
          
          </div>
          <div className="columns description-container">
            <h2>Descripcion del producto</h2>
            <pre className="alpha seven columns description">
              {this.state.product.description}
            </pre>
          </div>
          <div className="one column"></div>
        </div>
      </div>
    ) : (
        <div className="App">
          <Header/>
          <Loading/>
        </div>
    
    );
  }
  
  componentDidMount() {
    const {id} = this.props.match.params;
    
    fetch(`/api/items/${id}`)
        .then(results => {
          return results.json();
        }).then(data => {
      this.setState({product: data})
    })
  }
}

export default Detalle;
