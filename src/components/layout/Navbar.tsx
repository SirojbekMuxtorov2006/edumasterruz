import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/modules/olympiad/hooks/useAuth";
import { Trophy, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.board"), path: "/board-members" },
    { name: t("nav.rules"), path: "/rules" },
    { name: t("nav.gallery"), path: "/gallery" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleAction = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-16 h-12 relative z-10 transform transition-transform"
            />
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight leading-tight">
            Turon <span className="text-indigo-600">International</span> <br />{" "}
            Olympiad
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                isActive(link.path) ? "text-indigo-600" : "text-gray-600"
              }`}
            >
              {link.name}
            </button>
          ))}

          <div className="h-6 w-px bg-gray-200 mx-2"></div>

          <LanguageSwitcher />

          {/* Action Button (Desktop) */}
          <Button
            onClick={handleAction}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 ml-2"
          >
            {isAuthenticated ? t("nav.dashboard") : t("nav.register")}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg animate-in slide-in-from-top-5">
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 px-4 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => {
                handleAction();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-indigo-600"
            >
              {isAuthenticated ? t("nav.dashboard") : t("nav.register")}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
