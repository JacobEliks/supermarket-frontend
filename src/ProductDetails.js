import { useState, useEffect } from "react";
import { NavLink, useParams, Outlet, Link } from "react-router-dom";
import axios from "axios";
import Button from "./Button.js";


export default function ProductDetails(props) {
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/products/${params.id}`)
    .then(response => setProduct(response.data))
    .catch(error => console.error(error));
  },[params.id]);

  return (
    <div className="product-details-layout">
      <div style={{width: "10rem"}}>
        <h2>{product.name}</h2>
        <img
          src={product.image}
          width="125"
          height="125"
          className="product-details-image"
          alt={product.name}
        />
        <Link to="/products" style={{position: "relative", top: "2rem"}}>
        <Button>Go Back</Button>
        </Link>
      </div>
      
      
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "tab-active" : "")}
                to=""
                end
              >
                Details
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "tab-active" : "")}
                to="nutrition"
              >
                Nutrition
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "tab-active" : "")}
                to="storage"
              >
                Storage
              </NavLink>
            </li>
          </ul>
        </div>

        <Outlet context={product} />
      </div>
    </div>
  );
}
