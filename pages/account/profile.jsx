import styles from '../../styles/Profile.module.css';

function Profile() {
    return (
        <div className={`${styles.container} container py-5 my-5`}>
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <h2>Profile</h2>
                    <hr />
                    <div className={`${styles.card} card shadow-sm mb-4`}>
                        <div className="card-body">
                            <h5 className={`${styles.card_title} card-title`}>Personal Information</h5>
                            <div className="mb-3">
                                <label className={`${styles.form_label} form-label`}>Full Name</label>
                                <input type="text" className={`${styles.form_control} form-control`} />
                            </div>
                            <div className="mb-3">
                                <label className={`${styles.form_label} form-label`}>Email Address</label>
                                <input type="email" className={`${styles.form_control} form-control`} />
                            </div>
                            <div className="mb-3">
                                <label className={`${styles.form_label} form-label`}>Phone Number</label>
                                <input type="tel" className={`${styles.form_control} form-control`} />
                            </div>
                            <button className={`${styles.btn_primary} btn-primary btn`}>Save Changes</button>
                        </div>
                    </div>
                    <div className={`${styles.card} card shadow-sm`}>
                        <div className="card-body">
                            <h5 className={`${styles.card_title} card-title`}>Change Password</h5>
                            <div className="mb-3">
                                <label className={`${styles.form_label} form-label`}>Current Password</label>
                                <input type="password" className={`${styles.form_control} form-control`} />
                            </div>
                            <div className="mb-3">
                                <label className={`${styles.form_label} form-label`}>New Password</label>
                                <input type="password" className={`${styles.form_control} form-control`} />
                            </div>
                            <div className="mb-3">
                                <label className={`${styles.form_label} form-label`}>Confirm New Password</label>
                                <input type="password" className={`${styles.form_control} form-control`} />
                            </div>
                            <button className={`${styles.btn_primary} btn-primary btn`}>Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
