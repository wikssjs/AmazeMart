import Image from 'next/image'
import headphone from '../../public/img/headphoneImg.png'
import styles from '../../styles/ProductView.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar';
import { Carousel } from 'react-responsive-carousel';
import { decode } from 'jsonwebtoken';
import { useShowNotification } from '../../component/ShowNotificationContext';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

export default function Product() {

    const router = useRouter();
    const { index } = router.query;

    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [reviewerName, setReviewerName] = useState('');
    const [reviewText, setReviewText] = useState('');

    const {setNotificationState,setCount } = useShowNotification();

    const increment = () => {
        if (quantity < product.quantity) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };


    useEffect(() => {
        fetch(`https://amazemart-1f4e9d6a5f39.herokuapp.com/product/${index}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data.product);
                setReviews(data.reviews);
            })
    }, [index])

    useEffect(() => {
        fetch('https://amazemart-1f4e9d6a5f39.herokuapp.com/cart',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': Number(decode(localStorage.getItem('token')).id)
                }
            })
            .then(res => res.json())
            .then(data => setProducts(data.cart))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = { name: reviewerName, text: reviewText };
        setReviews([...reviews, newReview]);
        setReviewerName('');
        setReviewText('');
    };

    const addToCart = async () => {

        let pass = true;

        products.map((item) => {
            if (item.productId === product.id) {
                if (item.quantity < product.quantity) {
                    //use a popup to tell the user that the product cannot be added to cart
                    pass = true;
                }
                else {
                    //use a popup to tell the user that the product has been added to cart
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
            quantity: quantity,
        };

        let reponse = await fetch('https://amazemart-1f4e9d6a5f39.herokuapp.com/addtocart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': Number(decode(localStorage.getItem('token')).id),
            },
            body: JSON.stringify(data),
        })

        if(reponse.ok){


        let result = await reponse.json();
        setProducts(result.cart);
        setCount(result.cart.length);
        
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
    // Calculate average rating
    let averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    // Round the average to the nearest whole number
    const roundedAverage = Math.round(averageRating) > 0 ? Math.round(averageRating) : 0;

    // Calculate the number of unfilled stars
    const unfilledStars = 5 - roundedAverage;





    return (
        <main>
            <LoadingBar color='#f11946' progress={100} height={3} />
            <div className={`${styles.productWrapper}  mx-auto  rounded-5 mt-5`}>
                <div className={`${styles.inner_product} d-flex  flex-wrap justify-content-between border- border-muted`}>
                    <div className={`${styles.image} image col-xl-6 shadow-lg`}>
                        {/* <Image src={headphone} /> */}
                        <Carousel
                            className={styles.carousel}

                        >
                            <div>
                                <img src={`/img/${product.image}`} alt={product.image}/>
                            </div>
                            <div>
                                <img src={`/img/${product.image}`} alt={product.image}/>
                            </div>
                            <div>
                                <img src={`/img/${product.image}`}alt={product.image} />
                            </div>
                        </Carousel>                    </div>
                    <div className={`${styles.rigthSide} my-4 col-xl-5  d-flex flex-column justify-content-between align-items-center`}>
                        <div className={styles.text}>
                            <h1>{product.name}</h1>
                            <p className='m-0'>Un casque pour ecouter de la musique</p>

                            <div className={`${styles.productRating} text-success my-3`}>
                                <span className='p-1'>{averageRating ? averageRating : ""}</span>
                                {roundedAverage && [...Array(roundedAverage)].map((star, i) => (
                                    <i key={i} className='bi bi-star-fill p-1'></i>
                                ))}
                                {unfilledStars && [...Array(unfilledStars)].map((star, i) => (
                                    <i key={i} className='bi bi-star p-1'></i>
                                ))}
                                <span className='p-1'>  ( {reviews.length} )  </span>
                            </div>
                        </div>

                        <h2 className='mb-3'>$ {product.price}</h2>

                        <div className={`${styles.amountWrapper} d-flex gap-5 `}>

                            <div className={`${styles.amount} d-flex gap-3 shadow-lg rounded-5`}>
                                <button onClick={decrement}> <i className='bi bi-dash-circle'></i></button>
                                <span>{quantity}</span>
                                <button onClick={increment}><i className='bi bi-plus-circle'></i></button>
                            </div>
                            <div>
                                {
                                    product.quantity < 20 ? <p>Only {product.quantity} left dont miss it</p>
                                        :
                                        <span className='text-success'>In Stock</span>
                                }
                            </div>
                        </div>


                        <div className={`${styles.buttons} w-50 gap-5 d-flex justify-content-between my-4`}>
                            <button>Buy Now </button>
                            <button onClick={addToCart}>Add to Cart</button>
                        </div>


                        <div className='d-flex flex-column gap-4'>
                            <div>
                                <i className='bi bi-truck text-warning mr-3'></i>
                                <span>Free Delivery</span>
                            </div>

                            <div>
                                <i class="bi bi-box-seam text-warning mr-3"></i>
                                <span>Return Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={`container my-5`}>
                    <h1 className="text-center">Reviews</h1>
                    <div className={`${styles.reviewContainer} row`}>
                        {
                            reviews.length === 0 ? <p className='text-center p-5 text-muted'>No reviews yet</p> :
                                reviews.map((review, index) => (
                                    <div className="col-lg-4 col-md-6" key={review.id}>
                                        <div className={`${styles.reviewCard} card mb-4`}>
                                            <div className={`${styles.cardBody} card-body`}>
                                                <h5 className={`${styles.reviewTitle} card-title`}>
                                                    {
                                                        <div>
                                                            {[...Array(review.rating)].map((e, i) => (
                                                                <i className='bi bi-star-fill text-success mr-1' key={i}></i>
                                                            ))}
                                                            {[...Array(5 - review.rating)].map((e, i) => (
                                                                <i className='bi bi-star text-success mr-1' key={i}></i>
                                                            ))}
                                                        </div>
                                                    }
                                                    {review.title}</h5>
                                                <p className={`${styles.reviewContent} card-text`}>{review.comment}</p>
                                                <p className={`${styles.reviewer} card-text`}><small className={`${styles.reviewerName} text-muted`}>Reviewer: {review.reviewer_name}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }

                    </div>
                </div>

            </div>
        </main>
    )
}