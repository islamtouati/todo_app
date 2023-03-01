import HomePage from "pages/home_page/home_page";
import LoginPage from "pages/login_page/login";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const loggedUser = JSON.parse(token);
      setUser(loggedUser);
    }
  }, []);
  const handleLogout = () => {
    setUser();
    localStorage.clear();
  };
  if (user) return <HomePage user={user} handleLogout={handleLogout} />;
  return (
    <div className="flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12">
      <LoginPage setUser={setUser} />
    </div>
  );
}

export default App;
