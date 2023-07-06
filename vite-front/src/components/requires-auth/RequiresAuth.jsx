import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
	const { userInfo } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	if (!userInfo || !userInfo.access_token) {
		navigate('/login');
		return null;
	} else {
		return children;
	}
};

export default RequireAuth;
