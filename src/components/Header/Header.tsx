import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 border-b-2 text-sm font-medium transition
     ${isActive ? "border-b-2 border-emerald-500" : "border-transparent text-gray-700 hover:border-emerald-500 hover:bg-gray-100"}`;

  return (
    <>
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="text-xl font-bold hover:opacity-80">
            <span className="text-emerald-500">psychologists</span>
            <span className="text-gray-800">.services</span>
          </Link>
          <nav className="flex items-center gap-8">
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
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              Log In
            </button>

            <button
              onClick={() => setIsRegisterOpen(true)}
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-white cursor-pointer hover:bg-emerald-600"
            >
              Registration
            </button>
          </div>
        </div>
      </header>
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}

      {isRegisterOpen && (
        <RegisterModal onClose={() => setIsRegisterOpen(false)} />
      )}
    </>
  );
};

export default Header;
