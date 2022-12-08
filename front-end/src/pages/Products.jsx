import React, { useEffect, useState } from 'react';
// import NavBar from '../components/Navbar';
import ProductsCard from '../components/ProductsCard';
import { getAllProducts } from '../services/endPointRequest';

export default function Products() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const data = await getAllProducts('products');
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      {/* <NavBar /> */ }
      {products?.map(({ id, name, price, urlImage }) => (
        <ProductsCard
          key={ String(id) }
          id={ String(id) }
          price={ price }
          productName={ name }
          urlImage={ urlImage }
        />
      ))}
    </>
  );
}
