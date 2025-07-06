import { FC, PropsWithChildren } from "react";
import { X } from "lucide-react";

interface MobileMenuProps extends PropsWithChildren {
  onClick: () => void;
  isMenuOpen: boolean;
  menuTitle?: string;
}

const MobileMenu: FC<MobileMenuProps> = ({
  onClick,
  isMenuOpen,
  children,
  menuTitle = "Menu",
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-background border-l border-accent shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-accent">
          <h2 className="text-lg font-semibold">{menuTitle}</h2>
          <button
            onClick={onClick}
            className="p-2 rounded-lg hover:bg-accent/50 transition-colors duration-200"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">{children}</nav>
      </div>
    </div>
  );
};

export default MobileMenu;
