import styles from '../../styles/Account.module.css'
import Link from 'next/link'
import { useState } from 'react'

function AccountPage() {
    const [admin, setAdmin] = useState(true);
    const links = [
        { href: '/account/profile', icon: 'bi-person-fill', title: 'Profile', description: 'Edit your profile information and manage your account settings.' },
        { href: '/account/orders', icon: 'bi-receipt-cutoff', title: 'Orders', description: 'View your past orders, track current orders, and manage returns and refunds.' },
        { href: '/account/address', icon: 'bi-geo-alt-fill', title: 'Address', description: 'Manage your shipping and billing addresses and set your default address.' },
        { href: '/account/settings', icon: 'bi-gear-fill', title: 'Settings', description: 'Change your account settings, including privacy options, notifications, and more.' },
        { href: '/account/favorites', icon: 'bi-heart-fill', title: 'Favorites', description: 'View and manage your favorite products.' },
        { href: '/account/payment', icon: 'bi-credit-card-2-front-fill', title: 'Payment', description: 'Manage your payment methods and view transaction history.' },
        { href: '/account/notifications', icon: 'bi-bell-fill', title: 'Notifications', description: 'Manage your notifications and email settings.' },
        { href: '/account/privacy', icon: 'bi-shield-lock-fill', title: 'Privacy', description: 'Control your privacy settings and manage personal data.' },
        { href: '/account/help', icon: 'bi-question-circle-fill', title: 'Help', description: 'Get help with your account or report a problem.' },
        { href: '/admin/dashboard', icon: 'bi-question-circle-fill', title: 'Admin', description: 'Get help with your account or report a problem.' }
    ]

    return (
        <div className={`${styles.container} container py-5 my-5`}>
            <div className="row justify-content-center">
                <div className="col-lg-10 col-md-12">
                    <div className="mb-5 text-center">
                        <h2 className="mb-3">Your Account</h2>
                        <p>Manage your account settings and personal details</p>
                    </div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                        {links
                            .filter(link => !(link.title === "Admin" && !admin))
                            .map((link, i) => (
                                <div className="col" key={i}>
                                    <Link href={link.href} className='text-decoration-none'>
                                        <div className={`${styles.card} card shadow-lg h-100`}>
                                            <div className={`${styles.card_body} card-body`}>
                                                <div className="d-flex align-items-center">
                                                    <i className={`bi ${link.icon} me-3`} style={{ fontSize: '2rem' }} />
                                                    <h5>{link.title}</h5>
                                                </div>
                                                <p >{link.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountPage;
