import React from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';

import StoreItem from './StoreItem';
import styles from './Store.module.css';

const Store = () => {
  const { products } = useShoppingCart();

  return (
    <div className={styles.cardWrapper}>
      {products.map((item) => (
        <div className={styles.card} key={item._id}>
          <div className={styles.topDetails}>
            <StoreItem {...item} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Store;
