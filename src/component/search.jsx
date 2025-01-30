import React from "react";
import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Search = () =>{
  return (
    <div className="container-fluid form-group">
      <input style={{ backgroundColor: '#000030', color: 'white', border: 'none'}} type="text" id="searching" name="searching" className="search-bar form-control rounded-pill p-2" placeholder="Search chat" />
    </div>
  )
}

export default Search;