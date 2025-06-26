import React from "react";
import Header from "./components/Header";
import MainRouter from "./components/MainRouter";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/contexts/UserContext";

function App() {
  return (
    <React.StrictMode>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <MainRouter />
        </BrowserRouter>
      </UserProvider>
    </React.StrictMode>
  );
}

export default App;
