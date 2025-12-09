import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";

interface ButtonData{
  label: string;
  href: string;
}

export default function CollapsableCard({ title, image, link, alt, content, tags, buttons, skillDesc, projDesc, pubDesc }: { title: string, image: string, link: string, alt: string, content: string, tags: string[], buttons: ButtonData[], skillDesc: string, projDesc: string, pubDesc: string }): React.ReactElement {
  const [toggle, setToggle] = useState(false);

  const { language } = useLanguage();
  const cardT = translations.card[language];

  return (
    <div className="collapsable-card">
      <h2 className="card-title" onClick={() => setToggle(!toggle)} style={{ cursor: "pointer" }}>
        {toggle ? "▼" : "▶"} {title}
      </h2>
      {toggle && (
        <div className="card-content">
            <a href={link}  className="card-image-link">
              <img src={image} alt={alt} className="card-image"/>
            </a>
            <div className="card-description">{content}</div>
            <div className="card-buttons">{buttons.map((button, index) => (<a className="card-button" key={index} href={button.href} target="_blank" rel="noopener noreferrer">{button.label}</a>))}</div>
            <div className="card-tabs">
                {(skillDesc || projDesc || pubDesc) && (<Tabs>
                    <TabList>
                        <Tab>{cardT.skills}</Tab>
                        <Tab>{cardT.projects}</Tab>
                        <Tab>{cardT.publications}</Tab>
                    </TabList>

                    <TabPanel>
                        <p>{skillDesc}</p>
                    </TabPanel>
                    <TabPanel>
                        <p>{projDesc}</p>
                    </TabPanel>
                    <TabPanel>
                        <p>{pubDesc}</p>
                    </TabPanel>
                </Tabs>)}
            </div>
            <div className="card-tags">
                {tags.map((tag, index) => (
                    <span key={index} className="card-tag">{tag}</span>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}

// https://codesandbox.io/p/sandbox/react-collapsible-card-75uvm?file=%2Fsrc%2FApp.js
// https://www.npmjs.com/package/react-tabs