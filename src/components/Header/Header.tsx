import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../firebase/auth";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";

const Header = () => {
  const { user, loading } = useAuth();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-2 py-2 border-b-2 text-sm font-medium transition
     ${isActive ? "border-b-2 border-emerald-500" : "border-transparent text-gray-700 hover:border-emerald-500 hover:bg-gray-100"}`;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="text-xl font-bold hover:opacity-80">
            <span className="text-emerald-500">psychologists</span>
            <span className="text-gray-800">.services</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-4 md:flex">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/psychologists" className={linkClass}>
              Psychologists
            </NavLink>
            {!loading && user && (
              <NavLink to="/favorites" className={linkClass}>
                Favorites
              </NavLink>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {!loading && !user && (
              <>
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
              </>
            )}
            {!loading && user && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Hi, {user.displayName}
                </span>

                <button
                  onClick={handleLogout}
                  className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center md:hidden p-2"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="flex flex-col px-6 py-4 gap-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/psychologists"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Psychologists
              </NavLink>
              {!loading && user && (
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded transition ${
                      isActive
                        ? "bg-emerald-50 text-emerald-500"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Favorites
                </NavLink>
              )}
            </nav>
            <div className="border-t border-gray-200 px-6 py-4 flex flex-col gap-3">
              {!loading && !user && (
                <>
                  <button
                    onClick={() => {
                      setIsLoginOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 w-full"
                  >
                    Log In
                  </button>

                  <button
                    onClick={() => {
                      setIsRegisterOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-white cursor-pointer hover:bg-emerald-600 w-full"
                  >
                    Registration
                  </button>
                </>
              )}
              {!loading && user && (
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-medium text-gray-700 px-3">
                    Hi, {user.displayName}
                  </span>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 w-full"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}

      {isRegisterOpen && (
        <RegisterModal onClose={() => setIsRegisterOpen(false)} />
      )}
    </>
  );
};

export default Header;
