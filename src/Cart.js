import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Input from "./Input.js";
import Button from "./Button.js";
import { Link } from "react-router-dom";


export default function Cart(props) {
  const {cart, onProductDelete} = props
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const [email, setEmail] = useState("");

    

  return (
    <div className="cart-layout">
      <div>
        <h1>Your Cart</h1>
        {cart.length === 0 && (
          <div>
            <p>You have not added any products to your cart yet.</p>
            <Link to="/products" className="btn btn-default">
            Start shopping
            </Link>
          </div>
        )}
        {cart.length > 0 && (
          <>
            <table className="table table-cart">
              <thead>
                <tr>
                  <th width="25%" className="th-product">
                    Product
                  </th>
                  <th width="20%">Unit price</th>
                  <th width="10%">Quanity</th>
                  <th width="25%">Total</th>
                  <th width="25%"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>
                      <Link to={"/products/"+product.id}>
                        <img
                          src={product.image}
                          width="30"
                          height="30"
                          alt=""
                        />{" "}
                        </Link>
                        {product.name}
                      </td>
                      <td>${product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <strong>${product.price * product.quantity}</strong>
                      </td>
                      <td>
                        <Button
                        outline
                        className="product-delete"
                        onClick={()=>onProductDelete(product.id)}
                        >
                        x
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="3"></th>
                  <th className="cart-highlight">Total</th>
                  <th className="cart-highlight">${totalPrice}</th>
                </tr>
              </tfoot>
            </table>
            <form className="pay-form" >
              <p>
                Enter your email and then click on pay and your products will be
                delivered to you on the same day!
                <br />
              </p>
              <Input
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
                required
              />
              <Button type="submit">Pay</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
