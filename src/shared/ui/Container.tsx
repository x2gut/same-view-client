import type { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="w-full h-full max-w-[1280px] m-auto">{children}</div>;
};

export default Container;
