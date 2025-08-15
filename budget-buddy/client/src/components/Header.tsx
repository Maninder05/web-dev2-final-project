import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    auth?.logout();
    window.location.href = "/login"; // redirect to login after logout
  };

  return (
   <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-xl mb-6">
    <h1 className="text-2xl font-bold text-indigo-500">Budget Buddy</h1>

      <div className="flex items-center gap-4">
        {/* <span className="text-gray-800 font-medium">
          {auth?.user?.name || "Guest"}
        </span> */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
