import { useContext, createContext, useState, useEffect } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import axios from 'axios';
import Swal from 'sweetalert2';


const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        '  https://fh-api-dev.herokuapp.com/api/products-service/products/website/CAD?page=0&limit=6',
      );
      const productsWithStockQty = response.data.data.products.map(
        (product) => ({
          ...product,
          stockQty: product.stockQty,
        }),
      );
      setProducts(productsWithStockQty);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  function getItemQuantity(id) {
    return cartItems.find((item) => item._id === id)?.quantity || 0;
  }

  // Increase quantity of a given item in the cart. If the item is not in the cart and there is stock available, add it to the cart with qty of 1, otherwise if the item is the in the cart increment its by +1 and in case if the item is not in the stock show an error message and don't modify the cart.
  function increaseCartQuantity(id) {
    setCartItems((currItems) => {
      const existItem = currItems.find((item) => item._id === id);
      const product = products.find((product) => product._id === id);
      if (existItem) {
        if (existItem.quantity < product.stockQty) {
          return currItems.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Sorry!',
            text: `There is only ${product.stockQty} items available.`,
            footer: '<a href="https://fulhaus.com/contact-us">Contact us to pre-order it!</a>'
          })
          return currItems;
        }
      } else {
        return [...currItems, { _id: id, quantity: 1 }];
      }
    });
  }

  function decreaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id === id)?.quantity === 1) {
        return currItems.filter((item) => item._id !== id);
      } else {
        return currItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item,
        );
      }
    });
  }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  );
  function removeFromCart(id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item._id !== id);
    });
  }

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  
  return (
    <ShoppingCartContext.Provider
      value={{
        products,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
