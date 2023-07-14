import { useState } from 'react';
import styles from '../styles/PaymentForm.module.css';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';

export default function PaymentForm() {

    function waitFiveSeconds(router, route) {
        setTimeout(() => {
            router.push(route);
        }, 5000);
    }

    const [email, setEmail] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'cardHolderName') {
            setCardHolderName(value);
        } else if (name === 'cardNumber') {
            setCardNumber(value);
        } else if (name === 'expirationDate') {
            setExpirationDate(value);
        } else if (name === 'cvv') {
            setCvv(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form inputs
        const validationErrors = {};

        if (!email) {
            validationErrors.email = 'Email is required';
        } else {
            // Check if email is in a valid format using regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                validationErrors.email = 'Invalid email format';
            }
        }

        if (!cardHolderName) {
            validationErrors.cardHolderName = 'Card Holder Name is required';
        }

        if (!cardNumber) {
            validationErrors.cardNumber = 'Card Number is required';
        }

        if (!expirationDate) {
            validationErrors.expirationDate = 'Expiration Date is required';
        }

        if (!cvv) {
            validationErrors.cvv = 'CVV is required';
        }

        // If there are errors, set them in state
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Clear any existing errors
        setErrors({});

        // Process the form submission
        setLoading(true);
        waitFiveSeconds(router, '/PaymentConfirmation');
    };


    return (
        <>
        {
            loading && 
        <div className={styles.overlay}>
        <CircularProgress color='primary'/> 
        </div>
        }
        <form className={`${styles.paymentForm} d-flex flex-column`} onSubmit={handleSubmit}>
            <label htmlFor="email" className={`d-flex flex-column pr-5`}>
                Email *
                <input
                    type="text"
                    id="email"
                    name="email"
                    className={`${styles.inputCard} `}
                    value={email}
                    onChange={handleInputChange}
                />
                {errors.email && <span className='align-self-center text-danger'>{errors.email}</span>}
            </label>
            <label htmlFor="cardHolderName" className={`d-flex flex-column pr-5`}>
                Card Holder Name *
                <input
                    type="text"
                    id="cardHolderName"
                    name="cardHolderName"
                    className={`${styles.inputCard} `}
                    value={cardHolderName}
                    onChange={handleInputChange}
                />
                {errors.cardHolderName && <span className='align-self-center text-danger'>{errors.cardHolderName}</span>}
            </label>
            <label htmlFor="cardNumber" className={`d-flex flex-column pr-5`}>
                Card Number *
                <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className={`${styles.inputCard} `}
                    value={cardNumber}
                    onChange={handleInputChange}
                />
                {errors.cardNumber && <span className='align-self-center text-danger'>{errors.cardNumber}</span>}
            </label>
            <div className='d-flex'>
                <label htmlFor="expirationDate" className={`d-flex flex-column pr-5`}>
                    Expiration Date *
                    <input
                        type="text"
                        id="expirationDate"
                        name="expirationDate"
                        className={`${styles.inputCard} w-100`}
                        value={expirationDate}
                        onChange={handleInputChange}
                    />
                    {errors.expirationDate && <span className='align-self-center text-danger'>{errors.expirationDate}</span>}
                </label>
                <label htmlFor="cvv" className={`d-flex flex-column pr-5`}>
                    CVV *
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        className={`${styles.inputCard} w-100`}
                        value={cvv}
                        onChange={handleInputChange}
                    />
                    {errors.cvv && <span className='align-self-center text-danger'>{errors.cvv}</span>}
                </label>
            </div>
            <button type='submit'>Payer <i className='bi bi-lock'></i></button>
        </form>

        </>
            );
}
