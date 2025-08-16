import React, { useState } from "react";
import { FaThumbsUp, FaHeart, FaLaugh, FaComment } from "react-icons/fa";
import "./App.css";

const App = () => {
  const profile = {
    name: "Noman Ahmed Tonmoy",
    designation: "Software Engineer Aspirant",
    photo: "https://via.placeholder.com/120",
    followers: 150,
    following: 80,
    articles: 12,
  };

  const [posts, setPosts] = useState([]);

  const reactions = [
    { type: "like", icon: <FaThumbsUp /> },
    { type: "love", icon: <FaHeart /> },
    { type: "funny", icon: <FaLaugh /> },
  ];

  // Add new article
  const handleAddPost = (title, content) => {
    if (!content.trim()) return;
    setPosts((prev) => [
      {
        id: Date.now(),
        author: profile.name,
        title,
        content,
        reaction: null,
        comments: [],
      },
      ...prev,
    ]);
  };

  // Handle reactions
  const handleReaction = (postId, type) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, reaction: type } : p))
    );
  };

  // Add comment or reply (recursive)
  const addComment = (comments, parentId, text) => {
    if (parentId === null) {
      return [...comments, { id: Date.now(), text, replies: [] }];
    }
    return comments.map((c) =>
      c.id === parentId
        ? { ...c, replies: addComment(c.replies, null, text) }
        : { ...c, replies: addComment(c.replies, parentId, text) }
    );
  };

  const handleAddComment = (postId, parentId, text) => {
    if (!text.trim()) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: addComment(p.comments, parentId, text) }
          : p
      )
    );
  };

  return (
    <div className="app-container">
      {/* Profile Header */}
      <header className="profile-header">
        <img src={profile.photo} alt="Profile" className="profile-photo" />
        <div>
          <h1>{profile.name}</h1>
          <p>{profile.designation}</p>
          <div className="profile-stats">
            <span>Followers: {profile.followers}</span>
            <span>Articles: {profile.articles}</span>
            <span>Following: {profile.following}</span>
          </div>
        </div>
      </header>

      {/* Post Article Form */}
      <ArticleForm onAddPost={handleAddPost} />

      {/* Feed */}
      <div className="feed">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.author}</h3>
            {post.title && <h4>{post.title}</h4>}
            <p>{post.content}</p>

            {/* Reactions */}
            <div className="reactions">
              {reactions.map((r) => (
                <button
                  key={r.type}
                  className={`reaction-btn ${
                    post.reaction === r.type ? "active" : ""
                  }`}
                  onClick={() => handleReaction(post.id, r.type)}
                >
                  {r.icon}
                </button>
              ))}
            </div>

            {/* Comments */}
            <div className="comments">
              <h4>Comments:</h4>
              {post.comments.map((c) => (
                <Comment
                  key={c.id}
                  postId={post.id}
                  comment={c}
                  onAddComment={handleAddComment}
                />
              ))}

              {/* Add new top-level comment */}
              <AddCommentForm
                placeholder="Write a comment..."
                onAdd={(text) => handleAddComment(post.id, null, text)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Post Article Form
const ArticleForm = ({ onAddPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPost(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="article-form">
      <input
        type="text"
        placeholder="Article Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write your article here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
};

// Reusable Add Comment/Reply Form
const AddCommentForm = ({ onAdd, placeholder }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
};

// Recursive Comment Component
const Comment = ({ postId, comment, onAddComment }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);

  return (
    <div className="comment-thread">
      <p className="comment">
        <FaComment className="comment-icon" /> {comment.text}
      </p>
      <button
        className="reply-btn"
        onClick={() => setShowReplyBox((prev) => !prev)}
      >
        Reply
      </button>

      {showReplyBox && (
        <AddCommentForm
          placeholder="Write a reply..."
          onAdd={(text) => onAddComment(postId, comment.id, text)}
        />
      )}

      {/* Nested Replies */}
      <div className="replies">
        {comment.replies.map((r) => (
          <Comment
            key={r.id}
            postId={postId}
            comment={r}
            onAddComment={onAddComment}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
