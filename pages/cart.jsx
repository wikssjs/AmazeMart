import Image from 'next/image'
import headphone from '../public/img/headphoneImg.png'
import styles from '../styles/Cart.module.css'
import { useEffect, useState } from 'react'
import visa from '../public/img/visa.png'
import paypal from '../public/img/paypal.png'
import mastercard from '../public/img/mastercard.png'
import PaymentForm from '../component/PaymentForm'

export default function Cart() {
    const [selectedOption, setSelectedOption] = useState("");
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);
    const [couponMessage, setCouponMessage] = useState('');


    const [products, setProducts] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [message, setMessage] = useState([]);

    const increment = (event) => {
        const productId = Number(event.currentTarget.dataset.id);
        fetch(`http://localhost:3001/cart/increment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id: productId,
                })
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data.cart)
                setSubTotal(data.subTotal.subTotal)
                setTotal(0)
                setDiscount(0)
            }
            )
    };

    const decrement = async (event) => {

        const productId = Number(event.currentTarget.dataset.id);
        let response = await fetch(`http://localhost:3001/cart/decrement`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id: productId,
                })
        })

        const data = await response.json();
        //if the response is ok, update the state
        if (response.ok) {

            setProducts(data.cart)
            setSubTotal(data.subTotal.subTotal)
            setMessage('')
            setTotal(0)
            setDiscount(0)


            return;
        }

        //if the response is not ok, update the state with the error message
        setMessage(data.message)
    };

    useEffect(() => {
        fetch('http://localhost:3001/cart')
            .then(res => res.json())
            .then(data => {

                setProducts(data.cart)
                setSubTotal(data.subTotal.subTotal)
            }
            )
    }, [])

    const handleDelete = (id) => {
        fetch(`http://localhost:3001/cart/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data.cart)
                setSubTotal(data.subTotal.subTotal)
                setTotal(0)
                setDiscount(0)

            })
    };


    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleCouponChange = (e) => {
        setCoupon(e.target.value);
    };

    const handleCouponSubmit = async (e) => {
        e.preventDefault();
        if (!coupon) {
            setCouponMessage('Please enter a coupon code')
            return;
        }

        const response = await fetch(`http://localhost:3001/cart/coupon`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    coupon: coupon,
                })
        })



        const data = await response.json();
        //if the response is ok, update the state
        if (response.ok) {
            setDiscount(data.discount)
            setTotal(data.total)
            setCouponMessage('')
            setCoupon('')
            e.target.reset()
            return;
        }

        //if the response is not ok, update the state with the error message
        setCouponMessage(data.message)
    };


    return (
        <main >
            <div className={`${styles.cartWrapper} row mx-5 gap-4`}>
                <div className={`${styles.cartLeft} col-7 justify-content-between`}>

                    <div className={styles.products}>
                        {
                            products && products.length == 0 ? <div className='m-auto text-center d-flex justify-content-between align-items-center'>No Items in your cart</div> :
                                products.map((product) => (
                                    <div key={product.id} className={`${styles.itemWrapper} mt-2 mx-2 d-flex mb-5 align-self-start  flex-column align-items-baseline shadow-lg rounded-2`}>
                                        <div className='d-flex justify-content-between w-100'>
                                            <h1 className='p-2'>Review item And Shipping</h1>
                                            <button className={`${styles.deleteButton} btn btn-danger m-2`} onClick={() => handleDelete(product.productId)}>
                                                Delete <i className='bi bi-trash'></i>
                                            </button>
                                        </div>
                                        <div className='w-100  d-flex  align-items-center justify-content-around'>

                                            <div className='d-flex align-items-center'>
                                                <Image src={headphone} width={150} alt='image-product' />
                                                <h2>{product.name}</h2>

                                            </div>
                                            <div>
                                                <h3>{product.price}</h3>
                                                <div className={`${styles.amount} d-flex gap-3 shadow-lg rounded-5`}>
                                                    <button data-id={product.productId} onClick={decrement}> <i className='bi bi-dash-circle'></i></button>
                                                    <span>{product.quantity}</span>
                                                    <p>{message}</p>
                                                    <button data-id={product.productId} onClick={increment}><i className='bi bi-plus-circle'></i></button>
                                                </div>                                            </div>
                                        </div>
                                    </div>
                                ))
                        }
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

                <div className={`${styles.personnal_info} col-3 shadow-lg p-3 mb-3`}>

                    <div>
                        <h1>Order Summary</h1>
                        <div>
                            <h5 className='d-flex gap-3'>SubTotal : <span className={total ? `${styles.line}` : ""}>$ {subTotal}</span></h5>
                            {
                                discount ?
                                    <h5 className='d-flex gap-3'>Discount : <span className='text-success'>$ {discount.toFixed(2)}</span></h5>
                                    : ""
                            }
                            {

                                total ?
                                    <h5 className='d-flex  gap-5'>Total : <span>$ {total || subTotal}</span></h5>
                                    : ""

                            }
                        </div>
                        <form onSubmit={handleCouponSubmit} htmlFor="" className={styles.lblCoupon}>
                            <h2>Coupon</h2>
                            <div>
                                <input onChange={handleCouponChange} type="text" className={styles.couponInput} />
                                <button type='submit'>Appliquer</button>

                            </div>
                            {
                                couponMessage &&
                                <span className='text-danger'>{couponMessage}</span>
                            }
                        </form>
                    </div>

                    <div className={`${styles.payment_option} d-flex flex-column gap-2`}>
                        <h2>Payment Details</h2>
                        <form className={`${styles.choiceForm} d-flex flex-column gap-3`}>
                            <label className='d-flex gap-2'>
                                <input
                                    type="radio"
                                    value="Visa"
                                    checked={selectedOption === "Visa"}
                                    onChange={handleChange}
                                />
                                Visa
                            </label>
                            <label className='d-flex gap-2'>
                                <input
                                    type="radio"
                                    value="Mastercard"
                                    checked={selectedOption === "Mastercard"}
                                    onChange={handleChange}
                                />
                                Mastercard
                            </label>
                            <label className='d-flex gap-2'>
                                <input
                                    type="radio"
                                    value="Paypal"
                                    checked={selectedOption === "Paypal"}
                                    onChange={handleChange}
                                />
                                Paypal
                            </label>

                        </form>
                        <div className="d-flex gap-3 align-items-center">
                            <Image src={visa} width={50} />
                            <Image src={paypal} width={70} />
                            <Image src={mastercard} width={50} />
                        </div>
                        {
                            selectedOption === "Paypal" ?
                                <button className={styles.paypal_button}>Pay with PayPal</button>
                                :
                                <PaymentForm />
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}