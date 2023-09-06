import './Configurateur.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ConfigurateurDesktop } from './ConfigurateurDesktop/ConfigurateurDesktop';

export const Configurateur = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	if (!userInfo || !userInfo.access_token) {
		navigate('/login');
		return null;
	}

	return (
		<div className='container-fluid'>

			<div className="header text-center">
				<h1 class="text-center">PC Configurator</h1>
				<p class="text-center">A tailor-made PC, component compatibility guaranteed!</p>
			</div>
			
			
			<div className="text-center configurateur-container">
				{/* <div className="configurateur-header">
					In just a few clicks, create a unique desktop to suit your needs and budget with the PC configurator. Office, gaming, editing, design your own PC with ease.
					<button className="configurateur-button">Start your configuration</button>
				</div> */}

				<ConfigurateurDesktop />

			</div>
		</div>
	);
};
