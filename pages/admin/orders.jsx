// ... (import statements)

import styles from '../../styles/Orders.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import headphone from '../../public/img/headphoneImg.png';
import Orders from '../../component/Orders';

function OrdersPage() {
  const [groupedOrders, setGroupedOrders] = useState([]);

  const [orders , setOrders] = useState([]);



  useEffect(() => {
    fetchOrders();
  }, [])


  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/user/orders', {
        headers: {
          'Content-type': 'application/json',
        }
      });
      const data = await response.json();
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching checkout data:', error);
    }
  };



//   const orders = [
//     {
//         id: 1,
//         username: 'John Doe',
//         item: 'Headphones',
//         quantity: 1,
//         price: 100
//     },
//     {
//         id: 2,
//         username: 'Jane Doe',
//         item: 'Keyboard',
//         quantity: 2,
//         price: 150  
//     },
//     {
//         id: 3,
//         username: 'John Doe',
//         item: 'Mouse',
//         quantity: 1,
//         price: 50
//     },
//     {
//         id: 4,
//         username: 'Jane Doe',
//         item: 'Monitor',
//         quantity: 1,
//         price: 300
//     },
//     {
//         id: 1,
//         username: 'John Doe',
//         item: 'Laptop',
//         quantity: 1,
//         price: 1200
//     },
//     {
//         id: 2,
//         username: 'Jane Doe',
//         item: 'Mousepad',
//         quantity: 1,
//         price: 20
//     },
//     {
//         id: 3,
//         username: 'John Doe',
//         item: 'USB Stick',
//         quantity: 2,
//         price: 25
//     },
//     {
//         id: 5,
//         username: 'Alice Smith',
//         item: 'Camera',
//         quantity: 1,
//         price: 500
//     },
//     {
//         id: 5,
//         username: 'Alice Smith',
//         item: 'SD Card',
//         quantity: 2,
//         price: 30
//     },
//     {
//         id: 6,
//         username: 'Bob White',
//         item: 'Laptop Stand',
//         quantity: 1,
//         price: 75
//     }
// ];

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


  // useEffect(() => {
  //   // For the purpose of this example, we'll set the groupedOrders directly
  //   // In real-world scenarios, you might fetch this data from an API.
  //   setGroupedOrders(Object.values(groupOrdersById(orders)));
  // }, []);

  return (
   <Orders/>
  );
}

export default OrdersPage;
