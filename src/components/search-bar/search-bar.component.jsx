import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./search-bar.styles.css";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/search?q=${searchText}`);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="search-input">Search :</label> */}
        <input
          type="text"
          id="search-input"
          placeholder="search term"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          required
        />
      </form>
    </div>
  );
}

export default SearchBar;
