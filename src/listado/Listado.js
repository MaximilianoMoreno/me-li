import React, {Component} from 'react';
import queryString from 'query-string'
import './listado.css';
import Item from './item/Item';
import Loading from "../loading/Loading";

class Listado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: []
    }
  }
  
  componentDidMount() {
    const {search} = this.props.location;
    const query = queryString.parse(search);
    
    fetch(`/api/items?q=${query.search}`)
        .then(results => {
          return results.json();
        }).then(data => {
      let products = data.items.map((prod) => {
        return (
            <Item key={prod.id}
                  item={prod}
            />
        );
      });
      
      this.setState({products: products});
      
      let categories = data.categories ? data.categories.map((cat) => {
        return (
            <li key={cat}>
              <a href="#">{cat}</a>
            </li>
        );
      }) : (null);
      
      this.setState({categories: categories});
    });
  }
  
  
  render() {
    return this.state.products.length ? (
        <div className="offset-by-one list-container ten columns ">
          <ul className="columns breadcrumbs"> {this.state.categories} </ul>
          <div className="nine columns resultsContainer">
            {this.state.products}
          </div>
        </div>
    ) : (
        <Loading />
        );
  }
}


export default Listado;