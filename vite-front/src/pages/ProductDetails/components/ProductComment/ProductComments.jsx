import React from "react";
import "./ProductComments.css";

export const ProductComments = () => {
  const comments = [
    { id: 1, author: "John", text: "Great product!", date: "2023-07-04" },
    { id: 2, author: "Jane", text: "I love it!", date: "2023-07-03" },
    { id: 3, author: "Mike", text: "Highly recommended.", date: "2023-07-02" },
  ];

  const handleReportComment = (commentId) => {
    // Logic to report the comment and check for deletion after 3 reports
  };

  const renderComments = () => {
    return comments.map((comment) => (
      <div className="one-comment comment" key={comment.id}>
        <div>
            <div className="author-date">
                <div className="comment-author">{comment.author}</div>
                <div className="comment-date">{comment.date}</div>
            </div>
            <div className="comment-text">{comment.text}</div>
        </div>
        <div>
            <button
                className="report-comment-btn"
                onClick={() => handleReportComment(comment.id)}
                >
                Report
            </button>
        </div>
       
      </div>
    ));
  };

  return (
    <div className="product-comments-container">
      <h2 className="section-title">Product Comments</h2>
      <form className="comment-form">
        <textarea className="comment-input" placeholder="Leave a comment"></textarea>
        <button className="submit-comment-btn">Submit</button>
      </form>

      <div className="comments-list">
        {renderComments()}
      </div>
    </div>
  );
};
