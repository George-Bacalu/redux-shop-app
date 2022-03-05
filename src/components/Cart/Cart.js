import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = () => {
  const cartItems = useSelector(state => state.cartReducer.items);

  const totalPrice = cartItems.reduce((currNumber, item) => currNumber + item.totalPrice, 0);

  let content = (
    <ul>
      {cartItems.map(item => (
        <CartItem key={item.id} item={{ id: item.id, title: item.title, price: item.price, quantity: item.quantity, total: item.totalPrice }} />
      ))}
    </ul>
  );
  if (cartItems.length === 0) content = <p>You have no items in your cart!</p>;

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {content}
      <h1 className={classes.total}>Total: ${totalPrice.toFixed(2)}</h1>
    </Card>
  );
};

export default Cart;
