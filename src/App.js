import React, { useState } from 'react';
import './App.css';
import authorImage from './Assets/author.jpg';
import Reactions from './components/Reactions';
import CommentSection from './components/CommentSection';
import Pagination from './components/Pagination';

function App() {
  // Author data
  const author = {
    name: "Noman Ahmed Tonmoy",
    handle: "@reactdev",
    bio: "Frontend Developer | React Enthusiast | Sharing my coding journey",
    followers: 1200,
    following: 356
  };

  // Articles state
  const [articles, setArticles] = useState([
     {
    id: 1,
    title: "Getting Started with React Hooks",
    content: "React Hooks revolutionized how we write components...",
    date: "May 15, 2023",
    likes: 42,
    comments: 0, // Initialize at 0
    shares: 12
  },
    {
      id: 2,
      title: "The Power of Context API",
      content: "Context provides a way to pass data through the component tree without having to pass props down manually at every level.",
      date: "June 2, 2023",
      likes: 35,
      comments: 5,
      shares: 7
    },
    {
      id: 3,
      title: "Optimizing React Performance",
      content: "Learn techniques like memoization, code splitting, and virtualization to make your React apps blazing fast.",
      date: "June 20, 2023",
      likes: 58,
      comments: 12,
      shares: 18
    }
  ]);
  
  // New article form state
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: ''
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 2;

  // Calculate current articles for pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle article submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newArticle.title.trim() && newArticle.content.trim()) {
      const article = {
        id: articles.length + 1,
        title: newArticle.title,
        content: newArticle.content,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        likes: 0,
        comments: 0,
        shares: 0
      };
      setArticles([article, ...articles]);
      setNewArticle({ title: '', content: '' });
      setCurrentPage(1); // Reset to first page when adding new article
    }
  };

  // Update reactions
  const updateReactions = (id, type) => {
    setArticles(articles.map(article => {
      if (article.id === id) {
        return { ...article, [type]: article[type] + 1 };
      }
      return article;
    }));
  };

  return (
    <div className="app">
      <div className="profile-header">
        <div className="profile-banner"></div>
        <div className="profile-info">
          <img src={authorImage} alt="Author" className="profile-pic" />
          <div className="profile-details">
            <h1>{author.name}</h1>
            <p>{author.handle}</p>
            <p>{author.bio}</p>
            <div className="profile-stats">
              <div>
                <strong>{articles.length}</strong>
                <span>Articles</span>
              </div>
              <div>
                <strong>{author.followers.toLocaleString()}</strong>
                <span>Followers</span>
              </div>
              <div>
                <strong>{author.following}</strong>
                <span>Following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container">
        <div className="article-form">
          <h3>Write a new article</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Article title"
              value={newArticle.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="content"
              placeholder="What's on your mind?"
              value={newArticle.content}
              onChange={handleInputChange}
              required
            ></textarea>
            <button type="submit">Publish</button>
          </form>
        </div>

        <div className="articles-list">
          {currentArticles.map(article => (
            <div key={article.id} className="article-card">
              <div className="article-header">
                <img src={authorImage} alt="Author" className="article-author-pic" />
                <div>
                  <h4>{author.name}</h4>
                  <p className="article-date">{author.handle} · {article.date}</p>
                </div>
              </div>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
              <Reactions 
                likes={article.likes}
                comments={article.comments}
                shares={article.shares}
                onReaction={(type) => updateReactions(article.id, type)}
              />
              <CommentSection 
                articleId={article.id} 
                authorName={author.name}
                currentUser="New User" // Would normally come from auth
              />
            </div>
          ))}
        </div>

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default App;