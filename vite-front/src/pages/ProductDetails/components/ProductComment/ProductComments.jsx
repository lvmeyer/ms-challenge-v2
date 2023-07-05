import React, { useEffect, useState } from "react";
import "./ProductComments.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


export const ProductComments = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const { productId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const [usersComments, setUsersComments] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_GW_HOSTNAME + "/api/v1/reviews", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userInfo")).access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setComments(data);
        } else {
          setComments([]);
        }
        setIsLoading(false);
    

    fetch(import.meta.env.VITE_GW_HOSTNAME + `/api/v1/products/${productId}`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userInfo")).access_token,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log("users commentaire", data.data.reviews);
        setUsersComments(data.data.reviews);
      });
    });
    }, []);

  const handleCommentSubmit = () => {
    fetch(import.meta.env.VITE_GW_HOSTNAME + "/api/v1/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("userInfo")).access_token,
      },
      body: JSON.stringify({
        description: commentText,
        productId: productId,
        rating: rating,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments((prevComments) => [...prevComments, data.data]);
        setCommentText("");
      });
  };

  const handleReportComment = (commentId) => {
    const alreadyReported = comments.some((comment) => comment.id === commentId && comment.isReported);
    if (alreadyReported) {
      return;
    }

    fetch(import.meta.env.VITE_GW_HOSTNAME + `/api/v1/reviews/report/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("userInfo")).access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setComments((prevComments) =>
          prevComments.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, isReported: true };
            }
            return comment;
          })
        );
      });
  };

  const renderComments = () => {
    return (
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : usersComments.length === 0 ? (
          <p>No reported comments</p>
        ) : (
          usersComments.map((usersComment) => (
            <div className="one-comment comment" key={usersComment.id}>
              <div>
                <div className="author-date">
                  <div className="comment-author">{userInfo.email}</div>
                  <div className="comment-date">{usersComment.rating}</div>
                </div>
                <div className="comment-text">{usersComment.description}</div>
              </div>
              <div>
                <button className="report-comment-btn" onClick={() => handleReportComment(usersComment.id)}>
                  Report
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };
  

  return (
    <div className="product-comments-container">
      <h2 className="section-title">Product Comments</h2>
      <form className="comment-form">
        <textarea
          className="comment-input"
          placeholder="Leave a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <div className="rating">
          <input
            type="radio"
            name="rating"
            id="rating-5"
            value="5"
            onChange={(e) => setRating(e.target.value)}
          />
          <label htmlFor="rating-5">5</label>
          <input
            type="radio"
            name="rating"
            id="rating-4"
            value="4"
            onChange={(e) => setRating(e.target.value)}
          />
          <label htmlFor="rating-4">4</label>
          <input
            type="radio"
            name="rating"
            id="rating-3"
            value="3"
            onChange={(e) => setRating(e.target.value)}
          />
          <label htmlFor="rating-3">3</label>
          <input
            type="radio"
            name="rating"
            id="rating-2"
            value="2"
            onChange={(e) => setRating(e.target.value)}
          />
          <label htmlFor="rating-2">2</label>
          <input
            type="radio"
            name="rating"
            id="rating-1"
            value="1"
            onChange={(e) => setRating(e.target.value)}
          />
          <label htmlFor="rating-1">1</label>
        </div>
        <button className="submit-comment-btn" type="button" onClick={() => handleCommentSubmit()}>
          Submit
        </button>
      </form>

      <div className="comments-list">{renderComments()}</div>
    </div>
  );
};
