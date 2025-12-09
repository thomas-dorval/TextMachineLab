import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";

function Home(): React.ReactElement {
  const { language } = useLanguage();
  const t = translations.home[language];

  return (
    <div className="container home-container">
      <div className="column home-profile">
        <img src="src/assets/people/anna.jpg"/>
        <h2>Anna Rumshisky</h2>
        <p>PI</p>
      </div>
      <div className="column">
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
        <ul>
          {t.areas.map((area, idx) => (
            <li key={idx}>{area}</li>
          ))}
        </ul>
      </div>
      <div className="column">
          <h2>{t.news}</h2>
          <ul>
            {t.newsItems.map((area, idx) => (
              <li key={idx}>{area}</li>
            ))}
          </ul>
      </div>
    </div>
  );
}

export default Home;