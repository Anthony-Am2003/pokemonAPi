import { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = () => {
    onSearch(name);
    setName("");
  };

  return (
    <div className="SearchBar">
      <input type="search" onChange={handleChange} value={name} placeholder="Search a Pokemon"/>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;