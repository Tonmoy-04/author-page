import React from 'react';
import './Reactions.css';

function Reactions({ likes, comments, shares, onReaction }) {
  return (
    <div className="reactions">
      <button onClick={() => onReaction('likes')}>
        <span role="img" aria-label="Like">👍</span> {likes}
      </button>
      <div className="comment-count">
        <span role="img" aria-label="Comment">💬</span> {comments}
      </div>
      <button onClick={() => onReaction('shares')}>
        <span role="img" aria-label="Share">🔗</span> {shares}
      </button>
    </div>
  );
}

export default Reactions;