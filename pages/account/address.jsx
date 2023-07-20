import React, { useState } from 'react';
import styles from '../../styles/Address.module.css';

function AddressPage() {
    const [address, setAddress] = useState({
        fullName: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });

    const [addressSaved, setAddressSaved] = useState(false); // State to track if address is saved

    const handleChange = e => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        setAddressSaved(true); // Set address as saved after form submission
        console.log(address);
        // Add server-side logic here
    }

    const handleEdit = () => {
        setAddressSaved(false); // Enable editing of address
    }

    const handleDelete = () => {
        setAddress({
            fullName: '',
            streetAddress: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
        });
        setAddressSaved(false); // Remove address and enable adding new one
    }

    return (
        <div className={`${styles.container} container py-5 my-5`}>
            <h2 className={styles.title}>Your Address</h2>
            {addressSaved ? (
                <div className={`card ${styles.addressCard}`}>
                    <div className={`${styles.card_body} card-body`}>
                        <h5 className="card-title">{address.fullName}</h5>
                        <p className="card-text">{address.streetAddress},</p>
                        <p className="card-text">{address.city}, {address.state}, {address.zipCode}</p>
                        <p className="card-text">{address.country}</p>
                        <div className={styles.btnGroup}>
                            <button className={`${styles.btn} ${styles.btn_edit} btn btn-outline-primary`} onClick={handleEdit}>Edit</button>
                            <button className={`${styles.btn} ${styles.btn_delete} btn btn-outline-danger`} onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>

            ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input type="text" name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleChange} required />
                    <input type="text" name="streetAddress" placeholder="Street Address" value={address.streetAddress} onChange={handleChange} required />
                    <input type="text" name="city" placeholder="City" value={address.city} onChange={handleChange} required />
                    <input type="text" name="state" placeholder="State / Province" value={address.state} onChange={handleChange} required />
                    <input type="text" name="zipCode" placeholder="Zip Code" value={address.zipCode} onChange={handleChange} required />
                    <input type="text" name="country" placeholder="Country" value={address.country} onChange={handleChange} required />
                    <button type="submit">Save</button>
                </form>
            )}
        </div>
    )
}

export default AddressPage;
