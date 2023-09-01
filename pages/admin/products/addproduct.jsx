
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles/AddProduct.module.css'
import {decode} from "jsonwebtoken"


export default function AddProductPage() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/categories')
            .then(response => response.json())
            .then(json => {
                if (json.categories) {
                    setCategories(json.categories);
                }
            }
            )
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validation
        if (!name.trim()) {
            setError('Product name is required.');
            return;
        }
    
        if (!price || isNaN(price)) {
            setError('Valid price is required.');
            return;
        }
    
        if (!image) {
            setError('Image is required.');
            return;
        }
    
        // Check if the selected file is an image
        if (!['image/jpeg', 'image/png', 'image/gif','image/avif'].includes(image.type)) {
            setError('Please select a valid image format (jpg, png, gif,avif).');
            return;
        }

        if(!description.trim()){
            setError('Description is required.');
            return;
        }

    
        if (!category) {
            setError('Category is required.');
            return;
        }

        if (!quantity || isNaN(quantity)) {
            setError('Valid quantity is required.');
            return;
        }

    
        setLoading(true);
        setError('');
        setMessage('');
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('quantity', quantity);
    
        fetch('http://localhost:3001/addProduct', {
            method: 'POST',
            body: formData,
            headers: {
                'user-id': decode(localStorage.getItem('token')).id
            }
        })
        .then(response => response.json())
        .then(json => {
            setLoading(false);
            if (json.error) {
                setError(json.error);
            } else {
                setMessage(json.message);
            }
        })
        .catch(err => {
            setLoading(false);
            setError(err.message);
        })
    }
    

    return (
        <div className={styles.products_container}>
            <div className='d-flex justify-content-between'>
                <h1>Add Product</h1>
                <Link href={'/admin/products'} className={styles.btn_back}>Go Back <i className='bi bi-arrow-left-square ml-2'></i></Link>
            </div>
            <hr />

            <div className="row">
                <div className="col-12 col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Product Name</label>
                            <input
                                type="text"
                                className={`${styles.form_control} form-control`}
                                id="name"
                                placeholder="Enter product name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="number"
                                className={`${styles.form_control} form-control`}
                                id="price"
                                placeholder="Enter product price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input
                                type="file"
                                className={`${styles.form_control} form-control`}
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea

                                className={`${styles.form_control} form-control`}
                                id="description"
                                placeholder="Enter product description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select
                                className={`${styles.form_control} form-control`}
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.category}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Quantity</label>
                            <input
                                type="number"
                                className={`${styles.form_control} form-control`}
                                id="quantity"
                                placeholder="Enter product quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        
                        <button type="submit" className={styles.btn_submit} disabled={loading}>Add Product</button>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}
