import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
	const user = useSelector((store) => store.user);
	const navigate = useNavigate();
	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				navigate("/");
			})
			.catch((error) => {
				// An error happened.
				navigate("/error");
			});
	};

	return (
		<div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
			<div>
				<img
					className='w-44'
					src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
					alt='logo'
				/>
			</div>
			{user && (
				<div className=' flex  py-4 mr-4 '>
					<img className='w-12 h-12' alt='user icon' src={user?.photoURL} />
					<button
						onClick={handleSignOut}
						className='ml-4 bg-black text-white  px-4 rounded-lg'
					>
						Sign Out
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;
