import TopNav from "./TopNav";
import { Link } from "react-router-dom";
import logo from "../assets/NC_news_logo.jpg";

export default function Header() {
  return (
    <div className="nav-header-container">
      <Link to="/">
        <div className="h1-logo">
          <img className="header-logo" src={logo} alt="NC-news-logo" />
          <h1>
            <div className="website-name">
              North
              <br />
              coders
              <br />
              News
            </div>
          </h1>
        </div>
      </Link>
      <TopNav />
    </div>
  );
}
