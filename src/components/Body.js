import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { auth } from "../utils/firebase";
import Browse from "./Browse";
import Login from "./Login";
import { addUser, removeUser } from "../utils/store/userSlice";

const Body = () => {
	const dispatch = useDispatch();
	const appRouter = createBrowserRouter([
		{
			path: "/",
			element: <Login />,
		},
		{
			path: "/browse",
			element: <Browse />,
		},
	]);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const { uid, email, displayName, photoURL } = user;
				dispatch(addUser({ uid, email, displayName, photoURL }));

				// ...
			} else {
				// User is signed out
				// ...
				dispatch(removeUser());
			}
		});
	}, []);

	return (
		<div>
			<RouterProvider router={appRouter} />
		</div>
	);
};

export default Body;
