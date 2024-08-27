import React from "react";
import { IoMoonOutline } from "react-icons/io5";
import { atom, useRecoilState } from "recoil";
import { IoMdSunny } from "react-icons/io";

export const DarkModeState = atom<boolean>({
  key: "DarkModeState",
  default: false,
});

const DarkMode: React.FC = () => {
  const [mode, setMode] = useRecoilState(DarkModeState);

  return (
    <div className="dark-mode-btn" onClick={() => setMode((prev) => !prev)}>
      {mode ?  <IoMdSunny className="moon-icon" /> : <IoMoonOutline className="moon-icon" />}
    </div>
  );
};

export default DarkMode;
