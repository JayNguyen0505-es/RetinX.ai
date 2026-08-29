import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { storage } from "../utils/storage";

const LINKS = [
  { id: "about", label: "About Us" },
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How It Works" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [user, setUser] = useState(storage.getUser());

  useEffect(() => {
    setUser(storage.getUser());
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const middle = window.innerHeight / 2;
      const current = LINKS.map((l) => document.getElementById(l.id))
        .filter(Boolean)
        .find((el) => {
          const rect = (el as HTMLElement).getBoundingClientRect();
          return rect.top <= middle && rect.bottom >= middle;
        });

      setActive(current ? current.id : "");
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const goToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleSignOut = () => {
    storage.clearUser();
    setUser(null);
    navigate("/");
  };

  return (
    <header
      className={`navbar ${
        scrolled ? "navbar-scrolled" : "navbar-transparent"
      }`}
    >
      <div className="container navbar-inner">
        <Link to="/" className="brand" aria-label="RetinX.ai home">
          <span className="brand-mark">
            <Eye size={18} strokeWidth={2.2} />
          </span>
          <span className="brand-text">
            RetinX<span className="brand-dot">.</span>ai
          </span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              className={`nav-link ${
                active === link.id ? "nav-link-active" : ""
              }`}
              onClick={() => goToSection(link.id)}
            >
              {link.label}
            </button>
          ))}

          {user ? (
            <button
              type="button"
              className="btn btn-outline btn-sm nav-cta"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm nav-cta">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
