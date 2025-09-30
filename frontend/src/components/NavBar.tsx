import { Link } from "react-router-dom";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faHeart, faFilm } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <FontAwesomeIcon icon={faFilm} /> Movie App
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <Link to="/favorites" className="nav-link">
          <FontAwesomeIcon icon={faHeart} /> Favorites
        </Link>
      </div>
    </nav>
  );
}
export default NavBar;
