import React, { useRef, useState } from "react";
import Header from "./Header";
import { formValidate } from "../utils/validation";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/store/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
	const [isSignInForm, setIsSignInForm] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const name = useRef(null);
	const email = useRef(null);
	const password = useRef(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const toggleForm = () => {
		setIsSignInForm(!isSignInForm);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const message = formValidate(email.current.value, password.current.value);
		setErrorMessage(message);
		if (message) return;
		if (!isSignInForm) {
			//sign up logic
			createUserWithEmailAndPassword(
				auth,
				// name.current.value,
				email.current.value,
				password.current.value
			)
				.then((userCredential) => {
					// Signed up
					const user = userCredential.user;
					updateProfile(user, {
						displayName: name.current.value,
						photoURL: "https://avatars.githubusercontent.com/u/56780644?v=4",
					})
						.then(() => {
							// Profile updated!
							const { uid, email, displayName, photoURL } = auth.currentUser;
							dispatch(addUser({ uid, email, displayName, photoURL }));

							navigate("/browse");
						})
						.catch((error) => {
							setErrorMessage(error.message);
						});
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					// ..
					setErrorMessage(errorCode + " - " + errorMessage);
				});
		} else {
			// sign in logic
			signInWithEmailAndPassword(
				auth,
				email.current.value,
				password.current.value
			)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					console.log(user);
					navigate("/browse");
					// ...
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setErrorMessage(errorCode + " - " + errorMessage);
				});
		}
		email.current.value = "";
		password.current.value = "";
	};

	return (
		<div>
			<Header />
			<div className='absolute'>
				<img
					src='https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/b5953637-091d-4e02-9754-2bfadc8a8f7c/IN-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg'
					alt='bg-img'
				/>
			</div>
			<form className=' w-4/12 absolute bg-black p-20 rounded-md my-36 mx-auto right-0 left-0 bg-opacity-80'>
				<h1 className='text-3xl text-white mb-7'>
					{isSignInForm ? "Sign In" : "Sign Up"}
				</h1>
				{!isSignInForm && (
					<input
						ref={name}
						type='text'
						placeholder='Name'
						className='p-3 mb-5 w-full bg-gray-800 rounded-md text-white'
					/>
				)}
				<input
					ref={email}
					type='text'
					placeholder='Email or phone number'
					className='p-3 mb-5 w-full bg-gray-800 rounded-md text-white'
				/>
				<input
					ref={password}
					type='password'
					placeholder='Password'
					className='p-3  bg-gray-800 w-full rounded-md text-white'
				/>
				<p className='text-red-500 text-lg font-bold py-2'>{errorMessage}</p>
				<button
					onClick={handleSubmit}
					className='bg-red-600 text-white rounded-md mt-6 w-full p-3'
				>
					{isSignInForm ? "Sign In" : "Sign Up"}
				</button>
				<p onClick={toggleForm} className='py-12 cursor-pointer text-white'>
					{isSignInForm
						? "New to Netflix? Sign up now"
						: "Already Register! Sign in now."}
				</p>
			</form>
		</div>
	);
};

export default Login;
