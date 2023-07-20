import styles from '../styles/Product.module.css'
import headphoneImg from '../public/img/headphoneImg.png'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { decode } from 'jsonwebtoken'

export default function Product({product,fetchProducts,setFetchProducts}) {

    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetch('http://localhost:3001/cart')
            .then(res => res.json())
            .then(data => setProducts(data.cart))
    }, [])



    // Calculate average rating
    let averageRating = product.average_rating

    if (averageRating === NaN) {
        averageRating = 0;
    }
    // Round the average to the nearest whole number
    const roundedAverage = Math.round(averageRating) > 0 ? Math.round(averageRating) : 0;

    // Calculate the number of unfilled stars
    const unfilledStars = 5 - roundedAverage;

    const addToCart = async () => {


        let pass = true;

        products.forEach((item) => {
            if (item.productId === product.id) {
                if (item.quantity < product.quantity) {
                    pass = true;
                }
                else {
                    pass = false;
                }
            }
        });

        if (!pass) {
            return;
        }

        let data = {
            id: product.id,
            quantity: 1,
        }
        let reponse = await fetch('http://localhost:3001/addtocart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': decode(localStorage.getItem('token')).id,
            },
            body: JSON.stringify(data),
        })

        let result = await reponse.json();
        setProducts(result.cart);

    }

    const setFavorite = async () => {
        let data = {
            productId: product.id,
        }
        let reponse = await fetch('http://localhost:3001/product/addtofavorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': decode(localStorage.getItem('token')).id,
            },
            body: JSON.stringify(data),
        })

        setFetchProducts(!fetchProducts);
    }


    return (
        <div className={`${styles.productWrapper} col-1 mt-5`}>

            <Link href={`/product/${product.id}`}>

                <div className={styles.product}>
                    <Image src={headphoneImg} width={300} />
                    {/* <Image src={`${product.image}`} alt="" width={300} height="300" /> */}
                </div>
            </Link>
            <div className='d-flex justify-content-between'>
                <Link href="#">
                    <h2>{product.name}</h2>
                </Link>
                <h3>{product.price}</h3>
                <button onClick={setFavorite} className={styles.heartButton}><i className={`${product.product_id ? 'bi bi-heart-fill text-danger':'bi bi-heart'}`}></i></button>
            </div>
            <span>{product.category}</span>
            <div className='text-success py-2 d-flex align-items-center'>
                <span className='p-1'>{averageRating} </span>
                {roundedAverage && [...Array(roundedAverage)].map((star, i) => (
                    <i key={i} className='bi bi-star-fill p-1'></i>
                ))}
                {unfilledStars && [...Array(unfilledStars)].map((star, i) => (
                    <i key={i} className='bi bi-star p-1'></i>
                ))}
                <span className='p-1'>  ( {product.review_count} )  </span>
            </div>


            <button onClick={addToCart} className={styles.addCart}><i class="bi bi-bag-plus"></i></button>
        </div>
    )
}