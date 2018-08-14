import React, {Component} from 'react';
import './item.css';
import shipping from './../../images/ic_shipping.png';
import NumberFormat from 'react-number-format';
import constants from "../../constants/constants";

class Item extends Component {
  render() {
    let freeShipping;
    
    if (this.props.item.free_shipping)
      freeShipping = <img className="free-shipping" src={shipping} alt=""/>;
    
    return (
        <a className="alpha columns" href={'/items/' + this.props.item.id}>
          <div className="item-detail">
            <div className="two columns img-container">
              <img src={this.props.item.picture} alt=""/>
            </div>
            <div className="alpha nine columns detail-container">
              <div className="top-container columns">
                <div className="offset-by-one price three columns"><NumberFormat value={this.props.item.price.amount}
                                                                                 displayType={'text'}
                                                                                 thousandSeparator={'.'}
                                                                                 decimalSeparator={','}
                                                                                 prefix={constants.CURRENCY[this.props.item.price.currency]}/>
                  {freeShipping}
                </div>
                
                
                <div className="offset-by-seven two columns location">{this.props.item.address.state_name}</div>
              </div>
              
              
              <div className="offset-by-one six columns description">{this.props.item.title}</div>
            </div>
          </div>
          <hr className="columns"/>
        </a>
    );
  }
  
}

export default Item;