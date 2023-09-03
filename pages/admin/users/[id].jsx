import { useRouter } from 'next/router';
import styles from '../../../styles/UserDetail.module.css';
import Image from 'next/image';
import heaphone from '../../../public/img/headphoneImg.png';
import { useEffect, useState } from 'react';

export default function UserDetail() {
    const router = useRouter();
    const { id } = router.query;
    const[user, setUser] = useState({});
    const [orders, setOrders] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch(`https://amazemart-1f4e9d6a5f39.herokuapp.com/getUsers/${id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data.user);
                setCart(data.cart);
                setOrders(data.orders);
            })
            .catch(err => console.log(err));
    }, []);


    // // Dummy data
    // const user = {
    //     id: id,
    //     name: 'John Doe',
    //     cart: [
    //         { 
    //             itemName: 'Laptop', 
    //             price: '$1000',
    //             photo: 'path_to_photo.jpg'
    //         },
    //         { 
    //             itemName: 'Mouse', 
    //             price: '$50',
    //             photo: 'path_to_mouse_photo.jpg'
    //         }
    //     ],
    //     orders: [
    //         {
    //             orderId: 1,
    //             items: [
    //                 { itemName: 'Keyboard', price: '$150', photo: 'path_to_keyboard_photo.jpg' },
    //             ]
    //         },
    //         {
    //             orderId: 2,
    //             items: [
    //                 { itemName: 'Monitor', price: '$300', photo: 'path_to_monitor_photo.jpg' },
    //             ]
    //         }
    //     ],
    //     memberSince: 'January 1, 2020',
    //     totalSpent: '$5000',
    //     totalItemsBought: 50
    // };

    return (
        <div className={styles.user_detail_container}>
            <h1>{user.fullname}'s Details</h1>
    
            <div className={`${styles.cards_section} row justify-content-center`}>
                <div className="col-8 col-md-4">
                    <div className={`card ${styles.info_card}`}>
                        <div className="card-body">
                            <h5 className="card-title">Member Since</h5>
                            <p className="card-text">{user.member_since}</p>
                        </div>
                    </div>
                </div>
    
                <div className="col-8 col-md-4">
                    <div className={`card ${styles.info_card}`}>
                        <div className="card-body">
                            <h5 className="card-title">Total Spent</h5>
                            <p className="card-text">{user.total_checkout_amount}$</p>
                        </div>
                    </div>
                </div>
    
                <div className="col-8 col-md-4">
                    <div className={`card ${styles.info_card}`}>
                        <div className="card-body">
                            <h5 className="card-title">Total Items Bought</h5>
                            <p className="card-text">{user.total_items_checked_out}</p>
                        </div>
                    </div>
                </div>
            </div>
    
            <h2>Cart - {cart.length} items</h2>
            <div className={styles.cart_section}>
                {
                    cart.length === 0 && <p>No items in cart.</p>
                }
                {cart.map((item, index) => (
                    <div key={index} className={styles.cart_item}>
                        <Image width={100} height={"auto"} src={heaphone} alt={item.itemName} />
                        <span>{item.name}</span> - 
                        <span>{item.price}</span>
                    </div>
                ))}
            </div>
    
            <h2>Orders</h2>
            { orders.length === 0 && <p>No orders yet.</p> }
            {
            orders.map((order, index) => (
                <div key={index} className={`card ${styles.order_card} mb-3`}>
                    <div className={`${styles.card_header} card-header`}>
                        Order ID: {order.id}
                    </div>
                    <ul className="list-group list-group-flush">
                        {order.products.map((item, idx) => (
                            <li key={idx} className="list-group-item">
                                <Image src={heaphone} alt={item.itemName} width="50" />
                                <span>{item.name}</span> - 
                                <span>{item.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
    
}
