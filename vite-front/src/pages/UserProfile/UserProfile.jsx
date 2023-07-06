import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import './UserProfile.css';
import { Profile } from './Profile/Profile';
import { AdminCommentPanel } from './PanelAdmin/AdminCommentPanel';
import { AdminProductPanel } from './AdminProductPanel/AdminProductPanel';

export const UserProfile = () => {
	const { userInfo } = useSelector((state) => state.auth);

	return (
		<div>
			<div className="user-profile-container">
				<div className="link-container">
					{userInfo && userInfo.role === 'ADMINISTRATOR' ? (
						<>
							<Profile />
							<AdminCommentPanel />
							<AdminProductPanel />
						</>
					) : (
						<>
							<Profile />
						</>
					)}
				</div>
			</div>
		</div>
	);
};
