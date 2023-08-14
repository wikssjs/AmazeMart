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
    <div className={`${styles.container} container py-5 my-5`}>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <h2 className={styles.heading}>Delivery</h2>
          <hr className={styles.hr} />

          {/* Content about delivery */}
          <div className={`${styles.deliveryContent} card shadow-sm mb-4`}>
            <div className={`${styles.card_body} card-body`}>
              <h4 className={`${styles.card_title} card-title`}>Fast and Reliable Delivery</h4>
              <p>
                We take pride in delivering your orders quickly and efficiently. Our dedicated team ensures that your products are carefully packaged and dispatched within 24 hours of placing your order. Our estimated delivery time is usually 3-5 business days.
              </p>
              <p>
                Whether you're located in North America, Europe, Asia, Australia, or Africa, we've got you covered. Our extensive delivery network reaches numerous regions around the world, making sure your products reach you, no matter where you are.
              </p>
            </div>
          </div>

          {/* Google Map iframe */}
          <div className={`${styles.mapContainer} card shadow-sm mb-4`}>
            <div className={`${styles.card_body} card-body`}>
              <h4 className={`${styles.card_title} card-title`}>Delivery Locations</h4>
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

{/* Other content */}
<div className={`${styles.otherContent} card shadow-lg mb-4`}>
  <div className={`${styles.card_body} card-body`}>
    <h4 className={`${styles.card_title} card-title`}>Delivery Options</h4>
    <p className={styles.card_text}>
      We offer multiple delivery options to suit your needs. Our standard delivery is reliable and cost-effective, ensuring that your products reach you in a timely manner. For urgent deliveries, we also provide expedited shipping options.
    </p>
    <p className={styles.card_text}>
      Additionally, our tracking system allows you to monitor the progress of your delivery. You'll receive notifications at every stage of the process, from packaging to shipping to delivery.
    </p>
  </div>
</div>

<div className={`${styles.contactInfo} card shadow-lg mb-4`}>
  <div className={`${styles.card_body} card-body`}>
    <h4 className={`${styles.card_title} card-title`}>Contact Us</h4>
    <p className={styles.card_text}>
      If you have any questions or concerns about your delivery, please don't hesitate to contact our customer support team. You can reach us through email, phone, or live chat on our website. We're here to assist you and ensure your delivery experience is smooth and hassle-free.
    </p>
    <p className={styles.card_text}>
      Thank you for choosing us for your shopping needs. We're committed to delivering quality products and exceptional service to you.
    </p>
  </div>
</div>

{/* Google Map */}
<div className={`${styles.mapContainer} card shadow-lg mb-4`}>
  <div className={`${styles.card_body} card-body`}>
    <h4 className={`${styles.card_title} card-title`}>Delivery Locations</h4>
    <p className={styles.card_text}>
      We deliver to a wide range of locations worldwide. Our delivery network covers both urban and rural areas, ensuring that you can receive your orders no matter where you are.
    </p>
    {/* Google Map frame */}
    <iframe
      className={styles.mapFrame}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890123456!2d-71.12345678901234!3d42.34567890123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0zNDLCsDI2JzA5LjgiTiA3McKwMDInNTIuNiJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>
</div>



        </div>
      </div>
    </div>
  );
}

export default Delivery;
