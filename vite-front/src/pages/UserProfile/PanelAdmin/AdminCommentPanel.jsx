import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AdminCommentPanel.css';

export const AdminCommentPanel = () => {
	const [reportedComments, setReportedComments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/reviews?reportNb=3', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('report',data.data);
				setReportedComments(data.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching reported comments:', error);
				setIsLoading(false);
			});
	}, []);

	const handleResetReportNb = (reportedComment) => {
		fetch(
			import.meta.env.VITE_GW_HOSTNAME +
				`/api/v1/reviews/report/decline/${reportedComment.id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('userInfo')).access_token,
				},
			}
		).then((data) => {
			setReportedComments((prevComments) =>
				prevComments.filter((comment) => comment.id !== reportedComment.id)
			);
		});
	};

	const handleDeleteComment = (reportedComment) => {
		fetch(
			import.meta.env.VITE_GW_HOSTNAME +
				`/api/v1/reviews/${reportedComment.id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('userInfo')).access_token,
				},
			}
		).then(() => {
			setReportedComments((prevComments) =>
				prevComments.filter((comment) => comment.id !== reportedComment.id)
			);
		});
	};

	return (
		<div className="container mt-5">
			<div className="">
				<h3>Reported Comments</h3>
				{isLoading ? (
					<p>Loading...</p>
				) : reportedComments.length === 0 ? (
					<p>No reported comments</p>
				) : (
					reportedComments.map((reportedComment) => (
						<div
							className="border border 2border-dark p-4 rounded-4 width-50pc width-100 mt-4"
							key={reportedComment.id}
						>
							<p>
								<strong>Product: </strong>
								{reportedComment.product.name}
							</p>
							<p>
								<strong>Message: </strong>
								{reportedComment.description}
							</p>
							<p>
								<strong>Reported: </strong>
								{reportedComment.reports} times
							</p>
							<div className="action-button">
								<button
									className="btn btn-success mx-5"
									onClick={() => handleResetReportNb(reportedComment)}
								>
									Reset Report Number
								</button>
								<button
									className="btn btn-danger"
									onClick={() => handleDeleteComment(reportedComment)}
								>
									Delete Comment
								</button>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};
