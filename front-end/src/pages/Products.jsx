import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from '../components/Navbar';
import ProductsCard from '../components/ProductsCard';
import CartContext from '../context/CartContext';
import { getAllProducts } from '../services/endPointRequest';
import '../styles/Products.css';

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

  const handleClick = () => {
    history.push('/customer/checkout');
  };

  return (
    <>
      <Navbar />
      <Container className="products-page">
        <Container className="product-body">
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
        </Container>
      </Container>
      <Container className="sticky-bottom container-cart-button">
        <Button
          variant="success"
          className="button-cart"
          size="lg"
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ handleClick }
          disabled={ !cart.length }
        >
          Ver carrinho: R$
          <span data-testid="customer_products__checkout-bottom-value">
            {totalPrice}
          </span>
        </Button>
      </Container>
    </>
  );
}
