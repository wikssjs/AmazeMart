// pages/products.js
import { useEffect, useState } from 'react';
import styles from '../../../styles/ProductsPage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import head from '../../../public/img/headphoneImg.png';
import { decode } from 'jsonwebtoken';

export default function ProductsPage() {
    // Dummy data for products
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetch('http://localhost:3001/', {
            headers: {
                'Content-type': 'application/json',
                'user-id': decode(localStorage.getItem('token')).id
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if (json.products) {
                    setProducts(json.products);
                }
            }
            )

    }, [])
            

    const deleteProduct = (id) => {
        const newProducts = products.filter(product => product.id !== id);
        setProducts(newProducts);
        // TODO: Also, make a call to your backend to delete the product from the database
    };

    return (
        <div className={styles.products_container}>
            <h1>Our Products</h1>
            
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-12 col-md-3 mb-4">
                        <div className={`card ${styles.product_card}`}>
                            <Image 
                                width={250} 
                                height={150} 
                                src={head} 
                                alt={product.name} 
                                className="card-img-top align-self-center"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text"><strong>Price:</strong> {product.price}</p>
                                <div className='d-flex '>

                                <Link href={`/admin/products/edit/${product.id}`} className={`btn btn-primary ${styles.edit_button}`}>Edit <i className='bi bi-pencil-square mr-1'></i></Link>
                                <button className={`btn btn-danger ${styles.delete_button}`} onClick={() => deleteProduct(product.id)}>Delete <i className='bi bi-trash mr-1'></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
