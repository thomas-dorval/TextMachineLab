import { NavLink } from "react-router-dom";
import NavDropdown from "./NavDropdown.component";
import logo from "../assets/text-machine-White-min.png";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";

const navItems = [
  { labelKey: "home", href: "/" },
  { labelKey: "events", href: "/events" },
  { labelKey: "people", href: "/people" },
  { labelKey: "publications", href: "/publications" },
  { labelKey: "contact", href: "/contact" },
];

const projectSubItems = [
  { labelKey: "quail", href: "/projects/quail" },
  { labelKey: "rusentiment", href: "/projects/rusentiment" },
  { labelKey: "conceptnorm", href: "/projects/conceptnorm" },
  { labelKey: "twitterhawk", href: "/projects/twitterhawk" },
  { labelKey: "externalPages", href: "/projects" },
];

function Navbar() {
    const { language } = useLanguage();
    const navT = translations.navbar[language];
    const projT = translations.projectSubItems[language];

    const projectSubItemsWithLabels = projectSubItems.map(item => ({
      ...item,
      label: projT[item.labelKey as keyof typeof projT]
    }));

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <NavLink to="/" className="navbar__brand" aria-label="Go to TextMachineLab home">
        <img src={logo} className="navbar__logo" alt="TextMachineLab logo" />
      </NavLink>
      <ul className="navbar__list">
        {navItems.map((item) => (
          <li key={item.href} className="navbar__item">
            <NavLink
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}
            >
              {navT[item.labelKey as keyof typeof navT]}
            </NavLink>
          </li>
        ))}
        <NavDropdown label={navT.projects} parentHref="/projects" items={projectSubItemsWithLabels} />
      </ul>
    </nav>
  );
}

export default Navbar;