import React from "react";

type props = {
  handlePaginate: () => void;
};

const PaginateButton: React.FC<props> = (props) => {
  return (
    <div className="pagination-button">
      <button className="formorebtn" onClick={props.handlePaginate}>
        Daha çox
      </button>
    </div>
  );
};

export default PaginateButton;
