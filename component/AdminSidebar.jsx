import Link from "next/link";
import styles from "../styles/AdminSidebar.module.css";
import { useEffect,useState } from "react";
export default function AdminSidebar() {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        }
        );
    }, []);

  return (
    <div className={`${styles.sidebar} col-12`}>
      <div className={styles.sidebar_heading}>
        <h3 className={`${windowWidth <768 ? "d-none" :""}`}>Admin Panel</h3>
      </div>
      <div className={styles.menu_list}>
        <Link href="/" className={styles.menu_item}>
            <i className="bi bi-house"></i> 
            <span className={`${windowWidth <768 ? "d-none" :""}`}>Home</span>
        </Link>

        <Link href="/admin/dashboard" className={styles.menu_item}>
          <i className="bi bi-house-door"></i> 
          <span className={`${windowWidth <768 ? "d-none" :""}`}>Dashboard</span>
        </Link>
        <Link href="/admin/users/allusers" className={styles.menu_item}>
          <i className="bi bi-people"></i> 
          <span className={`${windowWidth <768 ? "d-none" :""}`}>Users</span>
        </Link>
        <Link href="/admin/products" className={styles.menu_item}>
          <i className="bi bi-box"></i> 
          <span className={`${windowWidth <768 ? "d-none" :""}`}>Products</span>
        </Link>
        <Link href="/admin/orders" className={styles.menu_item}>
          <i className="bi bi-cart4"></i> 
          <span className={`${windowWidth <768 ? "d-none" :""}`}>Orders</span>
        </Link>
      </div>
    </div>
  );
}
