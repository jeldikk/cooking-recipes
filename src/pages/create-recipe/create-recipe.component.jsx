import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { useFetch } from "../../hooks/use-fetch";
import { firestoreService } from "../../firebase/firebase.config";
import "./create-recipe.styles.css";

function CreateRecipePage() {
  const history = useHistory();
  const ref = useRef(null);
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  // const { postData, data, error, isPending } = useFetch(
  //   "http://localhost:3000/recipes",
  //   "POST"
  // );

  useEffect(() => {
    console.log("ingredients are changed ", ingredients);
  }, [ingredients]);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const methodChangeHandler = (event) => {
    setMethod(event.target.value);
  };

  const cookingTimeHandler = (event) => {
    setCookingTime(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log({ title, method, cookingTime, ingredients });
    const doc = {
      title,
      method,
      cookingTime: `${cookingTime} minutes`,
      ingredients,
    };
    // postData({
    //   title,
    //   method,
    //   ingredients,
    //   cookingTime: `${cookingTime} minutes`,
    // });
    try {
      await firestoreService.collection("recipes").add(doc);
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   console.log("the data is :", { data });
  //   if (data) {
  //     console.log("this is called when postData is called");
  //     console.log("here we are going to redirect the user to user page");
  //     history.push("/");
  //   }
  // }, [data]);

  const addIngredientsHandler = () => {
    // console.log({ ref });
    setIngredients((prevValue) => {
      console.log(prevValue);
      return [...prevValue, newIngredient];
    });

    setNewIngredient("");
    ref.current.focus();
  };

  // console.log({ ref });

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={submitHandler}>
        <label>
          <span>Recipe Title</span>
          <input
            type="text"
            onChange={titleChangeHandler}
            value={title}
            required
          />
        </label>
        <label>
          <span>Recipe Ingredients</span>
          <div className="ingredients">
            <input
              ref={ref}
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
            />
            <button
              type="button"
              className="btn"
              onClick={addIngredientsHandler}
            >
              Add
            </button>
          </div>
          {ingredients.length > 0 && (
            <p className="ingredients">
              Ingredients are :{ingredients.join(",")}
            </p>
          )}
        </label>
        <label>
          <span>Recipe Method</span>
          <textarea
            onChange={methodChangeHandler}
            value={method}
            required
          ></textarea>
        </label>
        <label>
          <span>Cooking Time(in minutes)</span>
          <input
            type="number"
            onChange={cookingTimeHandler}
            value={cookingTime}
            required
          />
        </label>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateRecipePage;
