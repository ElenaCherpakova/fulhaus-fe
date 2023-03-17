import React from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';
import { CiSquareRemove } from 'react-icons/ci';

function CartItem({ _id, quantity }) {
  const { removeFromCart, products } = useShoppingCart();

  const item = products.find((product) => product._id === _id);

  if (item === 0) {
    return null;
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex items-center space-x-1'>
          <div className='w-15 h-20 bg-gray-200'></div>
          <img
            src={item.imageURLs[0]}
            alt={item.fulhausProductName}
            style={{ width: '125px', height: '115px', objectFit: 'cover' }}
          />
          <div className='flex flex-col'>
            <div className='text-gray-500 text-md sm:text-xs xsm:text-xs'>
              {item.fulhausProductName}
            </div>
            <div className='flex flex-col space-y-2'>
              <div className='font-bold text-gray-500 sm:text-xs xsm:text-xs'>
                {formatCurrency(item.retailPrice)}
              </div>
              <div className='text-gray-500 text-sm sm:text-xs xsm:text-xs'>Qt: {quantity}</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col-2'>
          <div className='font-bold text-gray-500 m-1 md:text-md sm:text-xs xsm:text-xs'>
            {formatCurrency(item.retailPrice * quantity)}
          </div>
          <button
            onClick={() => removeFromCart(item._id)}
            className='text-gray-500 md:text-md sm:text-sm xsm:text-sm'>
            <CiSquareRemove style={{ fontSize: '1.5rem' }} />
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
