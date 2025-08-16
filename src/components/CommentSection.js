import React, { useState } from "react";

const CommentSection = ({ comments, currentUser, onAddComment, onReply, postId }) => {
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState({});

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    onAddComment(postId, commentText);
    setCommentText("");
  };

  const handleReply = (commentId) => {
    if (!replyText[commentId]?.trim()) return;
    onReply(postId, commentId, replyText[commentId]);
    setReplyText({ ...replyText, [commentId]: "" });
  };

  return (
    <div className="comments">
      {comments.map((c) => (
        <div key={c.id} className="comment">
          <div className="comment-user">
            <img src={c.user.photo} alt={c.user.name} className="comment-user-photo" />
            <strong>{c.user.name}</strong>
          </div>
          <p>{c.text}</p>

          {c.replies.map((r) => (
            <div key={r.id} className="reply">
              <div className="comment-user">
                <img src={r.user.photo} alt={r.user.name} className="comment-user-photo" />
                <strong>{r.user.name}</strong>
              </div>
              <p>{r.text}</p>
            </div>
          ))}

          <div className="reply-box">
            <input
              type="text"
              placeholder="Write a reply..."
              value={replyText[c.id] || ""}
              onChange={(e) => setReplyText({ ...replyText, [c.id]: e.target.value })}
            />
            <button onClick={() => handleReply(c.id)}>Reply</button>
          </div>
        </div>
      ))}

      <div className="comment-input">
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleAddComment}>Post</button>
      </div>
    </div>
  );
};

export default CommentSection;
