import styles from '../../styles/Account.module.css'
import { useState } from 'react'
import AccountCard from '../../component/AccountCard';

function AccountPage() {
    const [admin, setAdmin] = useState(true);
    const links = [
        { href: '/account/profile', icon: 'bi-person', title: 'Profile', description: 'Edit your profile information and manage your account settings.' },
        { href: '/account/orders', icon: 'bi-receipt-cutoff', title: 'Orders', description: 'View your past orders, track current orders, and manage returns and refunds.' },
        { href: '/account/address', icon: 'bi-geo-alt', title: 'Address', description: 'Manage your shipping and billing addresses and set your default address.' },
        { href: '/account/settings', icon: 'bi-gear', title: 'Settings', description: 'Change your account settings, including privacy options, notifications, and more.' },
        { href: '/account/favorites', icon: 'bi-heart', title: 'Favorites', description: 'View and manage your favorite products.' },
        { href: '/account/payment', icon: 'bi-credit-card-2-front', title: 'Payment', description: 'Manage your payment methods and view transaction history.' },
        { href: '/account/notifications', icon: 'bi-bell', title: 'Notifications', description: 'Manage your notifications and email settings.' },
        { href: '/account/privacy', icon: 'bi-shield-lock', title: 'Privacy', description: 'Control your privacy settings and manage personal data.' },
        { href: '/account/help', icon: 'bi-question-circle', title: 'Help', description: 'Get help with your account or report a problem.' },
        { href: '/admin/dashboard', icon: 'bi-person-gear', title: 'Admin', description: 'Get help with your account or report a problem.' }
    ]

    return (
        <div className={`${styles.container} container py-5 my-5`}>
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-10">
                    <div className="text-center">
                        <h2 className="mb-3">Your Account</h2>
                        <p>Manage your account settings and personal details</p>
                    </div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4  animate__fadeInUp animate__animated">
                        <AccountCard data={links} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountPage;
