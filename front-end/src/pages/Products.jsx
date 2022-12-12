import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductsCard from '../components/ProductsCard';
import { getAllProducts } from '../services/endPointRequest';

export default function Products() {
  const [products, setProducts] = useState([]);
  console.log(products);
  async function fetchProducts() {
    const data = await getAllProducts('products');
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);
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
    </>
  );
}
