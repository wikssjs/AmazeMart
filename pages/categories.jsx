import { useState } from 'react';
import styles from '../styles/Categories.module.css'

export default function Categories() {
    // This is a hardcoded list of categories for the example.
    // In a real app, you would fetch this data from your backend.
    const categories = ['Electronics', 'Books', 'Clothing', 'Home & Kitchen', 'Sports & Outdoors'];

    return (
        <div className="container py-5">
            <h1 className="mb-5 text-center">Categories</h1>
            <div className="row">
                {categories.map((category, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div href={`/categories/${category}`} className={`${styles.category_card } text-decoration-none`}>
                            <div className="card border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <h5>{category}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
