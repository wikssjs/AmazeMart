import Image from 'next/image'
import headphone from '../public/img/headphoneImg.png'
import styles from '../styles/Cart.module.css'
import { useState } from 'react'
import visa from '../public/img/visa.png'
import paypal from '../public/img/paypal.png'
import mastercard from '../public/img/mastercard.png'

export default function Cart() {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (e) => {
        e.target.backgroundColor = "blue"
    };

    return (
        <main>
            <div className={`${styles.cartWrapper} row mx-5 gap-4`}>
                <div className='col-7 justify-content-between'>
                    <div className={`${styles.itemWrapper} d-flex mb-5 align-self-start  flex-column align-items-baseline shadow-lg rounded-2`}>
                        <h1 className='p-2'>Review item And Shipping</h1>
                        <div className='w-100  d-flex  align-items-center justify-content-around'>

                            <div className='d-flex align-items-center'>
                                <Image src={headphone} width={150} alt='image-product' />
                                <h2>Airpods- Max</h2>

                            </div>
                            <div>
                                <h3>$549.00</h3>
                                <span>Quantity: 01</span>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.deliveryWrapper} shadow-lg rounded-2`}>
                        <div className='mt-4'>

                            <div className='mx-2 d-flex justify-content-between align-items-center'>
                                <h1 className='my-3'>Delivery Information</h1>
                                <button>Edit information <i className='bi bi-pencil-square ml-2'></i></button>
                            </div>
                            <div className={`${styles.informations} d-flex align-items-center mx-3 justify-content-between`}>
                                <h2 className='my-3'>Name:</h2>
                                <span>James</span>
                            </div>
                            <div className={`${styles.informations} d-flex align-items-center mx-3 justify-content-between`}>
                                <h2 className='my-3'>Adress:</h2>
                                <span>James</span>
                            </div>
                            <div className={`${styles.informations} d-flex align-items-center mx-3 justify-content-between`}>
                                <h2 className='my-3'>City:</h2>
                                <span>James</span>
                            </div>
                            <div className={`${styles.informations} d-flex align-items-center mx-3 justify-content-between`}>
                                <h2 className='my-3'>Zip Code:</h2>
                                <span>James</span>
                            </div>
                            <div className={`${styles.informations} d-flex align-items-center mx-3 justify-content-between`}>
                                <h2 className='my-3'>Email:</h2>
                                <span>James</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.personnal_info} col-3 shadow-lg p-3`}>

                    <div>
                        <h1>Order Summary</h1>
                        <label htmlFor="" className={styles.lblCoupon}>
                            <h2>Coupon</h2>
                            <div>
                            <input type="text" className={styles.couponInput} />
                            <button>Appliquer</button>

                            </div>
                        </label>
                    </div>

                    <div className={`${styles.payment_option} d-flex flex-column gap-2`}>
                        <h2>Payment Details</h2>
                        <form className='d-flex flex-column gap-3'>
                            <label className='d-flex gap-2'>
                                <input
                                    type="radio"
                                    value="option1"
                                    checked={selectedOption === "option1"}
                                    onChange={handleChange}
                                />
                                Option 1
                            </label>
                            <label className='d-flex gap-2'>
                                <input
                                    type="radio"
                                    value="option2"
                                    checked={selectedOption === "option2"}
                                    onChange={handleChange}
                                />
                                Option 2
                            </label>
                            <label className='d-flex gap-2'>
                                <input
                                    type="radio"
                                    value="option3"
                                    checked={selectedOption === "option3"}
                                    onChange={handleChange}
                                />
                                Option 3
                            </label>
                            <label className='d-flex gap-2'>
                                <input
                                    type="radio"
                                    value="option4"
                                    checked={selectedOption === "option4"}
                                    onChange={handleChange}
                                />
                                Option 4
                            </label>
                        </form>
                        <div className="d-flex gap-3 align-items-center">
                            <Image src={visa} width={50}/>
                            <Image src={paypal} width={70}/>
                            <Image src={mastercard} width={50}/>
                        </div>

                        <div>
                            <label htmlFor="" className={` d-flex flex-column pr-5`}>
                                Email *
                                <input type="text" className={`${styles.inputCard} `} />
                            </label>
                            <label htmlFor="" className={`d-flex flex-column pr-5`}>
                                Card Horder Name *
                                <input type="text" className={`${styles.inputCard} `}/>
                            </label>
                            <label htmlFor="" className={`d-flex flex-column pr-5`}>
                                Card Horder Name *
                                <input type="text" className={`${styles.inputCard} `}/>
                            </label>

                            <div className='d-flex'>
                            <label htmlFor="" className={` d-flex flex-column pr-5`}>
                                Card Horder Name *
                                <input type="text" className={`${styles.inputCard} w-100`}/>
                            </label>
                            <label htmlFor="" className={` d-flex flex-column pr-5`}>
                                Card Horder Name *
                                <input type="text" className={`${styles.inputCard} w-100`}/>
                            </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}