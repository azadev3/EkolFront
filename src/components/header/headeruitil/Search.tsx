import React from 'react'
import { isHomePageState } from '../../../App';
import { atom, useRecoilState, useRecoilValue } from 'recoil';

export const searchModalState = atom<boolean>({
  key: "searchModalStateKey",
  default: false,
});

const Search:React.FC = () => {
  //is none homepage change search icon color black
  const isHomePage = useRecoilValue(isHomePageState);

  const [_, setSearchModal] = useRecoilState(searchModalState);

  return (
    <div className='search' onClick={() => setSearchModal(true)}>
     <img src={isHomePage ? "/searchicon.svg" : "/blacksearch.svg"} alt="search" title='Axtar' />
    </div>
  )
}

export default Search