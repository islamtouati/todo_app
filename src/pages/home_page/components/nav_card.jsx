import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";

function NavBarCard(params) {
  const { user, handleLogout } = params;
  return (
    <nav className="flex justify-between items-center w-full py-3">
      <h1 className="font-bold text-xl text-black">
        Hello{" "}
        <span className="font-bold text-2xl text-indigo-600">{user.email}</span>{" "}
        👋🏻
      </h1>
      <div
        className="flex items-center justify-center p-2 rounded-lg bg-red-100 cursor-pointer"
        onClick={handleLogout}
      >
        <ArrowRightOnRectangleIcon
          className="text-red-600 h-5 w-5
            "
        />
      </div>
    </nav>
  );
}

export default NavBarCard;
