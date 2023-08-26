import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/AccountCard.module.scss'
import Link from 'next/link';




const AccountCard = ({ data }) => {
    const [isLight, setIsLight] = useState(false);
    const bodyRef = useRef(null);

    useEffect(() => {
        bodyRef.current = document.querySelector('body');
    }, []);

    const handleToggle = () => {
        if (bodyRef.current) {
            bodyRef.current.classList.add('toggle');

            setTimeout(() => {
                setIsLight(!isLight);
                bodyRef.current.classList.toggle('light');

                setTimeout(() => {
                    bodyRef.current.classList.remove('toggle');
                }, 10);
            }, 5);
        }
    };

    return (
        <>
            <div className={`${styles.main}`}>

                <div class={`${styles.grid} row align-items-center mx-auto`}>
                    {
                        data.map((item, index) => (
                            <Link href={item.href} key={index}  class={`${styles.card} col-3  mx-auto`}>
                                                                    <span class={styles.icon}>
                                        
                                        <i className={`bi ${item.icon}`}></i>
                                    </span>
                                    <h4>{item.title}</h4>
                                    <p>
                                        {item.description}
                                    </p>
                                    <div class={styles.shine}></div>
                                    <div class={styles.background}>
                                        <div class={styles.tiles}>
                                            <div class={`${styles.tile} ${styles.tile_1}`}></div>
                                            <div class={`${styles.tile} ${styles.tile_2}`}></div>
                                            <div class={`${styles.tile} ${styles.tile_3}`}></div>
                                            <div class={`${styles.tile} ${styles.tile_4}`}></div>
    
                                            <div class={`${styles.tile} ${styles.tile_5}`}></div>
                                            <div class={`${styles.tile} ${styles.tile_6}`}></div>
                                            <div class={`${styles.tile} ${styles.tile_7}`}></div>
                                            <div class={`${styles.tile} ${styles.tile_8}`}></div>
    
                                            <div class={`${styles.tile} ${styles.tile_9}`}></div>
                                            <div class={`${styles.tile} ${styles.tile_10}`}></div>
                                        </div>
    
                                        <div class={`${styles.line} ${styles.line_1}`}></div>
                                        <div class={`${styles.line} ${styles.line_2}`}></div>
                                        <div class={`${styles.line} ${styles.line_3}`}></div>
                                    </div>
                            </Link>
                            ))

                    }

                </div>
            </div>
        </>

    );
};

export default AccountCard;
