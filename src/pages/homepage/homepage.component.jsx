import { useEffect, useState } from "react";
import RecipeList from "../../components/recipe-list/recipe-list.component";
// import { useFetch } from "../../hooks/use-fetch";
import { firestoreService } from "../../firebase/firebase.config";
import "./homepage.styles.css";

function Homepage() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  // const { data, isPending, error } = useFetch("http://localhost:3000/recipes");
  // console.log({ data });
  useEffect(() => {
    setIsPending(true);

    const unsubscribe = firestoreService
      .collection("recipes")
      .orderBy("title")
      .onSnapshot(
        (snapshot) => {
          console.log({ documents: snapshot.docs });
          const results = [];
          if (snapshot.empty) {
            setError("No recipes to load");
            setIsPending(false);
          } else {
            snapshot.docs.forEach((doc) => {
              console.log({ id: doc.id });
              results.push({ id: doc.id, ...doc.data() });
            });
            console.log({ results });
            setData(results);
            setIsPending(false);
          }
        },
        (err) => {
          setError(err.message);
          setIsPending(false);
        }
      );

    return () => unsubscribe();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading ...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}

export default Homepage;
