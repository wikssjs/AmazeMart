// ... (import statements)

import styles from '../../styles/Orders.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import headphone from '../../public/img/headphoneImg.png';

function OrdersPage() {
  const [groupedOrders, setGroupedOrders] = useState([]);

  const orders = [
    {
        id: 1,
        username: 'John Doe',
        item: 'Headphones',
        quantity: 1,
        price: 100
    },
    {
        id: 2,
        username: 'Jane Doe',
        item: 'Keyboard',
        quantity: 2,
        price: 150  
    },
    {
        id: 3,
        username: 'John Doe',
        item: 'Mouse',
        quantity: 1,
        price: 50
    },
    {
        id: 4,
        username: 'Jane Doe',
        item: 'Monitor',
        quantity: 1,
        price: 300
    },
    {
        id: 1,
        username: 'John Doe',
        item: 'Laptop',
        quantity: 1,
        price: 1200
    },
    {
        id: 2,
        username: 'Jane Doe',
        item: 'Mousepad',
        quantity: 1,
        price: 20
    },
    {
        id: 3,
        username: 'John Doe',
        item: 'USB Stick',
        quantity: 2,
        price: 25
    },
    {
        id: 5,
        username: 'Alice Smith',
        item: 'Camera',
        quantity: 1,
        price: 500
    },
    {
        id: 5,
        username: 'Alice Smith',
        item: 'SD Card',
        quantity: 2,
        price: 30
    },
    {
        id: 6,
        username: 'Bob White',
        item: 'Laptop Stand',
        quantity: 1,
        price: 75
    }
];

function groupOrdersById(orders) {
    return orders.reduce((result, order) => {
        if (!result[order.id]) {
            result[order.id] = {
                id: order.id,
                username: order.username,
                items: []
            };
        }

        result[order.id].items.push({
            item: order.item,
            quantity: order.quantity,
            price: order.price
        });

        return result;
    }, {});
}


  useEffect(() => {
    // For the purpose of this example, we'll set the groupedOrders directly
    // In real-world scenarios, you might fetch this data from an API.
    setGroupedOrders(Object.values(groupOrdersById(orders)));
  }, []);

  return (
    <div className={`${styles.container} container py-5 my-5`}>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <h2>Orders</h2>
          <hr />
          {groupedOrders.map((orderGroup) => (
            <div className={`${styles.card} card shadow-sm mb-4`} key={orderGroup.id}>
              <div className={`${styles.card_header} card-header d-flex justify-content-between`}>
                <span>Order ID: {orderGroup.id}</span>
                <span>User: {orderGroup.username}</span>
                <span>Total Items: {orderGroup.items.length}</span>
              </div>
              <div className={`${styles.card_body} card-body`}>
                {orderGroup.items.map((item, index) => (
                  <div className="row align-items-center mb-3" key={index}>
                    <div className="col-md-4">
                      <div className={`${styles.image_container} image-container`}>
                        <Link href={`#`}>
                          <Image src={headphone} alt="Product" width={150} height={150} />
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <h6>{item.item}</h6>
                      <p className="mb-1">Price: ${item.price}</p>
                      <p className="mb-1">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
