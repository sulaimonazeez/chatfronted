import React from "react";
import "./ExactUI.css";

const Search = () => {
  return (
    <div className="search-wrapper position-relative mt-2 px-0">
      <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
      <input 
        type="text" 
        id="searching" 
        name="searching" 
        className="search-input w-100 rounded-3" 
        placeholder="Search" 
      />
    </div>
  );
};

export default Search;
