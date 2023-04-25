import styles from '../styles/Home.module.css'
import Image from 'next/image'
import arrow from '../public/img/arrow.png'
import headphone from '../public/img/headphone.png'
import Product from '../component/Product'

export default function Home() {
  return (
    <main className='mx-5 d-flex flex-column justify-content-'>
      <div className={`${styles.imageLayer} container-fluid`}>
        <div className='d-flex justify-content-around'>
          <div className={styles.text}>
            <h1>Grab Upto 50 % Off On Selected Headphone</h1>
            <button>Buy Now</button>
          </div>
          <div className=''>
            <Image src={headphone} width={375} />

          </div>
        </div>
      </div>


      <div className=''>
        <h1>Products For you</h1>

      <div className='row gap-3'>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
      </div>
       
      </div>
    </main >
  )
}