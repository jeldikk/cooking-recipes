import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestoreService } from "../../firebase/firebase.config";
// import { useFetch } from "../../hooks/use-fetch";
import "./recipe-details.styles.css";

function RecipeDetails() {
  const params = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);
    firestoreService
      .collection("recipes")
      .doc(params.id)
      .get()
      .then((snapshot) => {
        console.log({ snapshot });
        setRecipe(snapshot.data());
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        console.log("finally is called");
        setIsPending(false);
      });
  }, [params.id]);

  return (
    <div className="recipe-details">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading ...</p>}
      {recipe && (
        <>
          <div className="controls">Remove</div>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
}

export default RecipeDetails;
