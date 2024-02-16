import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Main Page</Link>
        <Link to="/recipes">Recipies</Link>
      </div>
    </header>
  );
}

export default Header;
