import React from 'react';
import styles from '../styles/Footer.module.css';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className={`${styles.footer}`}>
            <div className={styles.footerSections}>
                
                <div className={styles.footerSection}>
                    <h4>Shop</h4>
                    <ul>
                        <li><Link href="/products">Products</Link></li>
                        <li><Link href="/categories">Categories</Link></li>
                        <li><Link href="/deals">Deals</Link></li>
                    </ul>
                </div>
                
                <div className={styles.footerSection}>
                    <h4>Information</h4>
                    <ul>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/shipping">Shipping & Returns</Link></li>
                        <li><Link href="/terms">Terms & Conditions</Link></li>
                    </ul>
                </div>
                
                <div className={styles.footerSection}>
                    <h4>Customer Service</h4>
                    <ul>
                        <li><Link href="/contact">Contact Us</Link></li>
                        <li><Link href="/faq">FAQ</Link></li>
                        <li><Link href="/support">Support</Link></li>
                    </ul>
                </div>

            </div>
            <div className={styles.footerBottom}>
                <p>&copy; 2023 AmazeMart. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
