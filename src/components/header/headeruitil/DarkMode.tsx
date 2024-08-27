import React from 'react'
import { IoMoonOutline } from "react-icons/io5";
import { atom, useRecoilState } from 'recoil';

export const DarkModeState = atom<boolean>({
     key: "DarkModeState",
     default: false,
})

const DarkMode:React.FC = () => {

     const [_, setMode] = useRecoilState(DarkModeState);

  return (
    <div className='dark-mode-btn' onClick={() => setMode((prev) => !prev)}>
     <IoMoonOutline className='moon-icon'/>
    </div>
  )
}

export default DarkMode