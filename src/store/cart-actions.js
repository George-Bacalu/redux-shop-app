import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const sendCartData = cart => {
  return async dispatch => {
    dispatch(uiActions.showNotification({ status: "pending", title: "Sending...", message: "Sending cart data..." }));

    const sendRequest = async () => {
      const response = await fetch("https://http-requests-ebdd0-default-rtdb.firebaseio.com/cart.json", {
        method: "PUT",
        body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity }),
      });
      if (!response.ok) throw new Error("Sending cart data failed!");
    };

    try {
      await sendRequest();
      dispatch(uiActions.showNotification({ status: "success", title: "Success!", message: "Cart data sent successfully!" }));
    } catch (err) {
      dispatch(uiActions.showNotification({ status: "error", title: "Error!", message: "Sending cart data failed!" }));
    }
  };
};

export const fetchCartData = () => {
  return async dispatch => {
    const fetchRequest = async () => {
      const response = await fetch("https://http-requests-ebdd0-default-rtdb.firebaseio.com/cart.json");
      if (!response.ok) throw new Error("Couldn't fetch cart data!");
      const responseData = await response.json();
      return responseData;
    };

    try {
      const cartData = await fetchRequest();
      dispatch(cartActions.replaceCart({ items: cartData.items || [], totalQuantity: cartData.totalQuantity })); // replaceCart reducer replaces our frontend cart with the cart we are loading from firebase
    } catch (err) {
      dispatch(uiActions.showNotification({ status: "error", title: "Error!", message: "Fetching cart data failed!" }));
    }
  };
};
