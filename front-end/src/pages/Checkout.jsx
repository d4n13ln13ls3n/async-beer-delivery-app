/* eslint-disable react/jsx-max-depth */
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Navbar from '../components/Navbar';
import CartContext from '../context/CartContext';
import { getData, postData } from '../services/endPointRequest';
import { readStorage } from '../services/localStorageServices';
import '../styles/Checkout.css';

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sellersName, setSellersName] = useState([]);
  const [input, setInput] = useState({
    sellerId: '',
    delAddress: '',
    delNumber: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();
  const customerElement = 'customer_checkout__element-order-table';
  const customerCheckout = 'customer_checkout__';

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

    setTotalPrice(total);
  }, [cart]);

  const getSellers = async () => {
    const token = readStorage('token');
    const sellers = await getData('/users/sellers', token);
    setSellersName(sellers);
  };

  useEffect(() => {
    getSellers();
  }, []);

  const handleInput = ({ target }) => {
    setInput({ ...input, [target.name]: target.value });
  };

  const handleDelete = (id) => {
    const thisProducts = cart.filter((elem) => elem.id !== id);
    setCart(thisProducts);
  };

  const handleAccess = async () => {
    const { sellerId, delAddress, delNumber } = input;

    const order = {
      sellerId: Number(sellerId),
      totPrice: Number(totalPrice.toFixed(2)),
      delAddress,
      delNumber,
      products: cart.map((cartItem) => ({
        name: cartItem.name,
        quantity: cartItem.quantity,
      })),
    };

    const token = readStorage('token');

    try {
      const { newSaleId } = await postData('/sales', order, token);
      history.push(`/customer/orders/${newSaleId}`);
    } catch ({ response }) {
      const {
        data: { message },
      } = response;
      setErrorMessage(message);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="checkoutContainer">
        <h3 className="checkoutTitle">Finalizar Pedido</h3>
        <Container className="border checkoutDetails">
          <Table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Sub-total</th>
                <th>Remover Item</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((pro, index) => (
                <tr key={ pro.id } className="itemLine">
                  <td
                    data-testid={ `${customerElement}-item-number-${index}` }
                    className="numberTable rounded-start"
                  >
                    {index + 1}
                  </td>
                  <td
                    data-testid={ `${customerElement}-name-${index}` }
                    className="descriptionTable"
                  >
                    {pro.name}
                  </td>
                  <td
                    data-testid={ `${customerElement}-quantity-${index}` }
                    className="quantityTable"
                  >
                    {pro.quantity}
                  </td>
                  <td
                    data-testid={ `${customerElement}-unit-price-${index}` }
                    className="valueItem"
                  >
                    {Number(pro.price).toFixed(2).replace('.', ',')}
                  </td>
                  <td
                    data-testid={ `${customerElement}-sub-total-${index}` }
                    className="partialValue"
                  >
                    {(Number(pro.price) * Number(pro.quantity))
                      .toFixed(2)
                      .replace('.', ',')}
                  </td>
                  <td
                    data-testid={ `${customerElement}-remove-${index}` }
                    className="removeItemTable rounded-end"
                  >
                    <button
                      type="button"
                      onClick={ () => handleDelete(pro.id) }
                      className="btn btn-success removeItemTable"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="totalCheckout">
            <h3
              data-testid={ `${customerCheckout}element-order-total-price` }
            >
              {`Total R$: ${formatTotalPrice(totalPrice)}`}
            </h3>
          </div>
        </Container>
        <h3 className="checkoutTitle">Detalhes e Endereço para Entrega</h3>
        <Container className="border deliveryContainer">
          <Table className="deliveryInfoTable">
            <thead>
              <tr>
                <th>P.Vendedora Responsável</th>
                <th> Endereço</th>
                <th>Número</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select
                    name="sellerId"
                    onChange={ handleInput }
                    defaultValue=""
                    className="shadow mb-1 bg-body rounded"
                    data-testid={ `${customerCheckout}select-seller` }
                  >
                    <option value=""> </option>
                    {sellersName.map(({ id, name }, index) => (
                      <option key={ index } value={ id }>
                        {name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    name="delAddress"
                    data-testid={ `${customerCheckout}input-address` }
                    onChange={ handleInput }
                    value={ input.delAddress }
                    className="shadow mb-1 bg-body rounded"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="delNumber"
                    data-testid={ `${customerCheckout}input-address-number` }
                    onChange={ handleInput }
                    value={ input.delNumber }
                    className="shadow mb-1 bg-body rounded"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="d-flex justify-content-center">
            <button
              className="finish-button"
              type="button"
              data-testid={ `${customerCheckout}button-submit-order` }
              onClick={ handleAccess }
            >
              FINALIZAR PEDIDO
            </button>
          </div>
        </Container>
      </Container>
      {errorMessage && <h5>{errorMessage}</h5>}
    </>
  );
}
