import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signLogin } from '../services/endPointRequest';
import { SaveStorage, readStorage } from '../services/localStorageServices';

export default function Checkout() {
  const sellerName = 'Fulana Pereira';
  const history = useHistory();
  const customerElement = 'customer_checkout__element-order-table';
  const customerCheckout = 'customer_checkout__';
  const [addressNumber, setAddressNumber] = useState('');
  const [address, setAddress] = useState('');
  const [productsArray, setProductsArray] = useState([
    {
      id: 1,
      name: 'Skol Lata 250ml',
      quantity: 10,
      price: 2.2,
      url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      quantity: 2,
      price: 7.5,
      url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
    },
    {
      id: 3,
      name: 'Antarctica Pilsen 300ml',
      quantity: 5,
      price: 2.49,
      url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
    },
  ]);

  const handleDelete = (id) => {
    const thisProducts = productsArray.filter((elem) => elem.id !== id);
    setProductsArray(thisProducts);
  };

  function somarTudo(total, item) {
    return total + (item.price * item.quantity);
  }

  const totalPrice = productsArray.reduce(somarTudo, 0).toFixed(2);

  const productsFields = {
    sellerName,
    totPrice: totalPrice,
    delAddress: address,
    delNumber: addressNumber,
    products: productsArray,
  };
  const handleAccess = async () => {
    const responseProducts = await signLogin('sales', productsFields);
    const { newSaleId } = responseProducts;
    SaveStorage('products', productsFields);
    readStorage('token');
    history.push(`/customer/orders/${newSaleId}`);
  };
  return (
    <>
      <thead>
        <h3>Finalizar Pedido</h3>
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
        {productsArray.map((pro) => (
          <tr key={ pro.id }>
            <td
              data-
              testid={ `${customerElement}-item-number-${pro.id}` }
            >
              {pro.id}
            </td>
            <td
              data-testid={ `${customerElement}-name-${pro.id}` }
            >
              {pro.name}
            </td>
            <td
              data-testid={ `${customerElement}-quantity-${pro.id}` }
            >
              {pro.quantity}
            </td>
            <td
              data-
              testid={ `${customerElement}-unit-price-${pro.id}` }
            >
              {Number(pro.price).toFixed(2)}
            </td>
            <td
              data-testid={ `${customerElement}-sub-total-${pro.id}` }
            >
              {(Number(pro.price) * Number(pro.quantity)).toFixed(2)}
            </td>
            <td
              data-testid={ `${customerElement}-remove-${pro.id}` }
            >
              <button
                type="button"
                onClick={ () => handleDelete(pro.id) }
              >
                Remover
              </button>
            </td>
          </tr>
        ))}
        <h3
          data-testid={ `${customerCheckout}element-order-total-price` }
        >
          {totalPrice}
        </h3>
      </tbody>
      <h3>Detalhes e Endereço para Entrega</h3>
      <tbody>
        <tr>
          <th>P.Vendedora Responsável</th>
          <th> Endereço</th>
          <th>Número</th>
        </tr>
        <tr>
          <select data-testid="customer_checkout__select-seller">
            <option>
              { sellerName }
            </option>
          </select>
          <td>
            <input
              type="text"
              data-testid={ `${customerCheckout}customer_checkout__input-address` }
              onChange={ ({ target }) => { setAddress(target.value); } }
              value={ address }
            />
          </td>
          <td>
            <input
              type="text"
              data-testid={ `${customerCheckout}input-address-number` }
              onChange={ ({ target }) => { setAddressNumber(target.value); } }
              value={ addressNumber }

            />
          </td>
        </tr>
      </tbody>
      <button
        type="button"
        data-testid={ `${customerCheckout}button-submit-order` }
        onClick={ handleAccess }
      >
        Finalizar Pedido
      </button>
    </>
  );
}
