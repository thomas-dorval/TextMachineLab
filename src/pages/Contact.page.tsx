import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";

function Contact(): React.ReactElement {
  const { language } = useLanguage();
  const t = translations.contact[language];

  return (
    <div className="container">
      <h1>{t.title}</h1>
    </div>
  );
}

export default Contact;