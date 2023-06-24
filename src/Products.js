import { useState, useEffect } from "react";
import Product from "./Product.js";
import Loader from "./Loader.js";
import axios from "axios"

export default function Products(props) {
  const [products, setProducts] = useState([]);
  
  
  useEffect(() => {
    axios.get('https://ancient-fjord-25583-f22bd3bad56f.herokuapp.com/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="products-layout">
      <h1>Products</h1>
      <p>Take a look at our products</p>
      <div className="products-grid">
        {products.length===0 ? <Loader /> : null}
        {products.map((product) => {
          return (
            <Product
              key={product.id}
              details={product}
              cart={props.cart}
              onProductAdd={props.onProductAdd}
              onProductDelete={props.onProductDelete}
            ></Product>
          );
        })}
      </div>
    </div>
  );
}
