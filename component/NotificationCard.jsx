import styles from '../styles/NotificationCard.module.css'
import { useState } from 'react'
import { useShowNotification } from './ShowNotificationContext';

export default function NotificationCard({ showNoti, setShowNoti, notiText }) {
    const { notificationState, setNotificationState } = useShowNotification();
    return (
        <>
{
        <div class={`${styles.card} ${notificationState.isTrue ? " animate__bounceInUp ":" animate__bounceOutDown "} animate__animated p-3`}>
            <div class={styles.bg}></div>
            <div class={styles.blob}></div>
            <p className={`text-${notificationState.color}`}>{notificationState.text}</p>
        </div>
}
        </>


    )

}