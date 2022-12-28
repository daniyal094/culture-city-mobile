import React, {createContext, useContext, useState} from 'react';
import { setAsyncStorage } from '../helper/functions';

const CartContext = createContext();
const CartUpdateContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const useCartUpdate = () => {
  return useContext(CartUpdateContext);
};

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState({
    organizerId : '',
    cartItems: [],
  });
  const updateUser = data => {
    setCart(data);
    setAsyncStorage('cartData', data);
  };
  return (
    <CartContext.Provider value={cart}>
      <CartUpdateContext.Provider value={updateUser}>
        {children}
      </CartUpdateContext.Provider>
    </CartContext.Provider>
  );
};
