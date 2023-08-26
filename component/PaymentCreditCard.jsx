import styles from '../styles/PaymentCreditCard.module.css'
import { useState,useEffect } from 'react'

export default function PaymentCreditCard({cardType,cardHolderName,cardNumber,expirationDate}) {
    const[newCardNumber,setNewCardNumber] = useState([])
    useEffect(() => {
        let cleanedCardNumber = cardNumber.replace(/\s+/g, ''); // Remove all spaces
        let cardNumberArr = cleanedCardNumber.match(/.{1,4}/g) || []; // Splits the string into chunks of 4
        setNewCardNumber(cardNumberArr);
      }, [cardNumber]);
      
      
    return (
        <div className={styles.main}>

            <div className={`${styles.card}`}>
                <div className={styles.card__info}>
                    <div className={styles.card__logo}>Platinium</div>
                    <div className={styles.card__chip}>
                        <svg className={styles.card__chip_lines} role="img" width="20px" height="20px" viewBox="0 0 100 100" aria-label="Chip">
                            <g opacity="0.8">
                                <polyline points="0,50 35,50" fill="none" stroke="#000" stroke-width="2" />
                                <polyline points="0,20 20,20 35,35" fill="none" stroke="#000" stroke-width="2" />
                                <polyline points="50,0 50,35" fill="none" stroke="#000" stroke-width="2" />
                                <polyline points="65,35 80,20 100,20" fill="none" stroke="#000" stroke-width="2" />
                                <polyline points="100,50 65,50" fill="none" stroke="#000" stroke-width="2" />
                                <polyline points="35,35 65,35 65,65 35,65 35,35" fill="none" stroke="#000" stroke-width="2" />
                                <polyline points="0,80 20,80 35,65" fill="none" stroke="#000" stroke-width="2" />
                                <polyline points="50,100 50,65" fill="none" stroke="#000" stroke-width="2" />
                                <polyline points="65,65 80,80 100,80" fill="none" stroke="#000" stroke-width="2" />
                            </g>
                        </svg>
                        <div className={styles.card__chip_texture}></div>
                    </div>
                    <div className={styles.card__type}>credit</div>
                    <div className={styles.card__number}>
                        <span className={styles.card__digit_group}>{newCardNumber[0]}</span>
                        <span className={styles.card__digit_group}>{newCardNumber[1]}</span>
                        <span className={styles.card__digit_group}>{newCardNumber[2]}</span>    
                        <span className={styles.card__digit_group}>{newCardNumber[3]}</span>
                        
                    </div>
                    <div className={styles.card__valid_thru} aria-label="Valid thru">Valid<br />thru</div>
                    <div className={styles.card__exp_date}><time datetime="2038-01">{expirationDate}</time></div>
                    <div className={styles.card__name} aria-label="Dee Stroyer">{cardHolderName}</div>
                    <div className={styles.card__vendor} role="img" aria-labelledby="card-vendor">
                        <span id="card-vendor" className={styles.card__vendor_sr}>Mastercard</span>
                    </div>
                </div>
                <div className={styles.card__texture}></div>
            </div>
        </div>
    )
}   