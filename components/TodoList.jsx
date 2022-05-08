import { ThemeContext, useContext } from "../context/ThemeContext";
import { FaEdit, FaTrashAlt, FaCheckSquare, FaSquare } from "react-icons/fa";
import { changeDone, deleteTodo, getTodos } from "../firebase";
import { useSession } from "next-auth/react";

export default function TodoList() {
  const { data: session } = useSession();
  const { todos, setTodos, color } = useContext(ThemeContext);

  function handleDelete(id) {
    deleteTodo(id)
      .then(async () => {
        setTodos(await getTodos(session.user.email));
      })
      .catch(console.error);
  }

  function handleDone(id) {
    changeDone(id).then(async () => {
      setTodos(await getTodos(session.user.email));
    });
  }

  return (
    <section className="flex flex-col w-full h-[calc(100%-110px)] space-y-3 mt-5">
      {todos.map((todo) => (
        <article
          key={todo.id}
          className={`flex flex-row justify-between items-center p-3 border rounded-md text-black dark:text-white ${
            todo.done && "line-through"
          }`}
          style={{ borderColor: color }}
        >
          <div className="flex flex-row justify-center items-center space-x-2">
            <button className="icon-button" onClick={() => handleDone(todo.id)}>
              {todo.done ? (
                <FaCheckSquare style={{ color }} />
              ) : (
                <div
                  className="w-4 h-4 border-2 rounded"
                  style={{ borderColor: color }}
                />
              )}
            </button>
            <h1 className="text-black dark:text-white">{todo.title}</h1>
          </div>
          <div className="flex flex-row items-center justify-center space-x-2">
            <button className="icon-button">
              <FaEdit style={{ color }} />
            </button>
            <button
              className="icon-button"
              onClick={() => handleDelete(todo.id)}
            >
              <FaTrashAlt style={{ color }} />
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
