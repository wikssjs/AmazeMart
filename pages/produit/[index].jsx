import Image from 'next/image'
import headphone from '../../public/img/headphoneImg.png'
import styles from '../../styles/ProductView.module.css'
export default function Product() {
    return (
        <main>
            <div className={`${styles.productWrapper} mx-5 shadow-lg rounded-5`}>
                <div className='row justify-content-between'>

                    <div className={`${styles.image} col-6`}>
                        <Image src={headphone} />
                    </div>
                    <div className={`${styles.rigthSide} my-4 col-5 d-flex flex-column justify-content-between`}>
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
            </div>
        </main>
    )
}