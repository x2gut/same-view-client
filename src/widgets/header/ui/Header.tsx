import { ReactNode, useState } from "react";
import { Menu, X, Home, Info, FileText } from "lucide-react";
import ThemeSwitcher from "@/features/switch-theme/ui/themeSwitcher.js";
import { ROUTES } from "@/shared/routes/consts.js";
import {
  BurgerButton,
  Button,
  MainLogo,
  MobileMenu,
  NavigationLink,
} from "@/shared/ui";

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
      <BurgerButton onClick={toggleMenu} isMenuOpen={isMenuOpen} />

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <MobileMenu onClick={toggleMenu} isMenuOpen={isMenuOpen}>
        <div className="flex flex-col justify-center w-full">
          <ul>
            {menuItems.map(({ to, icon: Icon, label }) => (
              <li key={to} className="mb-5">
                <NavigationLink to={to} className="flex items-center gap-4">
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </NavigationLink>
              </li>
            ))}
          </ul>
          <div className="p-4 border-t border-accent">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <ThemeSwitcher />
            </div>
          </div>{" "}
        </div>
      </MobileMenu>
    </header>
  );
};

export default Header;
