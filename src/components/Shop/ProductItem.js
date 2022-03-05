import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = props => {
  const dispatch = useDispatch();
  // const cart = useSelector(state => state.cartReducer);
  const { id, title, price, description } = props;

  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart({ id, title, price }));
    /*
    const newTotalQuantity = cart.totalQuantity + 1;
    const updatedItems = cart.items.slice(); // create copy via slice to avoid mutating the original state
    const existingItem = updatedItems.find(item => item.id === id);
    if (existingItem) {
      const updatedItem = { ...existingItem }; // new object + copy existing properties to avoid state mutation
      updatedItem.quantity++;
      updatedItem.totalPrice += price;
      const existingItemIndex = updatedItems.findIndex(item => item.id === id);
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ id, title, price, quantity: 1, totalPrice: price });
    }
    const newCart = { totalQuantity: newTotalQuantity, items: updatedItems };
    dispatch(cartActions.replaceCart(newCart));
    */

    // and then send HTTP request
    // fetch("https://http-requests-ebdd0-default-rtdb.firebaseio.com/cart.json", { method: "PUT", body: JSON.stringify(newCart) });
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
