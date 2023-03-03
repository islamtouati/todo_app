import BodyCard from "./components/body_card";
import ModelsCard from "./components/models_card";
import NavBarCard from "./components/nav_card";

function HomePage(params) {
  return (
    <div className="flex min-h-screen flex-col justify-start overflow-hidden pb-6 sm:pb-12 max-w-5xl mx-auto">
      <NavBarCard />
      <BodyCard />
      <ModelsCard />
    </div>
  );
}
export default HomePage;
