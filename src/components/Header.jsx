import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="nav navbar-nav">
          <NavLink className="nav-item nav-link" to="/">
            Home
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
