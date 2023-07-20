import styles from '../../styles/Orders.module.css';
import headphone from '../../public/img/headphoneImg.png'

import Image from 'next/image';

function OrdersPage() {
    return (
        <div className={`${styles.container} container py-5 my-5`}>
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <h2>Orders</h2>
                    <hr />
                    <div className={`${styles.card} card shadow-sm mb-4`}>
                        <div className={`${styles.card_body} card-body`}>
                            <h5 className={`${styles.card_title} card-title`}>Order #123456</h5>
                            <p>Order Date: 12th July 2023</p>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="image-container">
                                        <Image src={headphone} alt="Product 1" width={150} height={150} />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div>
                                        <h6>Product 1</h6>
                                        <p>Price: $19.99</p>
                                        <p>Quantity: 2</p>
                                    </div>
                                    <span>Total: $39.98</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="image-container">
                                        <Image src={headphone} alt="Product 1" width={150} height={150} />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div>
                                        <h6>Product 1</h6>
                                        <p>Price: $19.99</p>
                                        <p>Quantity: 2</p>
                                    </div>
                                    <span>Total: $39.98</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.card} card shadow-sm mb-4`}>
                        <div className={`${styles.card_body} card-body`}>
                            <h5 className={`${styles.card_title} card-title`}>Order #789012</h5>
                            <p>Order Date: 8th July 2023</p>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="image-container">
                                        <Image src={headphone} alt="Product 2" width={150} height={150} />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div>
                                        <h6>Product 2</h6>
                                        <p>Price: $24.99</p>
                                        <p>Quantity: 1</p>
                                    </div>
                                    <span>Total: $24.99</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrdersPage;
