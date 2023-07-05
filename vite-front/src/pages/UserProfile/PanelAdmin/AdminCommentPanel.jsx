import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './AdminCommentPanel.css'

export const AdminCommentPanel = () => {
    const [reportedComments, setReportedComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(() => {
      fetch(import.meta.env.VITE_GW_HOSTNAME+'/api/v1/reviews?reportNb=3', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
        }
      })
        .then(response => response.json())
        .then(data => {
          setReportedComments(data.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Error fetching reported comments:", error);
          setIsLoading(false);
        });
    }, []);
    
    const handleResetReportNb = (reportedComment) => {
        fetch(import.meta.env.VITE_GW_HOSTNAME+`/api/v1/reviews/report/decline/${reportedComment.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
            }
        })
        .then(data => {
            console.log("data", data);
            // Mise à jour de l'état après la suppression
            setReportedComments(prevComments => prevComments.filter(comment => comment.id !== reportedComment.id));
        });
    }; 
 
    const handleDeleteComment = (reportedComment) => {
        fetch(import.meta.env.VITE_GW_HOSTNAME+`/api/v1/reviews/${reportedComment.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
            }
        })
        .then(data => {
            console.log("data", data.data);
            // Mise à jour de l'état après la suppression
            setReportedComments(prevComments => prevComments.filter(comment => comment.id !== reportedComment.id));
        });
    };
  
    return (
      <div className="admin-comment-panel">
        <h3>Reported Comments</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : reportedComments.length === 0 ? (
          <p>No reported comments</p>
        ) : (
          reportedComments.map((reportedComment) => (
            <div className="reported-comment" key={reportedComment.id}>
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
                {reportedComment.reportNb} times
              </p>
              <div className="action-button">
                <button 
                    className="update-comment-btn" 
                    onClick={() => handleResetReportNb(reportedComment)}
                >
                    Reset Report Number
                </button>
                <button 
                    className="delete-comment-btn"  
                    onClick={() => handleDeleteComment(reportedComment)}
                >
                    Delete Comment
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
};
