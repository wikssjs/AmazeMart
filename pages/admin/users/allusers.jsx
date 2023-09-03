import styles from '../../../styles/UsersPage.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
   

    useEffect(() => {
       fetch('https://amazemart-1f4e9d6a5f39.herokuapp.com/getUsers')
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
            });
    }, []);


    return (
        <div className={styles.users_container}>
            <h1 className={styles.users_title}>Users List</h1>

            <table className={`table table-bordered ${styles.users_table}`}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td><Link href={`/admin/users/${user.id}`}>{user.fullname}</Link></td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
