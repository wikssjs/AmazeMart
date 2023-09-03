import React, { useEffect, useState } from 'react';
import styles from '../../styles/Payment.module.css';
import Image from 'next/image';
import visaCard from '../../public/img/visa-card.png';
import masterCard from '../../public/img/mastercard.png';
import { decode } from 'jsonwebtoken';
import PaymentCreditCard from '../../component/PaymentCreditCard';

function PaymentPage() {
  const [hasCard, setHasCard] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [cardType, setCardType] = useState('visa');
  const [cardNumber, setCardNumber] = useState('**** **** **** 1234');
  const [expirationDate, setExpirationDate] = useState('02/24');
  const [cardHolderName, setCardHolderName] = useState('John Doe');
    const [cvv, setCvv] = useState('***');
  

    useEffect(() => {
    fetch('https://amazemart-1f4e9d6a5f39.herokuapp.com/user/getCreditCard', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'user-id': decode(localStorage.getItem('token'))?.id
        },
    })
        .then(response => response.json())
        .then(json => {
            console.log(json.card.cardType);
            if (json?.card.cardType) {
                setHasCard(true);
                setCardType(json.card.cardType);
                setCardNumber(json.card.cardNumber);
                setExpirationDate(json.card.expirationDate);
                setCardHolderName(json.card.cardHolderName);
                setCvv(json.card.cvv);
            }
        })
        .catch(err => {
            console.log(err);
        })
}, []);

  const handleDeleteCard = () => {
    fetch('https://amazemart-1f4e9d6a5f39.herokuapp.com/user/deleteCreditCard', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-id': decode(localStorage.getItem('token'))?.id
        },
    })
    
    setHasCard(false);
  };

  const handleEditCard = () => {
    setEditMode(true);
  };

  const handleCardTypeChange = (event) => setCardType(event.target.value);
  const handleCardNumberChange = (event) => setCardNumber(event.target.value);
  const handleExpirationDateChange = (event) => setExpirationDate(event.target.value);
  const handleCardHolderNameChange = (event) => setCardHolderName(event.target.value);
    const handleCvvChange = (event) => setCvv(event.target.value);
  const handleSaveChanges = () => {

    const userInformations = {
        cardType,
        cardHolderName,
        cardNumber,
        expirationDate,
        cardHolderName,
        cvv,
    };

    // Process the form submission
    fetch('https://amazemart-1f4e9d6a5f39.herokuapp.com/user/updateCreditCard', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-id': decode(localStorage.getItem('token'))?.id
        },
        body: JSON.stringify(userInformations)
    })
    
    setEditMode(false);
  };

    const handleAddCard = (event) => {
    event.preventDefault();

        const userInformations = {
            cardType,
            cardHolderName,
            cardNumber,
            expirationDate,
            cvv,
        };

        // Process the form submission
        fetch('https://amazemart-1f4e9d6a5f39.herokuapp.com/user/addCreditCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': decode(localStorage.getItem('token'))?.id
            },
            body: JSON.stringify(userInformations)
        })


            setHasCard(true);
    };


  return (
    <div className={`${styles.container} container py-5 my-5 `}>
      {hasCard ? (
        <div className="row justify-content-center animate__fadeIn animate__animated">
          <div className="col-lg-8 col-md-10 ">
            <div className={`${styles.card} shadow mb-4`}>
              <div className="card-body">
                <PaymentCreditCard
                cardType={cardType}
                cardNumber={cardNumber}
                expirationDate={expirationDate}
                cardHolderName={cardHolderName}
                />
                {editMode ? (
                  <form className={`${styles.card_form}  shadow border-top mt-3 animate__fadeIn animate__animated`}>
                    <label htmlFor="cardType" className={`${styles.form_label} form-label`}>Card Type</label>
                    <select
                      id="cardType"
                      className={`${styles.form_control} form-control`}
                      value={cardType}
                      onChange={handleCardTypeChange}
                    >
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                    </select>
                    <div className="mb-3">
                      <label htmlFor="cardNumber" className={`${styles.form_label} form-label`}>Card Number</label>
                      <input
                        type="text"
                        className={`${styles.form_control} form-control`}
                        id="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="expirationDate" className={`${styles.form_label} form-label`}>Expiration Date</label>
                      <input
                        type="text"
                        className={`${styles.form_control} form-control`}
                        id="expirationDate"
                        value={expirationDate}
                        onChange={handleExpirationDateChange}
                      />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cvv" className={`${styles.form_label} form-label`}>CVV</label>
                        <input
                            type="text"
                            className={`${styles.form_control} form-control`}
                            id="cvv"
                            value={cvv}
                            onChange={handleCvvChange}
                        />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="cardHolderName" className={`${styles.form_label} form-label`}>Card Holder Name</label>
                      <input
                        type="text"
                        className={`${styles.form_control} form-control`}
                        id="cardHolderName"
                        value={cardHolderName}
                        onChange={handleCardHolderNameChange}
                      />
                    </div>
                    <button onClick={handleSaveChanges} className={`${styles.btn_save}`}>Save Changes</button>
                  </form>
                ) : (
                  <div>
                    <button onClick={handleEditCard} className={styles.btn_modify}>Modify <i className='ml-2 bi bi-pencil'></i></button>
                    <button onClick={handleDeleteCard} className={styles.btn_delete}>Delete <i className='bi bi-trash ml-2'></i></button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <form className={`${styles.card_form} card-form`} onSubmit={handleAddCard}>
              {/* Add other input fields for card details */}
              <label htmlFor="cardType" className={`${styles.form_label} form-label`}>Card Type</label>
              <select
                id="cardType"
                className={`${styles.form_control} form-control`}
                value={cardType}
                onChange={handleCardTypeChange}
              >
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
              </select>
              <div className="mb-3">
                <label htmlFor="cardNumber" className={`${styles.form_label} form-label`}>Card Number</label>
                <input
                  type="text"
                  className={`${styles.form_control} form-control`}
                  id="cardNumber"
                  placeholder="Enter card number"
                  onChange={handleCardNumberChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="expirationDate" className={`${styles.form_label} form-label`}>Expiration Date</label>
                <input
                  type="text"
                  className={`${styles.form_control} form-control`}
                  id="expirationDate"
                  placeholder="MM/YY"
                  onChange={handleExpirationDateChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cvv" className={`${styles.form_label} form-label`}>CVV</label>
                <input
                  type="text"
                  className={`${styles.form_control} form-control`}
                  id="cvv"
                  placeholder="CVV"
                    onChange={handleCvvChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cardHolderName" className={`${styles.form_label} form-label`}>Card Holder Name</label>
                <input
                  type="text"
                  className={`${styles.form_control} form-control`}
                  id="cardHolderName"
                  placeholder="Card Holder Name"
                  onChange={handleCardHolderNameChange}
                />
              </div>
              <button className={`${styles.btn_primary} btn-primary btn`}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;
