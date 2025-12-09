import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import ImageCarousel from "../components/ImageCarousel.component";
import CollapsableCard from "../components/CollapsableCard.component";

function People(): React.ReactElement {
  const { language } = useLanguage();
  const t = translations.people[language];

  return (
    <>
      <ImageCarousel />
      <div className="container">
        <h1>{t.title1}</h1>
        <CollapsableCard title={t.anna.title} image="src/assets/people/anna.jpg" alt={t.anna.alt} link="https://www.cs.uml.edu/~arum/" content="" tags={[]} buttons = {[{label: t.anna.label, href: "https://www.cs.uml.edu/~arum/"}]} skillDesc = "" projDesc="" pubDesc=""/>
        <h2>{t.subtitle1}</h2>
        <CollapsableCard title={t.vijeta.title} image="src/assets/people/vijeta.jpg" alt={t.vijeta.alt} link="" content={t.vijeta.content} tags={[]} buttons = {[{label: t.vijeta.label1, href: "mailto:vijeta_deshpande@student.uml.edu"}, {label: t.vijeta.label2, href: "https://github.com/vijetadeshpande"}, {label: t.vijeta.label3, href: "https://www.linkedin.com/in/vijeta-deshpande/"}, {label: t.vijeta.label4, href:"https://scholar.google.com/citations?hl=en&user=CiBtlNQAAAAJ"}]} skillDesc="" projDesc="" pubDesc=""/>
      </div>
    </>
  );
}

export default People;

