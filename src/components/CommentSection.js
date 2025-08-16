import React, { useState } from 'react';
import './CommentSection.css';

function CommentSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: newComment,
          author: 'You',
          date: new Date().toLocaleTimeString()
        }
      ]);
      setNewComment('');
    }
  };

  return (
    <div className="comment-section">
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Post</button>
      </form>
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <strong>{comment.author}</strong>
            <span className="comment-date">{comment.date}</span>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;