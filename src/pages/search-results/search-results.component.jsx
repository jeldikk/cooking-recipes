import { useLocation } from "react-router-dom";
import "./search-results.styles.css";
// import { useFetch } from "../../hooks/use-fetch";
import RecipeList from "../../components/recipe-list/recipe-list.component";
import { useEffect, useState } from "react";
import { firestoreService } from "../../firebase/firebase.config";

function SearchResults() {
  const queryString = useLocation();
  const queryParams = new URLSearchParams(queryString.search);
  const searchText = queryParams.get("q");

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  console.log({ searchText });
  // const url = `http://localhost:3000/recipes?q=${searchText}`;

  console.log({ queryString, queryParams });
  // const { data, isPending, error } = useFetch(url);
  useEffect(() => {
    firestoreService
      .collection("recipes")
      .where("title", ">=", searchText)
      .where("title", "<=", searchText + "z")
      .get()
      .then((snapshot) => {
        console.log({ snapshot });
        const results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setData(results);
        setIsPending(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setIsPending(false);
      });
  }, [searchText]);

  return (
    <div>
      <h2 className="page-title">Recipes including "{searchText}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading ... </p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}

export default SearchResults;
