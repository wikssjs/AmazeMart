import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/PaymentConfirmation.module.css';

const PaymentConfirmation = () => {
  const router = useRouter();

  // Redirect to home page after 3 seconds
  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       router.push('/');
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }, []);

  return (
    <div className="container my-5 text-center">
      <h1 className="mb-4">Payment Confirmation</h1>
      <div className={`card p-5 shadow-lg ${styles.card}`} style={{ backgroundColor: 'antiquewhite' }}>
        <h2 className="mb-3">Thank you for your purchase!</h2>
        <p className="mb-4">
          Your payment has been successfully processed. You will receive a confirmation email shortly
          with details of your order. If you have any questions or concerns, please feel free to contact
          our customer support.
        </p>
        <div className='row flex-column gap-5'>
          <button
            className={`${styles.returnHome} text button col-3`}
            onClick={() => router.push('/account/orders')}
          >
            Show Your orders
            <i className='ml-2 bi bi-house'></i>
          </button>
          <button
            className={`${styles.returnHome} text button col-3`}
            onClick={() => router.push('/')}
          >
            Return to Homepage
            <i className='ml-2 bi bi-house'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
