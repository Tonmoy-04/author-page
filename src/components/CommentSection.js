import React, { useState } from 'react';
import './CommentSection.css';

function CommentSection({ articleId, authorName, currentUser, onCommentAdded }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (replyingTo) {
      // Handle reply - doesn't increment comment count
      setComments(comments.map(comment => {
        if (comment.id === replyingTo) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(),
                text: newComment,
                author: currentUser,
                date: "Just now"
              }
            ]
          };
        }
        return comment;
      })); // Added missing closing parenthesis here
    } else {
      // Handle new comment - increments count
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: newComment,
          author: currentUser,
          date: "Just now",
          replies: []
        }
      ]);
      onCommentAdded(); // Only call this for new top-level comments
    }

    setNewComment('');
    setReplyingTo(null);
  };

  return (
    <div className="comment-section">
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={replyingTo ? "Write a reply..." : "Add a comment..."}
        />
        <button type="submit">Post</button>
        {replyingTo && (
          <button 
            type="button" 
            onClick={() => setReplyingTo(null)}
            className="cancel-reply"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <strong>{comment.author}</strong>
              <span className="comment-date">{comment.date}</span>
            </div>
            <p>{comment.text}</p>
            
            <button 
              onClick={() => setReplyingTo(comment.id)}
              className="reply-button"
            >
              Reply
            </button>

            {comment.replies && comment.replies.length > 0 && (
              <div className="replies">
                {comment.replies.map(reply => (
                  <div key={reply.id} className="reply">
                    <div className="comment-header">
                      <strong>{reply.author}</strong>
                      <span className="comment-date">{reply.date}</span>
                    </div>
                    <p>{reply.text}</p>
                  </div>
                ))}
              </div>
            )}

            {replyingTo === comment.id && (
              <div className="replying-indicator">
                Replying to {comment.author}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;