import React from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import styles from './Navbar.module.css';
import { useShoppingCart } from '../context/ShoppingCartContext';

function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <>
      {cartQuantity > 0 && (
        <button onClick={openCart} className={styles.shopCardIcon}>
          <HiOutlineShoppingBag />
          <div className={styles.itemsNumber}>{cartQuantity}</div>
        </button>
      )}
    </>
  );
}

export default Navbar;
