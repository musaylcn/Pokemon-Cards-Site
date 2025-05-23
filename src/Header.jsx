// Header.js
import { Link } from "react-router-dom";
import "./Header.css"; 

export function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Ana Sayfa</Link></li>
          <li><Link to="/favorites">Favoriler</Link></li>
          <li><Link to="/quizz">Quiz</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;