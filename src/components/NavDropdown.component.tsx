import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

type Item = { label: string; href: string };

export default function NavDropdown({ label, items, parentHref = "/" }: { label: string; items: Item[]; parentHref?: string }) {
  const [pinned, setPinned] = useState(false);
  const containerRef = useRef<HTMLLIElement | null>(null);
  const clickTimerRef = useRef<number | null>(null);
  const touchTimerRef = useRef<number | null>(null);
  const lastTouchRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setPinned(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    return () => {
      if (clickTimerRef.current) window.clearTimeout(clickTimerRef.current);
      if (touchTimerRef.current) window.clearTimeout(touchTimerRef.current);
    };
  }, []);

  function handleSingleClick(e: React.MouseEvent) {
    e.preventDefault();
    // toggle pinned after a short delay unless a double click arrives
    if (clickTimerRef.current) {
      // In practice this branch should rarely happen because double click clears timer.
      window.clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
      return;
    }
    clickTimerRef.current = window.setTimeout(() => {
      setPinned((p) => !p);
      clickTimerRef.current = null;
    }, 250);
  }

  function handleDoubleClick(e: React.MouseEvent) {
    // double click -> navigate to parent href
    e.preventDefault();
    if (clickTimerRef.current) {
      window.clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
    setPinned(false);
    // make sure focus doesn't remain on the clicked element (prevents :focus-within)
    try {
      const target = e.currentTarget as HTMLElement | null;
      if (target) target.blur();
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    } catch (err) {}
    // temporarily suppress hover-driven open while navigation occurs
    document.body.classList.add('nav-suppress-hover');
    window.setTimeout(() => document.body.classList.remove('nav-suppress-hover'), 400);
    navigate(parentHref);
  }

  function handleTouchEnd() {
    const now = Date.now();
    if (lastTouchRef.current && now - lastTouchRef.current <= 300) {
      // double tap -> navigate
      if (touchTimerRef.current) {
        window.clearTimeout(touchTimerRef.current);
        touchTimerRef.current = null;
      }
      lastTouchRef.current = null;
      setPinned(false);
      // remove focus to avoid :focus-within opening a menu on the new page
      try {
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      } catch (err) {}
      document.body.classList.add('nav-suppress-hover');
      window.setTimeout(() => document.body.classList.remove('nav-suppress-hover'), 400);
      navigate(parentHref);
      return;
    }

    lastTouchRef.current = now;
    if (touchTimerRef.current) window.clearTimeout(touchTimerRef.current);
    touchTimerRef.current = window.setTimeout(() => {
      // Single tap -> toggle pinned
      setPinned((p) => !p);
      touchTimerRef.current = null;
      lastTouchRef.current = null;
    }, 300);
  }

  return (
    <li ref={containerRef} className={`nav-dropdown${pinned ? " open" : ""}`}>
      <NavLink
        to={parentHref}
        className={({ isActive }) => (isActive ? "nav-dropdown__parent nav-link nav-link--active" : "nav-dropdown__parent nav-link")}
        aria-haspopup="menu"
        aria-expanded={pinned}
        onClick={handleSingleClick}
        onDoubleClick={handleDoubleClick}
        onTouchEnd={handleTouchEnd}
      >
        {label}
      </NavLink>

      <ul className="nav-dropdown__menu" role="menu" aria-label={label}>
        {items.map((it) => (
          <li className="nav-dropdown__item" key={it.href} role="none">
            <NavLink
              role="menuitem"
              to={it.href}
              className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}
              onClick={(e) => {
                setPinned(false);
                // blur focus and suppress hover while navigation occurs
                try {
                  const target = e.currentTarget as HTMLElement | null;
                  if (target) target.blur();
                  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
                } catch (err) {}
                document.body.classList.add('nav-suppress-hover');
                window.setTimeout(() => document.body.classList.remove('nav-suppress-hover'), 400);
              }}
            >
              {it.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}
