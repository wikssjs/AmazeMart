import { useEffect, useState } from 'react';
import styles from '../styles/Categories.module.css'
import Product from '../component/Product';
import LoadingBar from 'react-top-loading-bar';


export default function Categories() {


    const [categories, setCategories] = useState([]);
    const[category, setCategory] = useState('Electronics')
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3001/categories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data.categories)
            })
    }, [])

    const showProducts = (e) => {
        const category = e.currentTarget.dataset.category
        setCategory(category)
        //get products by category
        fetch(`http://localhost:3001/products?category=${encodeURIComponent(category)}`)
        .then(res => res.json())
            .then(data => {
                console.log(data.products)
                setProducts(data.products)
            }
            )

    }

    // This is a hardcoded list of categories for the example.
    // In a real app, you would fetch this data from your backend.

    return (
        <div className="container py-5">
            <h1 className="mb-5 text-center">Categories</h1>
            <div className="row">
                {categories.map((category) => (
                    <div data-category = {category.category} className="col-md-4 mb-4" key={category.id} onClick={showProducts}>
                        <LoadingBar color='#f11946' progress={100} height={3} />
                        <div href={`/categories/${category}`} className={`${styles.category_card } text-decoration-none`}>
                            <div className="card border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <h5>{category.category}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
                <div className={`${styles.products} row`}>
                    <div className='align-self-center'>

                    <h1 className='text-center b w-25 m-auto'>{category}</h1>
                    </div>
                {
                    products.length ===0 ? <p className='text-center '>No Products for this Category</p>
                    :
                    products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))
                    
                }
                </div>
            </div>
        </div>
    );
}
