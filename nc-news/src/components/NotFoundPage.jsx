import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="error-not-found-page">
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you are looking for doesn't exist...</p>
      <Link to={"/"}>Go back to homepage</Link>
    </div>
  );
}
