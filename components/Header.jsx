import { FaLightbulb, FaMoon } from "react-icons/fa";
import { useEffect } from "react";
import { ThemeContext, useContext } from "../context/ThemeContext";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const { color, setColor, theme, setTheme } = useContext(ThemeContext);

  function changeColor(e) {
    const newColor = e.target.dataset.color;
    localStorage.setItem("color", newColor);
    setColor(newColor);
  }

  function changeTheme() {
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    setTheme(localStorage.getItem("theme"));
  }

  useEffect(() => {
    const localTheme = localStorage.getItem("theme")(
      localTheme === "dark" || localTheme === "light"
    )
      ? setTheme(localTheme)
      : (() => {
          setTheme("dark");
          localStorage.setItem("theme", theme);
        })();
    document.documentElement.classList.toggle("dark", theme !== "light");
    setColor(localStorage.getItem("color") || "red");
    // eslint-disable-next-line
  }, []);

  return (
    <header
      className="flex justify-between items-center border-b pb-3 h-12"
      style={{ borderColor: color }}
    >
      <h1 className={`text-lg font-semibold tracking-widest`} style={{ color }}>
        Yapılacaklar Listesi
      </h1>
      {session && (
        <button
          className="px-2 py-1 rounded-lg text-white dark:text-black font-semibold"
          style={{ backgroundColor: color }}
          onClick={signOut}
        >
          Çıkış Yap
        </button>
      )}
      <div className="flex gap-3">
        <button
          onClick={changeTheme}
          className="color-button flex items-center justify-center bg-black text-white dark:bg-white dark:text-black transition-none"
        >
          {theme === "dark" ? <FaLightbulb /> : <FaMoon />}
        </button>
        <button
          onClick={changeColor}
          data-color="rgb(220 38 38)"
          className="color-button bg-red-600"
        ></button>
        <button
          onClick={changeColor}
          data-color="rgb(37 99 235)"
          className="color-button bg-blue-600"
        ></button>
        <button
          onClick={changeColor}
          data-color="rgb(147 51 234)"
          className="color-button bg-purple-600"
        ></button>
        <button
          onClick={changeColor}
          data-color="rgb(234 88 12)"
          className="color-button bg-orange-600"
        ></button>
      </div>
    </header>
  );
}
