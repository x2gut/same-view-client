import ThemeSwitcher from "@/features/switch-theme/ui/themeSwitcher.js";
import { NavigationLink } from "../../../shared/ui/index.js";
import MainLogo from "../../../shared/ui/Logo.js";
import { ROUTES } from "@/shared/routes/consts.js";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-[var(--accent)]">
      <div className="flex items-center gap-20">
        <MainLogo />
        <nav className="">
          <ul className="flex gap-10 rounded-md">
            <li>
              <NavigationLink to={ROUTES.HOME}>Home</NavigationLink>
            </li>
            <li>
              <NavigationLink to={ROUTES.ABOUT}>About</NavigationLink>
            </li>
            <li>
              <NavigationLink to={ROUTES.TERMS}>Terms</NavigationLink>
            </li>
          </ul>
        </nav>
      </div>
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
