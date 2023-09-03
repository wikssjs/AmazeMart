// pages/products/edit/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../../styles/ProductEditPage.module.css';
import { decode } from 'jsonwebtoken';
import Image from 'next/image';

export default function ProductEditPage() {
    const router = useRouter();
    const { id } = router.query;

    const [errors , setErrors] = useState('');
    // State for the product
    const [product, setProduct] = useState({
        id: null,
        name: '',
        price: '',
        image: '',
        description: '',
        category: '',
        quantity: ''

    });
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);

    // Fetch product details when id is available
    useEffect(() => {
        if (id) {

            fetch(`https://amazemart-1f4e9d6a5f39.herokuapp.com/product/${id}`, {
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
        setImage(product.image);
    }, [id]);

    useEffect(() => {
        fetch('https://amazemart-1f4e9d6a5f39.herokuapp.com/categories')
            .then(response => response.json())
            .then(json => {
                if (json.categories) {
                    setCategories(json.categories);
                }
            }
            )
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
        console.log(product.image)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!product.name.trim()) {
            setErrors('Product name is required.');
            return;
        }

        if (!product.price || isNaN(product.price)) {
            setErrors('Valid price is required.');
            return;
        }

        if (!product.image) {
            setErrors('Image is required.');
            return;
        }
        alert(image.type)
        // Check if the selected file is an image
        if (!['image/jpeg', 'image/png', 'image/gif', 'image/avif'].includes(image.type)) {
            setErrors('Please select a valid image format (jpg, png, gif,avif).');
            return;
        }

        if (!product.description.trim()) {
            setErrors('Description is required.');
            return;
        }

        if (!product.category) {
            setErrors('Category is required.');
            return;
        }

        if (!product.quantity || isNaN(product.quantity)) {
            setErrors('Valid quantity is required.');
            return;
        }



        setErrors('');

       const data = {
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity: product.quantity,
            category: product.category
       }


        // TODO: Make an API call to update the product details
        fetch(`https://amazemart-1f4e9d6a5f39.herokuapp.com/product/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'user-id': decode(localStorage.getItem('token')).id
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if (json.product) {
                    setProduct(json.product);
                }
            }
            )

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
                    <input type="number" className="form-control" id="price" name="price" value={product.price} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="photo" className="form-label">Photo URL</label>
                    <input
                        type="file"
                        className={`${styles.form_control} form-control`}
                        id="image"
                        onChange={(e) => { setProduct(prev => ({ ...prev, image: e.target.files[0]?.name })); setImage(e.target.files[0]); }}
                    />                </div>
                {
                    <Image src={'/img/' + product.image} width={200} height={200} alt='product image' />

                }
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={product.description} onChange={handleInputChange} rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Quantity</label>
                    <input type="number" className="form-control" id="quantity" name="quantity" value={product.quantity} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select
                                className={`${styles.form_control} form-control`}
                                id="category"
                                value={product.category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.category}</option>
                                ))}
                            </select>
                        </div>
                <button type="submit" className={styles.edit_button}>Update <i class="bi bi-arrow-repeat ml-2"></i></button>
                <div>
                    {errors && <div className="alert alert-danger mt-3" role="alert">{errors}</div>}
                </div>
            </form>
        </div>
    );
}
