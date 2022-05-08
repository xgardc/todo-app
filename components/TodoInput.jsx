import { useState } from "react";
import { ThemeContext, useContext } from "../context/ThemeContext";
import { FaPlus } from "react-icons/fa";
import { getTodos, newTodo } from "../firebase";
import { useSession } from "next-auth/react";

export default function TodoInput() {
  const { data: session } = useSession();
  const { color, setTodos } = useContext(ThemeContext);

  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    newTodo({ author: session.user.email, title: text }).then(async () => {
      setTodos(await getTodos(session.user.email));
      setText("");
    });
  }

  return (
    <form
      className="h-10 flex justify-center items-center w-full"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="w-[calc(100%-40px)] h-full border px-2 rounded-lg rounded-r-none bg-white dark:bg-neutral-900 focus-visible:outline-none"
        style={{ borderColor: color }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <button
        type="submit"
        className="w-10 h-10 flex items-center justify-center border border-l-0 rounded-lg rounded-l-none"
        style={{ borderColor: color }}
      >
        <FaPlus className="text-2xl transition-none" style={{ color }} />
      </button>
    </form>
  );
}
