import { useEffect, useState } from 'react';
import styles from '../styles/Delivery.module.css';
import Image from 'next/image';
import { decode } from 'jsonwebtoken';

function Delivery() {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // Fetch products and cartProducts data...
  }, []);

  const handleDelete = (id) => {
    // Handle product deletion...
  };

  const addToCart = async (event) => {
    // Handle adding to cart...
  };

  return (
    <div className={`${styles.modern_container} container py-5 my-5`}>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <h2 className={styles.modern_heading}>Delivery</h2>
          <hr className={styles.modern_hr} />
          <div className={`${styles.modern_card} card mb-4`}>
            <div className="card-body">
              <h4 className="card-title">Fast and Reliable Delivery</h4>
              <p>
                We take pride in delivering your orders quickly and efficiently. Our dedicated team ensures that your products are carefully packaged and dispatched within 24 hours of placing your order. Our estimated delivery time is usually 3-5 business days.
              </p>
              <p>
                Whether you're located in North America, Europe, Asia, Australia, or Africa, we've got you covered. Our extensive delivery network reaches numerous regions around the world, making sure your products reach you, no matter where you are.
              </p>
            </div>
          </div>
          <div className={`${styles.modern_card} card mb-4`}>
            <div className="card-body">
              <h4 className="card-title">Delivery Locations</h4>
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3243.385667674073!2d-122.08409118475564!3d37.42199967980061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580df6d50b34d%3A0x4a501367f076adbf!2sGoogle%20Plex!5e0!3m2!1sen!2sus!4v1633708961364!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className={`${styles.modern_card} card mb-4`}>
            <div className="card-body">
              <h4 className="card-title">Delivery Options</h4>
              <p>
                We offer multiple delivery options to suit your needs. Our standard delivery is reliable and cost-effective, ensuring that your products reach you in a timely manner. For urgent deliveries, we also provide expedited shipping options.
              </p>
              <p>
                Additionally, our tracking system allows you to monitor the progress of your delivery. You'll receive notifications at every stage of the process, from packaging to shipping to delivery.
              </p>
            </div>
          </div>
          <div className={`${styles.modern_card} card mb-4`}>
            <div className="card-body">
              <h4 className="card-title">Contact Us</h4>
              <p>
                If you have any questions or concerns about your delivery, please don't hesitate to contact our customer support team. You can reach us through email, phone, or live chat on our website. We're here to assist you and ensure your delivery experience is smooth and hassle-free.
              </p>
              <p>
                Thank you for choosing us for your shopping needs. We're committed to delivering quality products and exceptional service to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
