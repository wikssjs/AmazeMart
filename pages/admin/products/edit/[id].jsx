// pages/products/edit/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../../styles/ProductEditPage.module.css';
import { decode } from 'jsonwebtoken';
import Image from 'next/image';

export default function ProductEditPage() {
    const router = useRouter();
    const { id } = router.query;

    // State for the product
    const [product, setProduct] = useState({
        id: null,
        name: '',
        price: '',
        image: '',
        description: ''
    });

    // Fetch product details when id is available
    useEffect(() => {
        if(id) {

            fetch(`http://localhost:3001/product/${id}`, {
                headers: {
                    'Content-type': 'application/json',
                    'user-id': decode(localStorage.getItem('token')).id
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    if (json.product) {
                        setProduct(json.product);
                    }
                }
                )
        }
    }, [id]);

    function isValidURL(urlString) {
        try {
            new URL(urlString);
            return true;
        } catch (_) {
            return false;  
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Make an API call to update the product details
        console.log('Updated Product:', product);
    };

    return (
        <div className={styles.edit_container}>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="text" className="form-control" id="price" name="price" value={product.price} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="photo" className="form-label">Photo URL</label>
                    <input type="text" className="form-control" id="image" name="image" value={product.image} onChange={handleInputChange} />
                </div>
                {
                    isValidURL(product.image) &&
                    <Image src={product.image} width={200} height={200} alt='product image'/>

                }
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={product.description} onChange={handleInputChange} rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}
