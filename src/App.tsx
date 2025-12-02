import { Route, Routes, Navigate } from "react-router-dom";
import './App.css'

import Navbar from "./components/Navbar.component";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import People from "./pages/People";
import Projects from "./pages/Projects";
import Publications from "./pages/Publications";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Events />} />
        <Route path="/people" element={<People />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
