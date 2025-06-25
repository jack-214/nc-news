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

  return (
    <div className="articles-page">
      <ul className="article-list">
        {articles.map((article) => (
          <li key={article.article_id} className="article-card">
            <h3>{article.title}</h3>
            <div className="article-info">
              <p>
                <strong>Author:</strong> {article.author}
              </p>
              <p>
                <strong>Topic:</strong> {article.topic}
              </p>
              <p>
                <strong>Votes:</strong> {article.votes} |{" "}
                <strong>Comments:</strong> {article.comment_count}
              </p>
              <p>
                <strong>Posted on:</strong>{" "}
                {new Date(article.created_at).toLocaleDateString()}
              </p>
              <img
                src={article.article_img_url}
                alt={article.title}
                className="article-img"
              />
              <Link to={`/articles/${article.article_id}`}>
                <button>Read more</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
