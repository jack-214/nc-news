import { useState } from "react";
import Header from "./components/Header";
import MainRouter from "./components/MainROuter";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
