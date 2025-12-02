import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "People", href: "/people" },
  { label: "Publications", href: "/publications" },
  { label: "Contact", href: "/contact" },
];

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <h2 className="navbar__title">TextMachineLab</h2>
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
      </ul>
    </nav>
  );
}

export default Navbar;