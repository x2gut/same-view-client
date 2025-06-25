import { useState } from "react";
import { Menu, X, Home, Info, FileText } from "lucide-react";
import ThemeSwitcher from "@/features/switch-theme/ui/themeSwitcher.js";
import { ROUTES } from "@/shared/routes/consts.js";
import { Button, MainLogo, NavigationLink } from "@/shared/ui";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuItems = [
    { to: ROUTES.HOME, label: "Home", icon: Home },
    { to: ROUTES.ABOUT, label: "About", icon: Info },
    { to: ROUTES.TERMS, label: "Terms", icon: FileText },
  ];

  return (
    <header className="relative flex items-center justify-between p-4 border-b border-accent bg-background">
      <div className="flex items-center gap-20">
        <MainLogo />

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-10 rounded-md">
            {menuItems.map(({ to, label }) => (
              <li key={to}>
                <NavigationLink to={to}>{label}</NavigationLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Desktop Theme Switcher */}
      <div className="hidden md:block">
        <ThemeSwitcher />
      </div>

      {/* Mobile Burger Menu Button */}
      <Button variant="ghost" className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
        <div className="relative w-6 h-6">
          <Menu
            className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
              isMenuOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
            }`}
          />
          <X
            className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
              isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
            }`}
          />
        </div>
      </Button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-background border-l border-accent shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-accent">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-accent/50 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <NavigationLink
                    to={to}
                    onClick={closeMenu}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 w-full"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-base">{label}</span>
                  </NavigationLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme Switcher in Mobile Menu */}
          <div className="p-4 border-t border-accent">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
