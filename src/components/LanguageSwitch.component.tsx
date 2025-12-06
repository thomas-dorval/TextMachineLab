import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switch">
      <button
        className={`language-switch__button ${language === "EN" ? "active" : ""}`}
        onClick={() => setLanguage("EN")}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        className={`language-switch__button ${language === "RU" ? "active" : ""}`}
        onClick={() => setLanguage("RU")}
        aria-label="Switch to Russian"
      >
        RU
      </button>
    </div>
  );
}
