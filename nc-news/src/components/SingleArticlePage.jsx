import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `https://northcoders-news-be-ngc3.onrender.com/api/articles/${article_id}`
        );

        if (!res.ok) throw new Error(`Failed to fetch article: ${res.status}`);
        const data = await res.json();
        setArticle(data.article);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [article_id]);

  if (loading) return <p>Leading article...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>No article found</p>;

  return (
    <div className="single-article-page">
      <h2>{article.title}</h2>
      <p>
        <strong>Author:</strong> {article.author}
      </p>
      <p>
        <strong>Topic:</strong> {article.topic}
      </p>
      <p>{article.body}</p>
    </div>
  );
}
