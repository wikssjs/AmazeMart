import Image from "next/image";
import Link from "next/link";
import styles from '../styles/Orders.module.css'
import { useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
import { formatOrderDate } from "../Helper/date.js";


export default function Orders({userId}) {
    const [checkoutData, setCheckoutData] = useState([]);

    const fetchCheckoutData = async () => {
        try {
            const response = await fetch('http://localhost:3001/user/orders', {
                headers: {
                    'user-id': userId,
                }
            });
            const data = await response.json();
            console.log(data);
            setCheckoutData(data);
        } catch (error) {
            console.error('Error fetching checkout data:', error);
        }
    };

    useEffect(() => {
        fetchCheckoutData();
    }, []);


    return (
        <div className={`${styles.container} container py-5 my-5`}>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <h2 className='text-success'>Orders</h2>
            <hr />
            {checkoutData.map((order) => {
              order.products.reduce(
                (accumulator, product) => accumulator + product.total_price,0);
  
              return (
                <div className={`${styles.card}  shadow-sm mb-4`} key={order.order_id}>
                  <div className={`${styles.card_header} card-header d-flex justify-content-between`}>
                    <span>Order #: {order.order_id}</span>
                    <span>Date: {formatOrderDate(order.order_date)}</span>
                    <span>Total: ${order.total_price && order.total_price.toFixed(2)}</span>
                  </div>
                  <div className={`${styles.card_body} card-body`}>
                    {order.products.map((product, index) => (
                      <div className={`${styles.product} row align-items-center mb-3 shadow rounded-3 border-top`} key={index}>
                        <div className="col-md-4">
                          <div className={`${styles.image_container} image-container`}>
                            <Link href={`/product/${product.product_id}`}>
                              <Image src={'/img/'+product.image} alt="Product" width={150} height={150} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <h6>
                            <Link className={styles.blue_text} href={`/product/${product.product_id}`}>
                              {product.product_name}
                            </Link>
                          </h6>
                          <p className="mb-1">Price: ${product.price}</p>
                          <p className="mb-1">Quantity: {product.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
}