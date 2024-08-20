import { atom } from 'recoil';

//selected language state
export const SelectedLanguageState = atom<string>({
     key: "selectedLanguageState",
     default: "az",
});

//is mobile 
export const isMobileState = atom<boolean>({
     key: "isMobileState",
     default: false,
});