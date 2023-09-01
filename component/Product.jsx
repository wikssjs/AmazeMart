import styles from '../styles/Product.module.css'
import headphoneImg from '../public/img/headphoneImg.png'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { decode } from 'jsonwebtoken'
import { useShowNotification } from './ShowNotificationContext'

export default function Product({product}) {

    const [products, setProducts] = useState([]);
    const [productVar, setProductVar] = useState({});

    const { setNotificationState,setCount } = useShowNotification();


    useEffect(() => {
        setProductVar(product)
        fetch('http://localhost:3001/cart',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': decode(localStorage.getItem('token')) && decode(localStorage.getItem('token')).id
                }
            })
            .then(res => res.json())
            .then(data =>{

                setProducts(data.cart)
                })
            
    }, [product,setCount])



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
            setNotificationState({
                isTrue: true,
                text: `Product cannot be added to cart because there are only ${product.quantity} items left`,
                color: 'danger'
            })

            setTimeout(() => {
                setNotificationState({
                    isTrue: false,
                    text: `Product cannot be added to cart because there are only ${product.quantity} items left`,
                    color: 'danger'
                })
            }, 3000);

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

        if(reponse.ok){

            let result = await reponse.json();
            setProducts(result.cart);
            setCount(result.cart.length)
            setNotificationState({
                isTrue: true,
                text: 'Product added to cart successfully !',
                color: 'success'
            })

            setTimeout(() => {
                setNotificationState({
                    isTrue: false,
                    text: 'Product added to cart successfully !',
                    color: 'success'
                })
            }, 3000);
        }

    }

    const setFavorite = async () => {
        let data = {
            productId: product.id,
        }
        let response = await fetch('http://localhost:3001/product/addtofavorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': decode(localStorage.getItem('token')).id,
            },
            body: JSON.stringify(data),
        })
       
        if(response.ok){
            let result = await response.json();
            setProductVar(result.product);

            if(result.product.product_id){

            setNotificationState({
                isTrue: true,
                text: 'Product added to favorite successfully !',
                color: 'success'
            })

            setTimeout(() => {
                setNotificationState({
                    isTrue: false,
                    text: 'Product added to favorite successfully !',
                    color: 'success'
                })
            }, 3000);
        }

        else{
            setNotificationState({
                isTrue: true,
                text: 'Product removed from favorite successfully !',
                color: 'danger'
            })

            setTimeout(() => {
                setNotificationState({
                    isTrue: false,
                    text: 'Product removed from favorite successfully !',
                    color: 'danger'
                })
            }, 3000);
        }
    }

      

    }


    return (
        <div className={`${styles.productWrapper} col-1 mt-5 mx-auto  animate__fadeInUp animate__animated`}>

            <Link href={`/product/${productVar.id}`}>

                <div className={styles.product}>
                    <Image src={`/img/${productVar.image}`} width={280} height={230} alt='' />
                    {/* <Image src={`${productVar.image}`} alt="" width={300} height="300" /> */}
                </div>
            </Link>
            <div className='d-flex justify-content-between'>
                <Link href={`/productVar/${productVar.id}`}>
                    <h2>{productVar.name}</h2>
                </Link>
                <h3>$ {productVar.price}</h3>
                <button onClick={setFavorite} className={styles.heartButton}><i className={`${productVar.product_id ? 'bi bi-heart-fill text-danger':'bi bi-heart'}`}></i></button>
            </div>
            <span>{productVar.category}</span>
            <div className='text-success py-2 d-flex align-items-center'>
                <span className='p-1'>{averageRating} </span>
                {roundedAverage && [...Array(roundedAverage)].map((star, i) => (
                    <i key={i} className='bi bi-star-fill p-1'></i>
                ))}
                {unfilledStars && [...Array(unfilledStars)].map((star, i) => (
                    <i key={i} className='bi bi-star p-1'></i>
                ))}
                <span className='p-1'>  ( {productVar.review_count} )  </span>
            </div>


            <button onClick={addToCart} className={styles.addCart}><i class="bi bi-bag-plus"></i></button>
        </div>
    )
}