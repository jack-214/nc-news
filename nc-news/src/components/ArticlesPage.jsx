import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url =
          "https://northcoders-news-be-ngc3.onrender.com/api/articles";
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }

        const data = await res.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchArticles();
  }, []);

  const handleVote = async (articleId, change) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.article_id === articleId
          ? { ...article, votes: article.votes + change }
          : article
      )
    );
    try {
      await fetch(
        `https://northcoders-news-be-ngc3.onrender.com/api/articles/${articleId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ inc_votes: change }),
        }
      );
    } catch (error) {
      console.error("Error updating vote:", error.message);
    }
  };

  return (
    <div className="articles-page">
      <ul className="article-list">
        {articles.map((article) => (
          <li key={article.article_id} className="article-card">
            <h3>{article.title}</h3>
            <div className="article-info-row">
              <div className="article-info">
                <p>
                  <strong>{article.author}</strong> |{" "}
                </p>
                <p>
                  <strong>
                    {article.topic[0].toUpperCase() +
                      article.topic.slice(1).toLowerCase()}
                  </strong>{" "}
                  |{" "}
                </p>
                <strong>Votes:</strong>{" "}
                <button
                  className="vote-button"
                  onClick={() => handleVote(article.article_id, 1)}
                >
                  {article.votes} +
                </button>{" "}
                <button
                  className="vote-button"
                  onClick={() => handleVote(article.article_id, -1)}
                >
                  -
                </button>{" "}
                | <strong>Comments:</strong> {article.comment_count} |
                <p>
                  <strong>Posted:</strong>{" "}
                  {new Date(article.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="article-button-wrapper">
                <Link to={`/articles/${article.article_id}`}>
                  <button className="article-button">Read more</button>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
