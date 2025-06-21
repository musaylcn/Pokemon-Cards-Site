
import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Ana Sayfa</Link></li>
          <li><Link to="/favoriler">Favoriler</Link></li>
          <li><Link to="/quiz">Quiz</Link></li>
          <li><Link to="/fal">Fal</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;