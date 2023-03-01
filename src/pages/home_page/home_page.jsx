import BodyCard from "./components/body_card";
import NavBarCard from "./components/nav_card";

function HomePage(params) {
  const { user, handleLogout } = params;
  return (
    <div className="flex min-h-screen flex-col justify-start overflow-hidden pb-6 sm:pb-12 max-w-7xl mx-auto">
      <NavBarCard user={user} handleLogout={handleLogout} />
      <BodyCard userID={user.id} />
    </div>
  );
}
export default HomePage;
