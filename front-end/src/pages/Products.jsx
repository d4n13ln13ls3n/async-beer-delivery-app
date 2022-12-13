import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductsCard from '../components/ProductsCard';
import CartContext from '../context/CartContext';
import { getAllProducts } from '../services/endPointRequest';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState('0,00');
  const { cart } = useContext(CartContext);

  const history = useHistory();

  async function fetchProducts() {
    const data = await getAllProducts('products');
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function formatTotalPrice(total) {
    const totalPriceString = total.toFixed(2);
    return totalPriceString.replace('.', ',');
  }

  useEffect(() => {
    const total = cart.reduce((acc, cartItem) => {
      const floatPrice = parseFloat(cartItem.price);
      acc += floatPrice * cartItem.quantity;
      return acc;
    }, 0);

    const totalFormated = formatTotalPrice(total);

    setTotalPrice(totalFormated);
  }, [cart]);

  function handleClick() {
    history.push('/customer/checkout');
  }

  return (
    <>
      <Navbar />
      {products?.map(({ id, name, price, urlImage }) => (
        <ProductsCard
          key={ String(id) }
          id={ String(id) }
          price={ price }
          productName={ name }
          urlImage={ urlImage }
          product={ { id, name, price } }
        />
      ))}
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ handleClick }
        disabled={ !cart.length }
      >
        Ver carrinho: R$
        <span data-testid="customer_products__checkout-bottom-value">
          {totalPrice}
        </span>
      </button>
    </>
  );
}
