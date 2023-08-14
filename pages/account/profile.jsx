import { useEffect, useState } from 'react';
import styles from '../../styles/Profile.module.css';
import { decode } from 'jsonwebtoken';

function Profile() {
    const [editMode, setEditMode] = useState(false);
    const [userProfile, setUserProfile] = useState({
        fullname: "John Doe",
        email: " John",
        phone: "",
        password: "",
    });

    const [userPassword , setUserPassword] = useState({
        currentPassword : "",
        newPassword : "",
        confirmPassword : ""
    })
    

    useEffect(() => {
    fetch('http://localhost:3001/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'user-id':decode(localStorage.getItem('token')).id
        },
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            setUserProfile({
                fullname: json?.user?.fullname,
                email: json?.user?.email,
                phone: json?.user?.phone,
                password: "secret",
            });
        }
        )
    }, []);


    const handleChange = (e, field) => {
        setUserProfile({
            ...userProfile,
            [field]: e.target.value,
        });
    };

    const handlePasswordChange = (e,field) => {
        setUserPassword({
            ...userPassword,
            [field] : e.target.value
        })
    }

    
    const toggleEditMode = (event) => {
        event.preventDefault();
        setEditMode(!editMode);
        if (editMode) {
            // Save changes
            fetch('http://localhost:3001/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id':decode(localStorage.getItem('token')).id
                },
                body: JSON.stringify({
                    fullname: userProfile.fullname,
                    email: userProfile.email,
                    phone: userProfile.phone,
                    password: userProfile.password,
                }),
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                }
                )
        }
        
    };

    const changePassword = (event) => {
        event.preventDefault();

        if(userPassword.newPassword !== userPassword.confirmPassword){
            alert("Password doesn't match");
            return;
        }


        fetch('http://localhost:3001/profile/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'user-id':decode(localStorage.getItem('token')).id
            },
            body: JSON.stringify({
                currentPassword : userPassword.currentPassword,
                newPassword: userPassword.newPassword,
            }),
        })
            .then(response => response.json()) 
            .then(json => {
                console.log(json);
            }
            )


        alert('Change password');
    };




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
                                {editMode ? 
                                    <input 
                                        type="text" 
                                        className={`${styles.form_control} form-control`} 
                                        value={userProfile.fullname}
                                        onChange={(e) => handleChange(e, 'name')}
                                    /> 
                                    : <p>{userProfile.fullname}</p>
                                }
                            </div>
                            <div className="mb-3">
                                <label className={`${styles.form_label} form-label`}>Email Address</label>
                                {editMode ? 
                                    <input 
                                        type="email" 
                                        className={`${styles.form_control} form-control`} 
                                        value={userProfile.email}
                                        onChange={(e) => handleChange(e, 'email')}
                                    /> 
                                    : <p>{userProfile.email}</p>
                                }
                            </div>
                            <div className="mb-3">
                                <label className={`${styles.form_label} form-label`}>Phone Number</label>
                                {editMode ? 
                                    <input 
                                        type="tel" 
                                        className={`${styles.form_control} form-control`} 
                                        value={userProfile.phone}
                                        onChange={(e) => handleChange(e, 'phone')}
                                    /> 
                                    : <p>{userProfile.phone}</p>
                                }
                            </div>
                            <button 
                                className={`${styles.btn_primary} btn-primary btn`} 
                                onClick={toggleEditMode}>
                                {editMode ? "Save Changes" : "Edit Profile"}
                            </button>
                        </div>
                    </div>
                    <div className={`${styles.card} card shadow-sm`}>
                        <div className="card-body">
                            <h5 className={`${styles.card_title} card-title`}>Change Password</h5>
                            <div className="mb-3">
                                <label className={`${styles.form_label} form-label`}>Current Password</label>
                                {editMode ? 
                                    <input 
                                        type="password" 
                                        className={`${styles.form_control} form-control`} 
                                        value={userPassword.currentPassword}
                                        onChange={(e) => handlePasswordChange(e, 'currentPassword')}
                                    /> 
                                    : <p>*********</p>
                                }
                            </div>
                            {editMode &&
                                <>
                                    <div className="mb-3">
                                        <label className={`${styles.form_label} form-label`}>New Password</label>
                                        <input value={userPassword.newPassword} onChange={(e) =>handlePasswordChange(e,"newPassword")} type="password" className={`${styles.form_control} form-control`} />
                                    </div>
                                    <div className="mb-3">
                                        <label className={`${styles.form_label} form-label`}>Confirm New Password</label>
                                        <input value={userPassword.confirmPassword} onChange={(e) =>handlePasswordChange(e,"confirmPassword")} type="password" className={`${styles.form_control} form-control`} />
                                    </div>
                                    <button onClick={changePassword} className={`${styles.btn_primary} btn-primary btn`}>Change Password</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
