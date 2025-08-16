import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticlePage from "./pages/ArticlePage";
import AuthorPage from "./pages/AuthorPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticlePage />} />
        <Route path="/author/:name" element={<AuthorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
