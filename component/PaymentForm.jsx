import styles from '../styles/PaymentForm.module.css'

export default function PaymentForm() {
    return (
        <form className={`${styles.paymentForm} d-flex flex-column`}>
                            <label htmlFor="" className={` d-flex flex-column pr-5`}>
                                Email *
                                <input type="text" className={`${styles.inputCard} `} />
                            </label>
                            <label htmlFor="" className={`d-flex flex-column pr-5`}>
                                Card Horder Name *
                                <input type="text" className={`${styles.inputCard} `} />
                            </label>
                            <label htmlFor="" className={`d-flex flex-column pr-5`}>
                                Card Horder Name *
                                <input type="text" className={`${styles.inputCard} `} />
                            </label>

                            <div className='d-flex'>
                                <label htmlFor="" className={` d-flex flex-column pr-5`}>
                                    Card Horder Name *
                                    <input type="text" className={`${styles.inputCard} w-100`} />
                                </label>
                                <label htmlFor="" className={` d-flex flex-column pr-5`}>
                                    Card Horder Name *
                                    <input type="text" className={`${styles.inputCard} w-100`} />
                                </label>
                            </div>
                            <button type='submit'>Payer <i className='bi bi-lock'></i></button>
                        </form>
    )
}