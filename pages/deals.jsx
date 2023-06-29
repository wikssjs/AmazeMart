import { useState } from 'react';

export default function Deals() {
    // This is a hardcoded list of deals for the example.
    // In a real app, you would fetch this data from your backend.
    const deals = [
        { name: 'Product 1', originalPrice: 100, discountedPrice: 80 },
        { name: 'Product 2', originalPrice: 200, discountedPrice: 150 },
        { name: 'Product 3', originalPrice: 300, discountedPrice: 250 },
        { name: 'Product 4', originalPrice: 400, discountedPrice: 350 },
        { name: 'Product 5', originalPrice: 500, discountedPrice: 450 },
    ];

    return (
        <div className="container py-5">
            <h1 className="mb-5 text-center">Deals</h1>
            <div className="row">
                {deals.map((deal, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{deal.name}</h5>
                                <p className="card-text">
                                    <del className="text-muted">${deal.originalPrice}</del>
                                    <span className="text-danger ml-3">${deal.discountedPrice}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
