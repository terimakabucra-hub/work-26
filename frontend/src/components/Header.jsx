import { Link, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

const Header = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-red-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          📰 Daily News
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium mt-2 md:mt-0">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <Link to="/news" className="hover:text-yellow-300 transition">
            All News
          </Link>
          <Link to="/contact" className="hover:text-yellow-300 transition">
            Contact Us
          </Link>

          {user ? (
            <>
              <Link
                to="/create-news"
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300 transition"
              >
                + Create News
              </Link>
              <Link to="/dashboard" className="hover:text-yellow-300 transition">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-red-700 px-3 py-1 rounded hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-red-700 px-3 py-1 rounded hover:bg-gray-200 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
