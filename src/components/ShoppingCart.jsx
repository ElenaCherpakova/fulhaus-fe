import React from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import CartItem from './CartItem';
import { formatCurrency } from '../utilities/formatCurrency';

function ShoppingCart({ isOpen }) {
  const { closeCart, cartItems, products } = useShoppingCart();

  // close cart when clicking outside of the cart
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      closeCart();
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div
      onClick={handleBackgroundClick}
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 ${
        isOpen ? '' : 'hidden'
      }`}>
      <div className='fixed inset-y-0 right-0 w-100 bg-white shadow-lg xsm:max-w-xs'>
        <div className='p-2 font-bold text-lg bg-gray-100'>MY ORDER</div>
        <div className='p-4 flex flex-col space-y-1 flex-1 overflow-y-scroll'>
          {cartItems.map((item) => (
            <CartItem key={item._id} {...item} />
          ))}
          <div className='ml-auto text-lg font-bold'>
            Total{' '}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = products.find(
                  (product) => product._id === cartItem._id,
                );
                return total + (item?.retailPrice || 0) * cartItem.quantity;
              }, 0),
            )}
          </div>
        </div>
        <div className='p-4 border-t border-gray-200'>
          <button className='w-full bg-gray-800 text-white py-2 rounded-md'>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
