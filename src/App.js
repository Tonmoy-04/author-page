import React, { useState } from 'react';
import './App.css';
import authorImage from './Assets/author.jpg';
import Reactions from './components/Reactions';
import CommentSection from './components/CommentSection';
import Pagination from './components/Pagination';

function App() {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Getting Started with React Hooks",
      content: "React Hooks revolutionized how we write components. They allow you to use state and other React features without writing classes.",
      date: "May 15, 2023",
      likes: 42,
      comments: 8,
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
  
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: ''
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 2;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
    }
  };

  const updateReactions = (id, type) => {
    setArticles(articles.map(article => {
      if (article.id === id) {
        return { ...article, [type]: article[type] + 1 };
      }
      return article;
    }));
  };

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <div className="app">
      <div className="profile-header">
        <div className="profile-banner"></div>
        <div className="profile-info">
          <img src={authorImage} alt="Author" className="profile-pic" />
          <div className="profile-details">
            <h1>Alex Johnson</h1>
            <p>@reactdev</p>
            <p>Frontend Developer | React Enthusiast | Sharing my coding journey</p>
            <div className="profile-stats">
              <div>
                <strong>{articles.length}</strong>
                <span>Articles</span>
              </div>
              <div>
                <strong>1.2k</strong>
                <span>Followers</span>
              </div>
              <div>
                <strong>356</strong>
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
                  <h4>Alex Johnson</h4>
                  <p className="article-date">@{article.date}</p>
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
              <CommentSection articleId={article.id} />
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