import { Menu, X } from "lucide-react";
import Button from "../Button";
import { FC } from "react";

interface BurgerButtonProps {
  onClick: () => void;
  isMenuOpen: boolean;
}

const BurgerButton: FC<BurgerButtonProps> = ({ onClick, isMenuOpen }) => {
  return (
    <Button
      variant="ghost"
      className="md:hidden"
      onClick={onClick}
      aria-label="Toggle Menu"
    >
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
  );
};

export default BurgerButton;
