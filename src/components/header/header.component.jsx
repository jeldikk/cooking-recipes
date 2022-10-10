import { Link } from "react-router-dom";
import SearchBar from "../search-bar/search-bar.component";
// import { ThemeContext } from "../../context/theme-context";
// import ThemeSelector from "../theme-selector/theme-selector.component";
import { useTheme } from "../../hooks/use-theme";
import "./header.styles.css";

function Header() {
  const theme = useTheme();
  return (
    <header className="navbar" style={{ background: theme.color }}>
      <nav>
        <Link to="/" className="brand">
          Cooking Ninja
        </Link>
        <SearchBar />
        <Link to="/create">Create Recipe</Link>
        {/* <Link to="/search">Search Recipe</Link> */}
      </nav>
      {/* <ThemeSelector /> */}
    </header>
  );
}

export default Header;
