import styles from '../styles/Home.module.css'
import Image from 'next/image'
import arrow from '../public/img/arrow.png'
import headphone from '../public/img/headphone.png'
import Product from '../component/Product'
import { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router'
import { decode } from 'jsonwebtoken'

export default function Home() {


  const [homeData, setHomeData] = useState({ products: [] });
  const [fetchProducts, setFetchProducts] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      router.push('/auth');
      return;
    }
  }, [router])
  useEffect(() => {
    fetch('http://localhost:3001/', {
      headers: {
        'user-id': decode(localStorage.getItem('token')) && decode(localStorage.getItem('token')).id
      }
    })
      .then(res => res.json())
      .then(data => setHomeData(data))
  }, [fetchProducts])
  
  return (
    
    <main className=' d-flex flex-column h-100 mx-5'>
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

        <div className='row gap-5   my-5 '>
          {
            homeData.products.map((product) => (
              <Product key={product.i} product={product} />
            ))
          }
        </div>

      </div>
    </main >
  )
}