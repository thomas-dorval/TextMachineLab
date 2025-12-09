import uml from "../assets/uml.png";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";

export default function Footer() {
    const { language } = useLanguage();
    const t = translations.footer[language];

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__content">
        <img src={uml} className="site-footer__logo" alt="Text Machine Lab UML logo" />
        <p className="site-footer__copyright">{t.copyright}</p>
      </div>
    </footer>
  );
}