import React from 'react';
import { useSelector } from 'react-redux';

import './UserProfile.css';
import { Profile } from './Profile/Profile';

import { ConfigurateurDesktop } from './ConfigurateurDesktop/ConfigurateurDesktop';
import { AdminGestion } from './AdminGestion/AdminGestion';

export const UserProfile = () => {
	const { userInfo } = useSelector((state) => state.auth);

	return (
		<div>
			<div className="user-profile-container d-flex justify-content-evenly h-auto">
				<div className="container m-5">
					{userInfo && userInfo.role === 'ADMINISTRATOR' ? (
						<>
							<Profile />
							<AdminGestion />
						</>
					) : (
						<>
							<Profile />
							<ConfigurateurDesktop />
						</>
					)}
				</div>
			</div>
		</div>
	);
};
