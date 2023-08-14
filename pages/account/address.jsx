import styles from '../../styles/Address.module.css';
import { useState } from 'react';
import { decode } from 'jsonwebtoken';
import AdressForm from '../../component/AdressForm';

function AddressPage() {
    return (
        <div className={`${styles.container} container py-5 my-5`}>
            <div className="row justify-content-center w-75">
                <div className="col-lg-8 col-md-10 ">
                    <h2>Your Address</h2>
                    <hr />
                    <div className={`${styles.card} card shadow-sm mb-4`}>
                       <AdressForm/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressPage;
