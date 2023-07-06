import './Cart.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CartListing } from './components/CartListing/CartListing';

export const Cart = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	if (!userInfo || !userInfo.access_token) {
		navigate('/login');
		return null;
	}

	return (
		<div>
			<h1 className="page-heading">Cart</h1>
			<div className="cart-container">
				<CartListing />
			</div>
		</div>
	);
};
