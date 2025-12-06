import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations/translations";

function TwitterHawk(): React.ReactElement {
  const { language } = useLanguage();
  const t = translations.twitterhawk[language];

  return (
    <div className="container">
        <h1>{t.title}</h1>
    </div>
  );
}

export default TwitterHawk;