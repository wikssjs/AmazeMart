import Link from "next/link";
import Image from "next/image";
import logo from '../public/img/logo.jpg'
import flag from "../public/haiti.png";
import styles from "../styles/Header.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Header() {

  const[search,setSearch] = useState('')
  const router = useRouter()

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()

    if(search === '') {
      return;
    }

    router.push(`/search?search=${search}`)
    console.log(search);
  }


  return (
    <header className={`${styles.header} d-flex flex-column shadow-lg rounded`}>

      <div className={styles.inner_header}>

        <div className={`${styles.top_header} d-flex w-100`}>
          <div className="d-flex w-100 mx-5">
            <div className="d-flex w-100 justify-content-between h-100">
              <div className="d-flex gap-2">
                <i className="bi bi-telephone"></i>
                <p className="">+123 123 123 123</p>
              </div>
              <div>get 50% off on your first order</div>
            </div>
          </div>
          <span className="mb-2">|</span>
          <div className="d-flex justify-content-between w-100 h-100 mx-5 ">
            <p>Shop Now</p>
            <div className="d-flex">
              <p>ENG</p>
              <p>Location</p>
            </div>
          </div>
        </div>
        <nav className="d-flex gap-5 mx-5">
          <div className={styles.logo}>
            <Image src={logo} alt="site logo" width={50} height="auto" className="" />
            <Link href="/">AmazeMart</Link>
          </div>
          <div className={`${styles.links} mt-2 d-flex  w-100 justify-content-between align-items-center`}>
            <ul className="d-flex gap-5">
              <li>              <Link href="/categories">Categories</Link></li>
              <li>Wahts New</li>
              <li>Delivery</li>
            </ul>
            <ul className="d-flex gap-5  align-items-center">
              <li className={`${styles.searchWrapper}`}>
                <input onChange={handleSearchChange} className={styles.seachInput} type="search" name="" id="" />
                <button onClick={handleSearchSubmit}><i className="bi bi-search"></i></button>
              </li>
              <li>
                <i className="bi bi-person"></i>
                <span>Account</span>
              </li>
              <li>
                <i className="bi bi-cart"></i>
                <Link href="/cart">Cart</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
