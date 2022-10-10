import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const initialState = {
  color: "#58249c",
  mode: "light",
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return {
        ...state,
        color: action.payload,
      };
    case "CHANGE_MODE":
      return {
        ...state,
        mode: action.payload,
      };
    default:
      return state;
  }
};

export function ThemeContextProvider({ children }) {
  /*
    Here we can use useState's or useReducer's
    Here we can use multiple useStates to manage and update global state,
    but when the project gets complex we may bloat the provider class with many functions

    and also if we wanted to change multiple states at once, we can end up using multiple setStates
    which is also not good

  */
  const [state, dispatch] = useReducer(themeReducer, initialState);

  function changeColor(color) {
    console.log("change color is called");
    dispatch({
      type: "CHANGE_COLOR",
      payload: color,
    });
  }

  function changeMode(mode) {
    dispatch({
      type: "CHANGE_MODE",
      payload: mode,
    });
  }
  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
