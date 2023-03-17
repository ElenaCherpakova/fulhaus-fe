import React from 'react';
import { formatCurrency } from '../utilities/formatCurrency';
import { MdAddShoppingCart } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import styles from './StoreItem.module.css';
import { FaStar } from 'react-icons/fa';

import { useShoppingCart } from '../context/ShoppingCartContext';

function StoreItem({
  _id,
  fulhausCategory,
  fulhausProductName,
  imageURLs,
  retailPrice,
}) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(_id);

  return (
    <>
      <img
        src={imageURLs[0]}
        alt={fulhausProductName}
        style={{
          backgroundSize: 'cover',
          objectFit: 'fill',
          width: '80%',
          height: '80%',
        }}
      />
      <p>{fulhausCategory.name}</p>
      <div className={styles.starRating}>
        {[...Array(5)].map((_, index) => {
          return <FaStar key={index} />;
        })}
      </div>
      <div className={styles.productShopping}>
        <span className={styles.productPrice}>
          {formatCurrency(retailPrice)}
        </span>
        {quantity === 0 ? (
          <button
            onClick={() => increaseCartQuantity(_id)}
            className={styles.shoppingCard}>
            <MdAddShoppingCart />
          </button>
        ) : (
          <div className={styles.addRemove}>
            <div className={styles.plusMinus}>
              <button
                className={styles.addRemoveButton}
                onClick={() => decreaseCartQuantity(_id)}>
                -
              </button>
              <span className={styles.quantity}>{quantity}</span>
              <button
                onClick={() => increaseCartQuantity(_id)}
                className={styles.addRemoveButton}>
                +
              </button>
              <button
                className={styles.remove}
                onClick={() => removeFromCart(_id)}>
                <BiTrash />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default StoreItem;
