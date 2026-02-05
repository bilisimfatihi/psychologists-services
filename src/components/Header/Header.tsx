import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition
     ${isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"}`;

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold hover:opacity-80">
          Psychologists Services
        </Link>
        <nav className="flex gap-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/psychologists" className={linkClass}>
            Psychologists
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
