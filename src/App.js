/* eslint-disable react-hooks/exhaustive-deps */
import { initUser } from "features/todo/todoSlice";
import HomePage from "pages/home_page/home_page";
import LoginPage from "pages/login_page/login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.todo.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const loggedUser = JSON.parse(token);
      dispatch(initUser(loggedUser));
    }
  }, []);

  if (user) return <HomePage />;
  return (
    <div className="flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12">
      <LoginPage />
    </div>
  );
}

export default App;
