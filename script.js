// Simple i18n with JSON translations. Auto-detect + localStorage + dropdown.

let translations = {};
let currentLang = 'en';

async function loadTranslations() {
  try {
    // ✅ Fixed path to match your folder structure
    const res = await fetch('translations.json');
    if (!res.ok) throw new Error('Could not load translations: ' + res.status);
    translations = await res.json();
  } catch (err) {
    console.error(err);
    translations = {}; // fallback empty
  }
  detectLanguage();
  applyTranslations();
}

function detectLanguage() {
  const saved = localStorage.getItem('language');
  if (saved && translations[saved]) {
    currentLang = saved;
  } else {
    const nav = navigator.language || navigator.userLanguage || 'en';
    const code = nav.slice(0, 2).toLowerCase();
    currentLang = translations[code] ? code : 'en';
    localStorage.setItem('language', currentLang);
  }
  const sel = document.getElementById('languageSwitcher');
  if (sel) sel.value = currentLang;
}

function applyTranslations() {
  // set lang attribute on html
  try { document.documentElement.lang = currentLang; } catch (e) {}

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const txt = lookupKey(currentLang, key);
    if (txt !== null) {
      // for titles use textContent; for <title> we update document.title
      if (el.tagName.toLowerCase() === 'title') {
        document.title = txt;
      } else {
        el.textContent = txt;
      }
    }
  });
}

function lookupKey(lang, key) {
  // key can be nested via dots: "nav.home" etc.
  const parts = key.split('.');
  let obj = translations[lang];
  for (let p of parts) {
    if (!obj || typeof obj !== 'object' || !(p in obj)) return null;
    obj = obj[p];
  }
  return (typeof obj === 'string') ? obj : null;
}

document.addEventListener('DOMContentLoaded', () => {
  const switcher = document.getElementById('languageSwitcher');
  if (switcher) {
    switcher.addEventListener('change', (e) => {
      currentLang = e.target.value;
      localStorage.setItem('language', currentLang);
      applyTranslations();
    });
  }
  loadTranslations();
});
