import { atom } from 'recoil';

//selected language state
export const SelectedLanguageState = atom<string>({
     key: "selectedLanguageStateKey",
     default: "az",
});