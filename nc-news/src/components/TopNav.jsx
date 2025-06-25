import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function TopNav() {
  const [showLinks, setShowLinks] = useState(false);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  return (
    <div className="topnav">
      <a href="#home" className="active">
        Logo
      </a>
      <div id="myLinks" className={showLinks ? "show" : "hide"}>
        <Link to="/">Home</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/topics">Topics</Link>
        <Link to="/user">Users</Link>
      </div>
      <button className="icon" onClick={toggleLinks}>
        <FaBars />
      </button>
    </div>
  );
}
