import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const params = new URLSearchParams();

        if (topic) params.set("topic", topic);
        if (sortBy) params.set("sort_by", sortBy);
        if (order) params.set("order", order);

        const url = `https://northcoders-news-be-ngc3.onrender.com/api/articles?${params.toString()}`;
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
  }, [topic, sortBy, order]);

  const handleSortChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", e.target.value);
    setSearchParams(newParams);
  };

  const handleOrderChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", e.target.value);
    setSearchParams(newParams);
  };

  const handleTopicChange = (newTopic) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", newTopic);
    setSearchParams(newParams);
  };

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
      <div className="article-queries">
        <div className="article-filters">
          <select value={sortBy} onChange={handleSortChange}>
            <option value="created_at">Date</option>
            <option value="title">Title</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
            <option value="author">User</option>
          </select>
          <select value={order} onChange={handleOrderChange}>
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </div>
        <div className="article-topic-button-container">
          <button
            className="article-topic-button"
            onClick={() => handleTopicChange("coding")}
          >
            Coding
          </button>
          <button
            className="article-topic-button"
            onClick={() => handleTopicChange("cooking")}
          >
            Cooking
          </button>
          <button
            className="article-topic-button"
            onClick={() => handleTopicChange("football")}
          >
            Football
          </button>
        </div>
      </div>
      <ul className="article-list">
        {articles.map((article) => (
          <li key={article.article_id} className="article-card">
            <div className="article-title-link">
              <Link to={`/articles/${article.article_id}`}>
                <h3>{article.title}</h3>
              </Link>
            </div>
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
