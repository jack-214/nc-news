import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TopicsPage() {
  const [topics, setTopics] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await fetch(
          "https://northcoders-news-be-ngc3.onrender.com/api/topics"
        );
        if (!res.ok) throw new Error(`Failed to fetch topics: ${res.status}`);
        const data = await res.json();
        setTopics(data.topics);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading topics...</p>;
  if (!topics) return <p>Topics not found</p>;

  return (
    <div className="topics-page">
      {topics.map((topic) => (
        <div className="topic-card" key={topic.slug}>
          <Link to={`/articles?topic=${topic.slug}`}>
            <img className="topic-img" src={topic.img_url} alt="topic-img" />
            <h3>{topic.slug[0].toUpperCase() + topic.slug.slice(1)}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
