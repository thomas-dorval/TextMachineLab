import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import CollapsableCard from "../components/CollapsableCard.component";

function Events(): React.ReactElement {
  const { language } = useLanguage();
  const t = translations.events[language];

  return (
    <div className="container">
      <h1>{t.title}</h1>
      <CollapsableCard title={t.nenlp} image="src/assets/events/nenlp.png" link="https://insights-workshop.github.io/" alt={t.nenlpAlt} content={t.nenlpDesc} tags={[]} buttons={[]} skillDesc="" projDesc="" pubDesc=""/>
    </div>
  );
}

export default Events;

//<CollapsableCard title={t.} image="src/assets/people/default.png" link="" alt={t.Alt} content={t.Desc} tags={[]} buttons={[]} skillDesc="" projDesc="" pubDesc=""/>