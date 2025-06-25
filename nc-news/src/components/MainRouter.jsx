import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ArticlesPage from "./ArticlesPage";
import SingleArticlePage from "./SingleArticlePage";
import TopicsPage from "./TopicsPage";
import UsersPage from "./UsersPage";

export default function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route
        path="/articles/:article_id"
        element={<SingleArticlePage />}
      ></Route>
      <Route path="/topics" element={<TopicsPage />} />
      <Route path="/users" element={<UsersPage />} />
    </Routes>
  );
}
