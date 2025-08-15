import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block p-3 rounded-xl text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 font-medium transition-colors ${
      isActive ? "bg-indigo-200 text-indigo-700" : ""
    }`;

  return (
    <div className="w-64 bg-indigo-50 h-screen p-6 flex flex-col space-y-4">
      <NavLink to="/dashboard" className={linkClass}>
        Dashboard
      </NavLink>
      <NavLink to="/income" className={linkClass}>
        Income
      </NavLink>
      <NavLink to="/expenses" className={linkClass}>
        Expenses
      </NavLink>
      <NavLink to="/budget" className={linkClass}>
        Budget
      </NavLink>
      <NavLink to="/savings" className={linkClass}>
        Savings
      </NavLink>
      <NavLink to="/upgrade" className={linkClass}>
        Upgrade Plan
      </NavLink>
      <NavLink to="/notifications" className={linkClass}>
        Notifications
      </NavLink>
      <NavLink to="/settings" className={linkClass}>
        Settings
      </NavLink>
    </div>
  );
};

export default Sidebar;

