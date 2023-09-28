import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
	const [isSignInForm, setIsSignInForm] = useState(true);

	const toggleForm = () => {
		setIsSignInForm(!isSignInForm);
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
						type='text'
						placeholder='Name'
						className='p-3 mb-5 w-full bg-gray-800 rounded-md'
					/>
				)}
				<input
					type='text'
					placeholder='Email or phone number'
					className='p-3 mb-5 w-full bg-gray-800 rounded-md'
				/>
				<input
					type='text'
					placeholder='Email or phone number'
					className='p-3 mb-10  bg-gray-800 w-full rounded-md'
				/>
				<button className='bg-red-600 text-white rounded-md w-full p-3'>
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
