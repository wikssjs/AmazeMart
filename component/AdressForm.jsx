import { useEffect, useState } from "react";
import styles from '../styles/Address.module.css';
import { decode } from 'jsonwebtoken';

export default function AdressForm() {
    const [address, setAddress] = useState({
        fullname: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });

    const [addressSaved, setAddressSaved] = useState(false); // State to track if address is saved

    const handleChange = e => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        fetch('http://localhost:3001/address', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-id': decode(localStorage.getItem('token')).id
            },
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if (json.address) {
                    setAddress(json.address);
                    setAddressSaved(true);
                }
            }
            )

    }, [])


    const handleSubmit = e => {
        e.preventDefault();
        setAddressSaved(true); // Set address as saved after form submission
        console.log(address);
        // Add server-side logic here
        fetch('http://localhost:3001/address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id':decode(localStorage.getItem('token')).id
            },

            body: JSON.stringify(address),
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
            }
            )

    }

    const handleEdit = () => {
        setAddressSaved(false); // Enable editing of address
    }

    const handleDelete = () => {
        setAddressSaved(false);
        setAddress({
            fullname: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
        });

       const data = {
        userId : decode(localStorage.getItem('token')).id
       }

        fetch('http://localhost:3001/address', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }

    return (
        <div className="p-3">
            {addressSaved ? (
                <>
                    <h5 className={`${styles.card_title} card-title`}>{address.fullname}</h5>
                    <p className="card-text">{address.street},</p>
                    <p className="card-text">{address.city + ","} {address.state + ","} {address.zip}</p>
                    <p className="card-text">{address.country}</p>
                    <div className={styles.btnGroup}>
                        <button className={`${styles.btn} ${styles.btn_edit} btn btn-outline-primary`} onClick={handleEdit}>Edit <i className='bi bi-pencil-square ml-2'></i></button>
                        <button className={`${styles.btn} ${styles.btn_delete} btn btn-outline-danger`} onClick={handleDelete}>Delete <i className='bi bi-trash ml-2'></i></button>
                    </div>
                </>
            ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className={`${styles.form_label} form-label`}>Full Name</label>
                        <input type="text" name="fullname" className={`${styles.form_control} form-control`} value={address.fullname} onChange={handleChange} required />
                    </div>
                    <div className="mb-2">
                        <label className={`${styles.form_label} form-label`}>Street Address</label>
                        <input type="text" name="street" className={`${styles.form_control} form-control`} value={address.street} onChange={handleChange} required />
                    </div>
                    <div className="mb-2">
                        <label className={`${styles.form_label} form-label`}>City</label>
                        <input type="text" name="city" className={`${styles.form_control} form-control`} value={address.city} onChange={handleChange} required />
                    </div>
                    <div className="mb-2">
                        <label className={`${styles.form_label} form-label`}>State / Province</label>
                        <input type="text" name="state" className={`${styles.form_control} form-control`} value={address.state} onChange={handleChange} required />
                    </div>
                    <div className="mb-2">
                        <label className={`${styles.form_label} form-label`}>Zip Code</label>
                        <input type="text" name="zip" className={`${styles.form_control} form-control`} value={address.zip} onChange={handleChange} required />
                    </div>
                    <div className="mb-2">
                        <label className={`${styles.form_label} form-label`}>Country</label>
                        <input type="text" name="country" className={`${styles.form_control} form-control`} value={address.country} onChange={handleChange} required />
                    </div>
                    <button className={`${styles.btn_primary} btn-primary btn align-self-center`}>Save</button>
                </form>
            )}
        </div>
    );
}
