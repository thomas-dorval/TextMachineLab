import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import ImageCarousel from "../components/ImageCarousel.component";
import CollapsableCard from "../components/CollapsableCard.component";

interface ButtonData{
  label: string;
  href: string;
}

interface ButtonProps{
  buttons: ButtonData[];
}

function People(): React.ReactElement {
  const { language } = useLanguage();
  const t = translations.people[language];

  return (
    <>
      <ImageCarousel />
      <div className="container">
        <h1>{t.title}</h1>
        <CollapsableCard title={t.anna.title} image="src/assets/people/anna.jpg" alt={t.anna.alt} content="" tags={t.anna.tags} buttons = {[{label: t.anna.label, href: "https://www.cs.uml.edu/~arum/"}]} skillDesc = "" projDesc="" pubDesc=""/>
      </div>
    </>
  );
}

export default People;

