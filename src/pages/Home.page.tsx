import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";

function Home(): React.ReactElement {
  const { language } = useLanguage();
  const t = translations.home[language];

  return (
    <div className="container">
      <h1>{t.title}</h1>
      <p>{t.intro}</p>
      <ul>
        {t.areas.map((area, idx) => (
          <li key={idx}>{area}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;