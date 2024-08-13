import { atom } from 'recoil';

//selected language state
export const SelectedLanguageState = atom<string>({
     key: "selectedLanguageState",
     default: "az",
});

//scroll header state
export const ScrollHeaderState = atom<boolean>({
     key: "scrollHeaderState",
     default: false,
});

//is mobile 
export const isMobileState = atom<boolean>({
     key: "isMobileState",
     default: false,
});