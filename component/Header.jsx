import Link from "next/link";
import Image from "next/image";
import logo from '../public/img/logo.jpg'
import flag from "../public/haiti.png";
import styles from "../styles/Header.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { decode } from 'jsonwebtoken';
import { useShowNotification } from "./ShowNotificationContext";

export default function Header() {

  const [search, setSearch] = useState('')
  const [user, setUser] = useState({})
  const [menuOpen, setMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0);

  const {count,setCount} = useShowNotification();

  const router = useRouter()


  useEffect(() => {
    const token = localStorage.getItem('token');

    const user = decode(token);
    setUser(user);

    fetch('http://localhost:3001/cartCount',
    {
      headers: {
        'Content-Type': 'application/json',
        'user-id': user && user.id
        }
        }
        )
    .then(response => response.json())
    .then(data => {
      // Assume the count is available in data.count
      console.log(data);
      setCount(data.cartCount);
    })
    .catch(error => {
      console.error('Error fetching count:', error);
    });

  }, [router])

  // Update windowWidth state on window resize
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);




  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()

    setMenuOpen(false)

    if (search === '') {
      return;
    }

    router.push(`/search?search=${search}`)
    console.log(search);
  }

  const logOut = () => {
    localStorage.removeItem('token');
    router.push('/auth')
  }

  return (
    <header className={`${styles.header} d-flex flex-column shadow-lg rounded`}>
      <div className={styles.inner_header}>
        <div className={`${styles.top_header} d-md-flex w-100 d-none`}>
          <div className="d-flex w-100 mx-5 ">
            <div className="d-flex w-100 justify-content-between h-100 align-items-center">
              <div className="d-flex gap-2 align-items-center">
                <i className="bi bi-telephone"></i>
                <span className="">+123 123 123 123</span>
              </div>
              <div>get 50% off on your first order</div>
            </div>
          </div>
          <span className="mb-2">|</span>
          <div className="d-flex  justify-content-between w-100 h-100 mx-5 align-items-center">
            <span>Shop Now</span>
            <div className="d-flex align-items-center h-100  gap-5">
              <span>ENG</span>
              <span>Location</span>
            </div>
          </div>
        </div>
        <nav className="d-flex gap-5 justify-content-between">
          <div>
            <Link href="/" className={styles.logo} onClick={() => { setMenuOpen(false) }}>
              <Image src={logo} alt="site logo" width={50} height="auto" className="" />
              <span>AmazeMart</span>
            </Link>
          </div>

          <div className={`${styles.links} ${menuOpen ? styles.open : ""} ${!menuOpen && windowWidth <= 1400 ? "animate__bounceOutUp" : "animate__bounceInDown"} animate__animated mt-2 d-flex justify-content-between align-items-center `}>
            {
              user && (
                <ul className={`${styles.left_menu} d-flex gap-5  w-50 `}>
                  <li onClick={()=>{setMenuOpen(false)}}>              
                    <Link  href="/categories">Categories</Link></li>
                  <li onClick={()=>{setMenuOpen(false)}}>
                    <Link href="/delivery">Delivery</Link>
                    </li>
                    
                </ul>
              )
            }
            <ul className={`${styles.right_menu}  d-flex gap-5 w-100  align-items-center justify-content-end`}>
              {
                user && (
                  <>
                    <li className={`${styles.searchWrapper}`}>
                      <input onChange={handleSearchChange} className={styles.seachInput} type="search" name="" id="" />
                      <button onClick={handleSearchSubmit}><i className="bi bi-search"></i></button>
                    </li>
                    <li  onClick={()=>{setMenuOpen(false)}}>
                      <Link href='/account'>
                        <i className="bi bi-person mr-2"></i>
                        Account
                      </Link>
                    </li>
                    <li className="text-danger"  onClick={()=>{setMenuOpen(false)}}>
                      <Link href="/cart" className="position-relative">
                      <span className={styles.count}>{count}</span>
                        <i className="bi bi-cart mr-2"></i>
                        Cart
                        </Link>
                    </li>
                  </>
                )
              }

              {
                !user && (

                  <li  onClick={()=>{setMenuOpen(false)}}>
                    <Link href="/auth">
                      <i class="bi bi-box-arrow-in-right mr-2"></i>
                      Auth</Link>
                  </li>
                )
              }

              {
                user && (

                  <li  onClick={()=>{setMenuOpen(false)}}>
                    <Link onClick={logOut} href="#" className="text-danger">
                      <i class="bi bi-box-arrow-in-left text-danger mr-2"></i>
                      Sign Out
                    </Link>
                  </li>
                )
              }
            </ul>
          </div>

          <div className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} onClick={() => { setMenuOpen(!menuOpen) }}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </nav>
      </div>
    </header>
  );
}
