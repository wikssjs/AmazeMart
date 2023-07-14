import styles from '../styles/Home.module.css'
import Image from 'next/image'
import arrow from '../public/img/arrow.png'
import headphone from '../public/img/headphone.png'
import Product from '../component/Product'
import { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

export default function Home() {


  const [homeData, setHomeData] = useState({ products: [] });

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then(data => setHomeData(data))
  }, [])
  
  return (
    <main className='mx-5 d-flex flex-column justify-content-'>
      <LoadingBar color='#f11946' progress={100} height={3} />
      <div className={`${styles.imageLayer} container-fluid`}>
        <div className='d-flex justify-content-around'>
          <div className={styles.text}>
            <h1>Grab Upto 50 % Off On Selected Headphone</h1>
            <button>Buy Now</button>
          </div>
          <div className=''>
            <Image src={headphone} width={375} className='d-none d-md-flex' />

          </div>
        </div>
      </div>


      <div>
        <h1 className='ml-5 my-3'>Products For you</h1>

        <div className='row gap-4 justify-content-center my-5'>
          {
            homeData.products.map((product) => (
              <Product key={product.id} product={product} />
            ))
          }
        </div>

      </div>
    </main >
  )
}