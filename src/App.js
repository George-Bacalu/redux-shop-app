import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

const App = () => {
  const isCartShown = useSelector(state => state.uiReducer.cartIsVisible);
  const cart = useSelector(state => state.cartReducer);

  // useEffect(() => fetch("https://http-requests-ebdd0-default-rtdb.firebaseio.com/cart.json", { method: "PUT", body: JSON.stringify(cart) }), [cart]);

  return (
    <Layout>
      {isCartShown && <Cart />}
      <Products />
    </Layout>
  );
};

export default App;
