import styles from '../styles/Product.module.css'
import headphoneImg from '../public/img/headphoneImg.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Product() {
    return (
        <div className={`${styles.productWrapper} col`}>

            <Link href="#">

                <div className={styles.product}>
                    <button><i className='bi bi-heart'></i></button>
                    <Image src={headphoneImg} width={300} />
                </div>
            </Link>
            <div className='d-flex justify-content-between'>
                <Link href="#">
                    <h2>Wireless headphone IPX8</h2>
                </Link>
                <h3>$89.00</h3>
            </div>
            <span>Organix Cotton</span>
            <div className=''>
                <i className='bi bi-star'></i>
                <i className='bi bi-star'></i>
                <i className='bi bi-star'></i>
                <i className='bi bi-star'></i>
                <i className='bi bi-star'></i>
            </div>


            <button className={styles.addCart}>Add to cart</button>
        </div>
    )
}