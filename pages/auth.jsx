import styles from '../styles/auth.module.css'
import { useRouter } from 'next/router'

export default function Login() {

	const router = useRouter()

	const registerUser = async event => {
		event.preventDefault()

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
			alert("User registered successfully");
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

	}


	return (
		<main className={styles.main_wrapper}>
			<div className={styles.main}>
				<input type="checkbox" id="chk" aria-hidden="true" className={`${styles.chk} d-none`}/>

				<div className={styles.signup}>
					<form onSubmit={registerUser}>
						<label for="chk" aria-hidden="true">Sign up</label>
						<input type="text" name="txt" placeholder="Full Name" required="" />
						<input type="email" name="email" placeholder="Email" required="" />
						<input type="Number" name="phone" placeholder="Phone Number" required="" />
						<input type="password" name="pswd" placeholder="Password" required="" />
						<button type='submit'>Sign up</button>
					</form>
				</div>

				<div className={styles.login}>
					<form onSubmit={loginUser}>
						<label for="chk" aria-hidden="true">Login</label>
						<input type="email" name="email" placeholder="Email" required="" />
						<input type="password" name="pswd" placeholder="Password" required="" />
						<button type='submit'>Login</button>
					</form>
				</div>
			</div>
		</main>


	);
}