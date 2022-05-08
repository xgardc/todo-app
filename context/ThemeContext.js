import { createContext, useContext, useState } from "react";

const context = createContext();

export const Provider = ({ children }) => {
  const [color, setColor] = useState();
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState();

  const methods = {
    color,
    setColor,
    todos,
    setTodos,
    theme,
    setTheme,
  };
  return <context.Provider value={methods}>{children}</context.Provider>;
};

export { context as ThemeContext, useContext };
