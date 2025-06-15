import { ROUTES } from "@/shared/routes/consts";
import { NavigationLink } from "@/shared/ui";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center border-t border-[var(--accent)] p-4">
      <p>© 2025 SyncViewRoom. All rights reserved.</p>
      <div>
        <nav className="flex gap-5">
          <NavigationLink to={ROUTES.ABOUT}>About</NavigationLink>
          <NavigationLink to={ROUTES.TERMS}>Terms</NavigationLink>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
