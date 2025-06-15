import { useState } from "react";
import Badge from "./Badge";
import { Check, Copy } from "lucide-react";

const CopyBadge = ({ name }: { name: string }) => {
  const [copyStatus, setCopyStatus] = useState(false);

  const handleCopy = () => {
    setCopyStatus(true);
    navigator.clipboard.writeText(name);
    setTimeout(() => {
      setCopyStatus(false);
    }, 1500);
  };

  return (
    <Badge
      shape="rounded"
      outline
      variant={copyStatus ? "success" : "secondary"}
      className={`px-3 py-1.5 flex items-center gap-2 font-medium transition-all duration-300 ${
        copyStatus ? "bg-green-50" : "hover:bg-gray-50"
      }`}
      onClick={handleCopy}
    >
      <span className="whitespace-nowrap">{name}</span>
      <div className="relative flex items-center justify-center min-w-5">
        {copyStatus ? (
          <Check size={15} className="text-green-600 animate-fadeIn" />
        ) : (
          <Copy size={15} className="text-gray-500 hover:text-gray-700" />
        )}
      </div>
      <span
        className={`absolute -top-8 right-0 bg-gray-800 text-white px-2 py-1 rounded pointer-events-none transition-opacity duration-300 ${
          copyStatus ? "opacity-100" : "opacity-0"
        }`}
      >
        Copied!
      </span>
    </Badge>
  );
};

export default CopyBadge;
