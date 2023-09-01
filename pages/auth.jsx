import styles from '../styles/auth.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useShowNotification } from '../component/ShowNotificationContext';

export default function Login() {

	const router = useRouter()
	const[isRegistered, setIsRegistered] = useState(false)
	const [registerError,setRegisterError] = useState('')
	const [loginError,setLoginError] = useState('')

	const {setNotificationState} = useShowNotification();
 
	const registerUser = async event => {
		event.preventDefault()

		let data ;

		const res = await fetch(
			'http://localhost:3001/user/register',
			{
				body: JSON.stringify({
					fullname: event.target.txt.value,
					email: event.target.email.value,
					phone: event.target.phone.value,
					password: event.target.pswd.value

				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}
		)

		if(res.ok){
			setIsRegistered(true)
			setNotificationState({
				isTrue: true,
				text: 'User Registered Successfully',
				color: 'success'
			})

			setTimeout (()=>{
				setNotificationState({
					isTrue: false,
					text: 'User Registered Successfully',
					color: 'success'
				})
			}, 3000)

		}else{
			data = await res.json();
			setRegisterError(data.message)
			setNotificationState({
				isTrue: true,
				text: 'User Registration Failed',
				color: 'danger'
			})

			setTimeout (()=>{
				setNotificationState({
					isTrue: false,
					text: 'User Registration Failed',
					color: 'danger'
				})
			}, 3000)
		}
	}

	const loginUser = async event => {
		event.preventDefault()

		const res = await fetch(
			'http://localhost:3001/user/login',
			{
				body: JSON.stringify({
					email: event.target.email.value,
					password: event.target.pswd.value
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}
		)

		const data = await res.json();

		if(res.ok){
			const token = data.token;
			localStorage.setItem('token', token);
			router.push('/');
			return;
		}
		else{
			setLoginError(data.message)
		}

	}


	return (
		<main className={styles.main_wrapper}>
			<div className={styles.main}>
				<input type="checkbox" id="chk" defaultChecked={isRegistered} aria-hidden="true" className={`${styles.chk} d-none`}/>

				<div className={styles.signup}>

					<form onSubmit={registerUser}>
						
						<label for="chk" aria-hidden="true">Sign up</label>
						<input type="text" name="txt" placeholder="Full Name" required="" />
						<input type="email" name="email" placeholder="Email" required="" />
						<input type="Number" name="phone" placeholder="Phone Number" required="" />
						<input type="password" name="pswd" placeholder="Password" required="" />
						<button type='submit'>Sign up</button>
						{registerError && <div className="alert alert-danger text-center mt-3">{registerError}</div>}
					</form>
				</div>

				<div className={styles.login}>
					<form onSubmit={loginUser}>
						<label for="chk" aria-hidden="true">Login</label>
						<input type="email" name="email" placeholder="Email" required="" />
						<input type="password" name="pswd" placeholder="Password" required="" />
						<button type='submit'>Login</button>
						{loginError && <div className="alert alert-danger text-center mt-3">{loginError}</div>}

					</form>
				</div>
			</div>
		</main>


	);
}