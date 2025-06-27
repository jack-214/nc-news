import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainRouter from "./components/MainRouter";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/contexts/UserContext";

function App() {
  return (
    <React.StrictMode>
      <UserProvider>
        <BrowserRouter>
          <div className="header-mainrouter">
            <Header />
            <MainRouter />
          </div>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </React.StrictMode>
  );
}

export default App;
