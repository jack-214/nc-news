import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function SingleArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `https://northcoders-news-be-ngc3.onrender.com/api/articles/${article_id}/comments`
        );
        const data = await res.json();
        setComments(data.comments);
      } catch (err) {
        console.error("Error fetching comments:", err.message);
      }
    };
    fetchComments();
  }, [article_id]);

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>No article found</p>;

  return (
    <div className="single-article-page">
      <div className="single-article-title-author">
        <h2>{article.title}</h2>
        <p>
          <strong>{article.author}</strong> | <strong>{article.topic}</strong>
        </p>
      </div>
      <img
        src={article.article_img_url}
        alt={article.title}
        className="single-article-img"
      />
      <div className="single-article-body">
        <p>{article.body}</p>
      </div>
      <div className="comments-container">
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul className="comments-list">
            {comments.map((comment) => (
              <li className="comment-list-item" key={comment.comment_id}>
                <p>
                  {comment.author} | {dayjs(comment.created_at).fromNow()} |
                  says:
                </p>
                <p>{comment.body}</p>
                <p>Votes: {comment.votes}</p>
                <p></p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
