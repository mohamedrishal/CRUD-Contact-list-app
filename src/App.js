import "./App.css";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Update from "./Components/Update";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/home" element={<Home />} />
        <Route path="update/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
