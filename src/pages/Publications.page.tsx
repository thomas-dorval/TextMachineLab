import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";

function Publications(): React.ReactElement {
  const { language } = useLanguage();
  const t = translations.publications[language];

  return (
    <div className="container">
      <h1>{t.title}</h1>
      <h2>2024</h2>
      <ul>
        <li>{t.pub1_25}</li>
        <li>{t.pub2_25}</li>
        <li>{t.pub3_25}</li>
        <li>{t.pub4_25}</li>
        <li>{t.pub5_25}</li>
      </ul>
    </div>
  );
}

export default Publications;