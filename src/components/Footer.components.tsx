import uml from "../assets/uml.png";

function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__content">
        <img src={uml} className="site-footer__logo" alt="Text Machine Lab UML logo" />
        <p className="site-footer__copyright">© Text Machine Lab.</p>
      </div>
    </footer>
  );
}

export default Footer;