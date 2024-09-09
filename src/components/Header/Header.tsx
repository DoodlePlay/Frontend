"use client"; //Header의 조건부 렌더링을 위해서 Client component로 분리

import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const showHeader = pathname === "/" || pathname === "/rooms";

  if (!showHeader) return null;

  return (
    <div className="relative flex items-center justify-center text-center mt-20 cursor-default">
      <div
        className="text-7xl text-white"
        style={{
          WebkitTextStroke: "7px white",
        }}
      >
        Doodle Play
      </div>

      <div className="absolute text-7xl text-black z-10 cursor-default">
        <span className="text-secondary-default">D</span>
        <span className="text-primary-default">o</span>
        <span className="text-primary-default">o</span>
        <span className="text-secondary-default">d</span>
        <span className="text-secondary-default">l</span>
        <span className="text-secondary-default">e</span>
        <span className="text-primary-default">&nbsp;P</span>
        <span className="text-secondary-default">l</span>
        <span className="text-secondary-default">a</span>
        <span className="text-secondary-default">y</span>
      </div>
    </div>
  );
};

export default Header;
