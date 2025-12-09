import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import CollapsableCard from "../components/CollapsableCard.component";

function Projects(): React.ReactElement {
  const { language } = useLanguage();
  const t = translations.projects[language];

  return (
    <div className="container">
      <h1>{t.title}</h1>
      <CollapsableCard title={t.quail} image="src/assets/projects/quail-logo.png" link="/projects/quail" alt={t.quailAlt} content={t.quailDesc} tags={[]} buttons={[]} skillDesc="" projDesc="" pubDesc=""/>
      <CollapsableCard title={t.rusentiment} image="src/assets/projects/rusentiment.png" link="/projects/rusentiment" alt={t.rusentimentAlt} content={t.rusentimentDesc} tags={t.rusentimentTags} buttons={[]} skillDesc="" projDesc="" pubDesc=""/>
      <CollapsableCard title={t.conceptnorm} image="src/assets/projects/default.png" link="/projects/conceptnorm" alt={t.conceptnormAlt} content={t.conceptnormDesc} tags={t.conceptnormTags} buttons={[]} skillDesc="" projDesc="" pubDesc=""/>
      
    </div>
  );
}

export default Projects;
/* <CollapsableCard title={t.narrativetime} image="src/assets/projects/temporalie_diagram.png" link="" alt={t.Alt} content={t.Desc} tags={[]} buttons={[]} skillDesc="" projDesc="" pubDesc=""/>
      <CollapsableCard title={t.bert} image="src/assets/projects/bert.png" link="" alt={t.Alt} content={t.Desc} tags={[]} buttons={[]} skillDesc="" projDesc="" pubDesc=""/>
      <CollapsableCard title={t.conflictbias} image="src/assets/projects/conflictbias.png" link="" alt={t.Alt} content={t.Desc} tags={[]} buttons={[]} skillDesc="" projDesc="" pubDesc=""/>
      <CollapsableCard title={t.argumentmining} image="src/assets/projects/default.png" link="" alt={t.Alt} content={t.Desc} tags={[]} buttons={[]} skillDesc="" projDesc="" pubDesc=""/>
      <CollapsableCard title={t.fairness} image="src/assets/projects/fairness.png" link="" alt={t.Alt} content={t.Desc} tags={[]} buttons={[]} skillDesc="" projDesc="" pubDesc=""/>
      <CollapsableCard title={t.diagnostics} image="src/assets/projects/diagnostics.png" link="" alt={t.Alt} content={t.Desc} tags={[]} buttons={[]} skillDesc="" projDesc="" pubDesc=""/>
      <CollapsableCard title={t.knowledge} image="src/assets/projects/default.png" link="" alt={t.Alt} content={t.Desc} tags={[]} buttons={[]} skillDesc="" projDesc="" pubDesc=""/>
      <CollapsableCard title={t.cliner} image="src/assets/projects/cliner.png" link="" alt={t.Alt} content={t.Desc} tags={[]} buttons={[]} skillDesc="" projDesc="" pubDesc=""/>
      <CollapsableCard title={t.twitterhawk} image="src/assets/projects/default.png" link="" alt={t.Alt} content={t.Desc} tags={[]} buttons={[]} skillDesc="" projDesc="" pubDesc=""/>
      <CollapsableCard title={t.corpus} image="src/assets/projects/default.png" link="" alt={t.Alt} content={t.Desc} tags={[]} buttons={[]} skillDesc="" projDesc="" pubDesc=""/> */