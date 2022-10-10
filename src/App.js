import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header.component";
import ThemeSelector from "./components/theme-selector/theme-selector.component";

import CreateRecipePage from "./pages/create-recipe/create-recipe.component";
import Homepage from "./pages/homepage/homepage.component";
import RecipeDetails from "./pages/recipe-details/recipe-details.component";
import SearchResults from "./pages/search-results/search-results.component";

function App() {
  return (
    <div className="App">
      <Header />
      <ThemeSelector />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/create" component={CreateRecipePage} />
        <Route path="/search" component={SearchResults} />
        <Route path="/recipes/:id" component={RecipeDetails} />
      </Switch>
    </div>
  );
}

export default App;
