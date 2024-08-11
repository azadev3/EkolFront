import { IoClose, IoSearch } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { searchModalState } from "./Search";
import React from "react";

const SearchModal = () => {
  const [searchModal, setSearchModal] = useRecoilState(searchModalState);

  const modalRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const outsideClicked = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setSearchModal(false);
      }
    };

    document.addEventListener("mousedown", outsideClicked);
    return () => {
      document.removeEventListener("mousedown", outsideClicked);
    };
  }, []);

  return (
    <section className={`search-modal ${searchModal ? "active" : ""}`} ref={modalRef}>
      <div className="head-modal">
        <h2>Saytda axtarış et</h2>
        <IoClose className="closeicon" onClick={() => setSearchModal(false)} />
      </div>

      <div className="search-input">
        <div className="input-area">
          <input type="search" placeholder="Axtar..." />
          <IoSearch className="searchicon" />
        </div>
        <div className="results">salam</div>
      </div>
    </section>
  );
};

export default SearchModal;
