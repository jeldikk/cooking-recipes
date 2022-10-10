import { Link } from "react-router-dom";
import { firestoreService } from "../../firebase/firebase.config";
import "./recipe-list.styles.css";

function RecipeList({ recipes }) {
  const deleteRecipeHandler = (id) => {
    firestoreService
      .collection("recipes")
      .doc(id)
      .delete()
      .then((data) => {
        console.log({ data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (recipes.length === 0) {
    return <div className="error">No Recipes to load ...</div>;
  }
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card">
          <div
            className="controls"
            onClick={() => deleteRecipeHandler(recipe.id)}
          >
            Remove
          </div>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div>{recipe.method.substring(0, 100)} ...</div>
          <Link className="cook-this" to={`/recipes/${recipe.id}`}>
            Cook This
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
