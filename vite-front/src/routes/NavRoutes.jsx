import React from 'react';
import { Home } from '../pages/Home/Home';
import { Cart } from '../pages/Cart/Cart';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/auth/Login/Login';
import { ProductListing } from '../pages/ProductListing/ProductListing';
import { ProductDetails } from '../pages/ProductDetails/ProductDetails';
import { Signup } from '../pages/auth/Signup/Signup';
import { Logout } from '../pages/auth/Logout/Logout';
import { UserProfile } from '../pages/UserProfile/UserProfile';
import { Orders } from '../pages/UserProfile/Orders/Orders';
import { PageNotFound } from '../pages/PageNotFound/PageNotFound';
import App from '../App';
import { useEffect, useState } from 'react';
import Payment from '../components/Stripe/Payment';
import Completion from '../components/Stripe/Completion';
import { loadStripe } from '@stripe/stripe-js';
import RequireAuth from '../components/requires-auth/RequiresAuth';
import { EditProduct } from '../pages/UserProfile/Profile/Product/EditProduct';
import AdminRoutes from '../components/AdminRoutes/AdminRoutes';

export const NavRoutes = () => {
	const [stripePromise, setStripePromise] = useState(null);

	useEffect(() => {
		const stripePublicKey =
			'pk_test_51IviNhJqYqfbWn1gui3IgmAr493J9bTJcQtzWniQug84wjy4KLchXOyb0HLwPPNng5pkRXYA875XhnEffSUQ2n9Z00OeG28FbA';
		setStripePromise(loadStripe(stripePublicKey));
	}, []);
	return (
		<Routes path="/" element={<App />}>
			<Route path="/" element={<Home />} />
			<Route
				path="/cart"
				element={
					<RequireAuth>
						<Cart />
					</RequireAuth>
				}
			/>

			<Route
				path="/edit-product/:productId"
				element={
					<RequireAuth>
						<AdminRoutes>
							<EditProduct />
						</AdminRoutes>
					</RequireAuth>
				}
			/>
			<Route
				path="/product-listing"
				element={
					<RequireAuth>
						<ProductListing />
					</RequireAuth>
				}
			/>
			<Route
				path="/product-details/:productId"
				element={
					<RequireAuth>
						<ProductDetails />
					</RequireAuth>
				}
			/>
			<Route path="/signup" element={<Signup />} />
			<Route
				path="/profile"
				element={
					<RequireAuth>
						<UserProfile />
					</RequireAuth>
				}
			>
			</Route>

			<Route
				path="/payment/:basketId"
				element={
					<RequireAuth>
						<Payment stripePromise={stripePromise} />
					</RequireAuth>
				}
			/>
			<Route
				path="/completion"
				element={
					<RequireAuth>
						<Completion stripePromise={stripePromise} />
					</RequireAuth>
				}
			/>
			<Route path="/login" element={<Login />} />
			<Route
				path="/logout"
				element={
					<RequireAuth>
						<Logout />
					</RequireAuth>
				}
			/>
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};
