import { NavLink } from "react-router-dom";
import NavDropdown from "./NavDropdown.component";
import logo from "../assets/text-machine-White-min.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "People", href: "/people" },
  { label: "Publications", href: "/publications" },
  { label: "Contact", href: "/contact" },
];

const projectSubItems = [
  { label: "QuAIL", href: "/projects/quail" },
  { label: "RuSentiment", href: "/projects/rusentiment" },
  { label: "Medical Concept Normalization", href: "/projects/conceptnorm" },
  { label: "TwitterHawk", href: "/projects/twitterhawk" },
  { label: "External Pages", href: "/projects" },
];

function Navbar() {
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
              {item.label}
            </NavLink>
          </li>
        ))}
        <NavDropdown label="Projects" parentHref="/projects" items={projectSubItems} />
      </ul>
    </nav>
  );
}

export default Navbar;