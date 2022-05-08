import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { ThemeContext, useContext } from "../context/ThemeContext";
import { getTodos } from "../firebase";
import { Header, TodoInput, TodoList } from "../components";

export default function Component() {
  const { data: session } = useSession();
  const { color, setTodos } = useContext(ThemeContext);

  useEffect(() => {
    session?.user.email && getTodos(session.user.email).then(setTodos);
  }, [session?.user.email, setTodos]);

  return (
    <>
      {!session ? (
        <>
          <main
            className="container"
            style={{
              borderColor: color,
              boxShadow: `0 0 50px -25px ${color}`,
            }}
          >
            <Header />
            <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black dark:text-white font-semibold tracking-widest">
              Bu uygulamayı kullanmak için giriş yapmalısın!
              <button
                onClick={() => signIn()}
                className="text-white px-3 py-2 rounded-lg mt-3 opacity-90 hover:opacity-100 transition-opacity"
                style={{ backgroundColor: color }}
              >
                Giriş Yap
              </button>
            </div>
          </main>
        </>
      ) : (
        <main
          className="container"
          style={{
            borderColor: color,
            boxShadow: `0 0 50px -25px ${color}`,
          }}
        >
          <Header />
          <TodoList />
          <TodoInput />
          {/* <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{`${todo.id} > ${todo.title}`}</li>
            ))}
          </ul> */}
        </main>
      )}
      <footer className="opacity-50 absolute bottom-0 left-1/2 -translate-x-1/2">
        <h1 className="font-semibold text-black dark:text-white">
          prod by <span style={{ color }}>QUARD</span>
        </h1>
      </footer>
    </>
  );
}
