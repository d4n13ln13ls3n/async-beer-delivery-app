import React from 'react';
import propTypes from 'prop-types';

export default function ProductButtons({ id }) {
  // const [quantity, setQuantity] = useState(0);

  // const handleDecrease = ((prev) => {
  //   setQuantity(prev - 1 < 0 ? 0 : prev - 1);
  //   removeItemCart(product.id);
  // });

  // const handleInputQty = (value) => {
  //   console.log(value);
  //   if (Number(value) <= 0) {
  //     setQuantity(0);
  //   }
  // };

  return (
    <div>
      <button
        // onClick={ () => handleDecrease() }
        // disabled={ quantity <= 0 }
        data-testid={
          `customer_products__button-card-rm-item-${id}`
        }
        type="button"
      >
        -
      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        // onChange={ ({ target }) => handleInputQty(target.value) }
      />
      <button
        data-testid={
          `customer_products__button-card-add-item-${id}`
        }
        type="button"
      >
        +
      </button>
    </div>
  );
}

ProductButtons.propTypes = {
  id: propTypes.number.isRequired,
};
