import { Route, Routes, Navigate } from "react-router-dom";
import './App.css'

import Navbar from "./components/Navbar.component";
import Footer from "./components/Footer.component";
import LanguageSwitch from "./components/LanguageSwitch.component";
import { LanguageProvider } from "./context/LanguageContext";
import Home from "./pages/Home.page";
import Contact from "./pages/Contact.page";
import Events from "./pages/Events.page";
import People from "./pages/People.page";
import Projects from "./pages/Projects.page";
import ConceptNorm from "./pages/projects/ConceptNorm.page";
import QuAIL from "./pages/projects/QuAIL.page";
import RuSentiment from "./pages/projects/RuSentiment.page";
import TwitterHawk from "./pages/projects/TwitterHawk.page";
import Publications from "./pages/Publications.page";


function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Navbar />
        <main className="site-content">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/people" element={<People />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/conceptnorm" element={<ConceptNorm />} />
          <Route path="/projects/quail" element={<QuAIL />} />
          <Route path="/projects/rusentiment" element={<RuSentiment />} />
          <Route path="/projects/twitterhawk" element={<TwitterHawk />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <LanguageSwitch />
      </div>
    </LanguageProvider>
  );
}

export default App;
