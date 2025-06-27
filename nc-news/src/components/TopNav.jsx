import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useUser } from "./contexts/UserContext";

export default function TopNav() {
  const { user } = useUser();
  const [showLinks, setShowLinks] = useState(false);
  const menuRef = useRef(null);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLinks(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="topnav" ref={menuRef}>
      {user && (
        <p className="nav-logged-in-as">
          logged in as <span className="logged-in-as">{user.username}</span>
        </p>
      )}
      <div id="myLinks" className={showLinks ? "show" : "hide"}>
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/articles">
          Articles
        </Link>
        <Link className="nav-link" to="/topics">
          Topics
        </Link>
        {/* <Link className="nav-link" to="/users">
          Users
        </Link> */}
      </div>
      <button className="icon" onClick={toggleLinks}>
        <FaBars />
      </button>
    </div>
  );
}
