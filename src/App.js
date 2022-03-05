import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/cart-slice";

let isInitialRender = true;

const App = () => {
  const dispatch = useDispatch();
  const isCartShown = useSelector(state => state.uiReducer.cartIsVisible);
  const notification = useSelector(state => state.uiReducer.notification);
  const cart = useSelector(state => state.cartReducer);

  useEffect(() => {
    if (isInitialRender) {
      isInitialRender = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {isCartShown && <Cart />}
        <Products />
      </Layout>
    </>
  );
};

export default App;
