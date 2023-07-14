import React, { useEffect, useState } from 'react';
import styles from '../styles/Search.module.css';
import Product from '../component/Product';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar';

export default function SearchResults(){
    const [products, setProducts] = useState([]);
    const router = useRouter();
    const {search} = router.query;

    useEffect(() => {
        fetch(`http://localhost:3001/searchproducts?search=${search}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.products)
                setProducts(data.products)
            }
            )
    }, [search])



  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${styles.container} my-5 `}>
        <LoadingBar color='#f11946' progress={10} height={3} />
      <h1 className={`${styles.title} text-center`}>Search Results</h1>
      <h1 className={`${styles.searchTerm} text-center`}>result for <span className='text-success'>'{search}'</span></h1>
      <div className='row gap-4 justify-content-center my-5'>
          {
            products.length == 0 ? <h1 className='text-center'>No Products Found</h1> :
                products.map((product) => (
              <Product key={product.id} product={product} />
            ))
          }
        </div>
    </div>
  );
};
