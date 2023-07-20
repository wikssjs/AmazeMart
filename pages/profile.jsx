import React from 'react';

const Profile = () => {
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-8 offset-md-4">
                    <h4>Your Profile</h4>
                    <hr />
                    {/* Form to edit user profile details */}
                    <form>
                        <div className="form-group">
                            <label for="email">Email:</label>
                            <input type="email" className="form-control" id="email" placeholder="user@example.com" />
                        </div>
                        <div className="form-group">
                            <label for="username">Username:</label>
                            <input type="text" className="form-control" id="username" placeholder="Username" />
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
