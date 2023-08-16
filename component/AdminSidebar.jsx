import Link from "next/link";
import styles from "../styles/AdminSidebar.module.css";

export default function AdminSidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_heading}>Admin Panel</div>
      <div className={styles.menu_list}>
        <Link href="/" className={styles.menu_item}>
            <i className="bi bi-house"></i> Home
        </Link>

        <Link href="/admin/dashboard" className={styles.menu_item}>
          <i className="bi bi-house-door"></i> Dashboard
        </Link>
        <Link href="/admin/users/allusers" className={styles.menu_item}>
          <i className="bi bi-people"></i> Users
        </Link>
        <Link href="/admin/products" className={styles.menu_item}>
          <i className="bi bi-box"></i> Products
        </Link>
        <Link href="/admin/orders" className={styles.menu_item}>
          <i className="bi bi-cart4"></i> Orders
        </Link>
      </div>
    </div>
  );
}
