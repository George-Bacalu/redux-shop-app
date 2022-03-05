import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitialRender = true;

const App = () => {
  const dispatch = useDispatch();
  const isCartShown = useSelector(state => state.uiReducer.cartIsVisible);
  const notification = useSelector(state => state.uiReducer.notification);
  const cart = useSelector(state => state.cartReducer);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({ status: "pending", title: "Sending...", message: "Sending cart data..." }));
      const response = await fetch("https://http-requests-ebdd0-default-rtdb.firebaseio.com/cart.json", { method: "PUT", body: JSON.stringify(cart) });
      if (!response.ok) throw new Error("Sending cart data failed!");
      dispatch(uiActions.showNotification({ status: "success", title: "Success!", message: "Cart data sent successfully!" }));
    };
    if (isInitialRender) {
      isInitialRender = false;
      return;
    }
    sendCartData().catch(err => dispatch(uiActions.showNotification({ status: "error", title: "Error!", message: "Sending cart data failed!" })));
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
