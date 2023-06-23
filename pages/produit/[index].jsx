import Image from 'next/image'
import headphone from '../../public/img/headphoneImg.png'
import styles from '../../styles/ProductView.module.css'
import { useState } from 'react';
export default function Product() {
    const [reviews, setReviews] = useState([]);
    const [reviewerName, setReviewerName] = useState('');
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = { name: reviewerName, text: reviewText };
        setReviews([...reviews, newReview]);
        setReviewerName('');
        setReviewText('');
    };


    return (
        <main>
            <div className={`${styles.productWrapper}  mx-auto  rounded-5`}>
                <div className='d-flex  flex-wrap justify-content-between border-bottom border-muted'>
                    <div className={`${styles.image} col-xl-6 shadow-lg`}>
                        <Image src={headphone} />
                    </div>
                    <div className={`${styles.rigthSide} my-4 col-xl-5  d-flex flex-column justify-content-between`}>
                        <div className={styles.text}>
                            <h1>Airpods- Max</h1>
                            <p className='m-0'>Un casque pour ecouter de la musique</p>

                            <div className=''>
                                <i className='bi bi-star'></i>
                                <i className='bi bi-star'></i>
                                <i className='bi bi-star'></i>
                                <i className='bi bi-star'></i>
                                <i className='bi bi-star'></i>
                                <span> ( 121) </span>
                            </div>
                        </div>

                        <h2>$549.0</h2>

                        <div className={`${styles.amountWrapper} d-flex gap-5 `}>

                            <div className={`${styles.amount} d-flex gap-3 shadow-lg rounded-5`}>
                                <button> <i className='bi bi-dash-circle'></i></button>
                                <span>1</span>
                                <button><i className='bi bi-plus-circle'></i></button>
                            </div>
                            <div>
                                <p>Only 12 left dont miss it</p>
                            </div>
                        </div>


                        <div className={`${styles.buttons} w-50 gap-5 d-flex justify-content-between`}>
                            <button>Buy Now</button>
                            <button>Add to Cart</button>
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
                        <div className="col-lg-4 col-md-6">
                            <div className={`${styles.reviewCard} card mb-4`}>
                                <div className={`${styles.cardBody} card-body`}>
                                    <h5 className={`${styles.reviewTitle} card-title`}>Review Title 1</h5>
                                    <p className={`${styles.reviewContent} card-text`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus mi nec diam iaculis interdum. Nullam cursus nunc ut pulvinar pharetra. Integer facilisis euismod rhoncus. Nulla quis venenatis purus.</p>
                                    <p className={`${styles.reviewer} card-text`}><small className={`${styles.reviewerName} text-muted`}>Reviewer: John Doe</small></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={`${styles.reviewCard} card mb-4`}>
                                <div className={`${styles.cardBody} card-body`}>
                                    <h5 className={`${styles.reviewTitle} card-title`}>Review Title 2</h5>
                                    <p className={`${styles.reviewContent} card-text`}>Duis vestibulum tortor id nunc hendrerit, vitae eleifend nulla elementum. Nam vel nunc sed libero consectetur auctor nec at metus. Aenean et pulvinar mi, sed fermentum urna.</p>
                                    <p className={`${styles.reviewer} card-text`}><small className={`${styles.reviewerName} text-muted`}>Reviewer: Jane Smith</small></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={`${styles.reviewCard} card mb-4`}>
                                <div className={`${styles.cardBody} card-body`}>
                                    <h5 className={`${styles.reviewTitle} card-title`}>Review Title N</h5>
                                    <p className={`${styles.reviewContent} card-text`}>Fusce in placerat elit. Aliquam id luctus velit. Donec accumsan libero ac scelerisque pharetra. Sed facilisis sem vel libero posuere, sed auctor nisl consequat.</p>
                                    <p className={`${styles.reviewer} card-text`}><small className={`${styles.reviewerName} text-muted`}>Reviewer: Alex Johnson</small></p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>
        </main>
    )
}