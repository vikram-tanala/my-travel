import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const baseUrl = import.meta.env.url;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${baseUrl}/api/user/getName`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUsername(data?.name || "");
        }
      } catch {
        console.error("Failed to fetch user name");
      }
    };

    fetchDetails();
  }, [baseUrl]);

  const logoutHandle = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/home"
          className="text-2xl font-bold text-indigo-600 tracking-wide"
          style={{ fontFamily: "Caveat, cursive" }}
        >
          My Trips
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 text-gray-700 font-medium">
          <Link to="/home" className="hover:text-indigo-600">Home</Link>
          <Link to="/my-trips" className="hover:text-indigo-600">My Trips</Link>
          <Link to="/travelguidance" className="hover:text-indigo-600">Travel Guidance</Link>
          <Link to="/contact" className="hover:text-indigo-600">Contact</Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {username && (
            <div className="hidden sm:flex items-center gap-2 text-gray-600 text-sm">
              <span className="w-8 h-8 rounded-full bg-indigo-600 text-white
                flex items-center justify-center font-semibold">
                {username.charAt(0).toUpperCase()}
              </span>
              <span>{username}</span>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {menuOpen ? (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>

          {/* Logout (Desktop only) */}
          <button
            onClick={logoutHandle}
            className="hidden md:block bg-indigo-600 text-white px-4 py-2 rounded-lg
            text-sm hover:bg-indigo-700 transition shadow"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
          <Link onClick={() => setMenuOpen(false)} to="/home" className="block text-gray-700">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/my-trips" className="block text-gray-700">My Trips</Link>
          <Link onClick={() => setMenuOpen(false)} to="/travelguidance" className="block text-gray-700">Travel Guidance</Link>
          <Link onClick={() => setMenuOpen(false)} to="/contact" className="block text-gray-700">Contact</Link>

          <button
            onClick={() => {
              setMenuOpen(false);
              logoutHandle();
            }}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
