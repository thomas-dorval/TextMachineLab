import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";

function Contact(): React.ReactElement {
  const { language } = useLanguage();
  const t = translations.contact[language];

  return (
    <div className="container">
      <h1>{t.title}</h1>
      <div>
        <a href="emailto:arum@cs.uml.edu">
          <img src="src/assets/contact/email.png" className="contact-img" alt="Gray circle with white envelope inside."/>
          <p>arum@cs.uml.edu</p>
        </a>
      </div>
      <div>
        <img src="src/assets/contact/study.png" className="contact-img" alt="Gray circle with white graduation cap inside"/>
        <p>{t.learnmore}</p>
        <a href="https://uml.edu/"> www.uml.edu</a>
        <p>.</p>
      </div>
      <div>
        <img src="src/assets/contact/location.png"/>
        <p>Dandeneau Hall, 1 University avenue, Lowell, MA, Office 415</p>
      </div>
      <iframe className="googleMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.3556421435032!2d-71.3275307841599!3d42.65381837916836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3a45a88984367%3A0x625a67c37ce48310!2s1+University+Ave%2C+Lowell%2C+MA+01854!5e0!3m2!1sen!2sus!4v1535623313159"></iframe>
    </div>
  );
}

export default Contact;