import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "./contexts/UserContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function SingleArticlePage() {
  const { user } = useUser();
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `https://northcoders-news-be-ngc3.onrender.com/api/articles/${article_id}`
        );

        if (res.status === 404) throw new Error("This article does not exist");

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

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setPosting(true);
    setPostError(null);
    setPostSuccess(false);

    try {
      const res = await fetch(
        `https://northcoders-news-be-ngc3.onrender.com/api/articles/${article_id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user.username,
            body: newComment,
          }),
        }
      );
      if (!res.ok) throw new Error(error.msg || "Failed to post comment.");

      const newCommentData = await res.json();

      setComments((prev) => [newCommentData.comment, ...prev]);
      setNewComment("");
      setPostSuccess(true);
    } catch (err) {
      setPostError(err.message);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="single-article-page">
      <div className="single-article-title-author">
        <h2>{article.title}</h2>
        <p className="single-article-metadata">
          by <strong>{article.author}</strong> |{" "}
          {dayjs(article.created_at).format("D MMMM YYYY")} |{" "}
          <strong>
            {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}
          </strong>
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
        <div className="comment-title-count">
          <h3>Comments</h3>
          <p className={article.comment_count === 0 ? "" : "comment-count"}>
            {article.comment_count}
          </p>
        </div>
        {user ? (
          <form onSubmit={handleSubmitComment} className="comment-form">
            <textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <button type="submit" disabled={posting}>
              {posting ? "Posting..." : "Post Comment"}
            </button>
            {postSuccess && <p className="success-msg">Comment posted!</p>}
            {postError && <p className="error-msg">Error: {postError}</p>}
          </form>
        ) : (
          <p>Please log in to comment.</p>
        )}

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
