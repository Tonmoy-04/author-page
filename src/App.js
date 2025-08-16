import React, { useState } from "react";
import "./App.css";
import profilePic from "./Assets/author.jpg";
import janePic from "./Assets/user2.jpg";
import johnPic from "./Assets/user1.jpg";
import alicePic from "./Assets/user3.jpg";

import ReactionBar from "./components/Reactions";
import CommentSection from "./components/CommentSection";
import Pagination from "./components/Pagination";

function App() {
  const currentUser = {
    name: "Noman Ahmed Tonmoy",
    photo: profilePic,
    designation: "Software Engineer",
  };

  const dummyPosts = [
    {
      id: 1,
      content: "Just finished my React project!",
      reaction: null,
      comments: [
        { id: 1, text: "Awesome work!", user: { name: "User 1", photo: janePic }, replies: [] },
        { id: 2, text: "Keep it up!", user: { name: "User 2", photo: johnPic }, replies: [] },
      ],
    },
    {
      id: 2,
      content: "Learning new features in JavaScript.",
      reaction: null,
      comments: [
        { id: 3, text: "Very helpful!", user: { name: "User 3", photo: alicePic }, replies: [] },
      ],
    },
    {
      id: 3,
      content: "Designing a modern author page using React.",
      reaction: null,
      comments: [],
    },
    {
      id: 4,
      content: "Excited to share my coding journey.",
      reaction: null,
      comments: [],
    },
  ];

  const [posts, setPosts] = useState(dummyPosts);
  const [newPost, setNewPost] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;

  const addPost = () => {
    if (!newPost.trim()) return;
    setPosts([
      { id: Date.now(), content: newPost, reaction: null, comments: [] },
      ...posts,
    ]);
    setNewPost("");
  };

  const handleReact = (postId, type) => {
    setPosts(
      posts.map((p) =>
        p.id === postId
          ? { ...p, reaction: p.reaction === type ? null : type } // toggle reaction
          : p
      )
    );
  };

  const handleAddComment = (postId, text) => {
    setPosts(
      posts.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, { id: Date.now(), text, user: currentUser, replies: [] }] }
          : p
      )
    );
  };

  const handleReply = (postId, commentId, text) => {
    setPosts(
      posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: p.comments.map((c) =>
                c.id === commentId
                  ? { ...c, replies: [...c.replies, { id: Date.now(), text, user: currentUser }] }
                  : c
              ),
            }
          : p
      )
    );
  };

  // Pagination logic
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="app-container">
      {/* Profile Header */}
      <div className="profile-header">
        <img src={currentUser.photo} alt="profile" className="profile-photo" />
        <div>
          <h2>{currentUser.name}</h2>
          <p>{currentUser.designation}</p>
          <div className="profile-stats">
            <span>Followers: 120</span>
            <span>Following: 80</span>
            <span>Articles: {posts.length}</span>
          </div>
        </div>
      </div>

      {/* New Post */}
      <div className="new-post">
        <textarea
          placeholder="Write your article..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={addPost}>Post</button>
      </div>

      {/* Posts Feed */}
      {currentPosts.map((post) => (
        <div key={post.id} className="post">
          <p>{post.content}</p>
          <ReactionBar reaction={post.reaction} onReact={(type) => handleReact(post.id, type)} />
          <CommentSection
            comments={post.comments}
            currentUser={currentUser}
            onAddComment={handleAddComment}
            onReply={handleReply}
            postId={post.id}
          />
        </div>
      ))}

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

export default App;
