import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Settings = () => {
  const auth = useContext(AuthContext);

  const [name, setName] = useState(auth?.user?.name || "");
  const [email, setEmail] = useState(auth?.user?.email || "");
  const [themeDark, setThemeDark] = useState(false);

  // Initialize notifications safely with default values
  const [emailAlerts, setEmailAlerts] = useState(
    auth?.user?.notifications?.emailAlerts ?? true
  );
  const [smsAlerts, setSmsAlerts] = useState(
    auth?.user?.notifications?.smsAlerts ?? true
  );
  const [pushNotifications, setPushNotifications] = useState(
    auth?.user?.notifications?.pushNotifications ?? true
  );

  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeDark");
    if (savedTheme) setThemeDark(JSON.parse(savedTheme));
  }, []);

  const handleSave = () => {
    if (auth?.setUser) {
      auth.setUser({
        ...auth.user,
        name,
        email,
        notifications: {
          emailAlerts,
          smsAlerts,
          pushNotifications,
        },
      });
    }

    localStorage.setItem("themeDark", JSON.stringify(themeDark));

    setSuccessMsg("🎉 Your profile and settings have been updated!");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className={`flex min-h-screen ${themeDark ? "bg-gray-900" : "bg-white-50"}`}>
      <Sidebar />
      <div className="flex-1 p-6 flex flex-col">
        <Header />

        <div className="mb-6">
          <h1 className="text-4xl font-bold text-cyan-700 mb-1">Settings</h1>
          <p className="text-gray-600 italic">Customize your profile and preferences ✨</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-6 max-w-5xl mx-auto w-full">
          {successMsg && (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg font-medium">
              {successMsg}
            </div>
          )}

          <h2 className="text-2xl font-semibold text-cyan-700 mb-2">Profile</h2>
          <p className="text-gray-500 mb-4">Update your display name and email.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Preferred Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-4 rounded-xl w-full focus:ring-2 focus:ring-cyan-400 transition"
            />
            <input
              type="email"
              placeholder="Alternate Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-4 rounded-xl w-full focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>

          {/* Preferences */}
          <h2 className="text-2xl font-semibold text-cyan-700 mt-6">Preferences</h2>
          <p className="text-gray-500 mb-4">Customize your experience on the platform.</p>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center justify-between p-4 bg-cyan-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span>🌙 Dark Mode</span>
              <input
                type="checkbox"
                checked={themeDark}
                onChange={() => setThemeDark(!themeDark)}
                className="w-6 h-6 accent-cyan-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-cyan-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span>📧 Task History </span>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={() => setEmailAlerts(!emailAlerts)}
                className="w-6 h-6 accent-cyan-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-cyan-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span>📱 Data Backup</span>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={() => setSmsAlerts(!smsAlerts)}
                className="w-6 h-6 accent-cyan-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-cyan-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span>🔔 Important Messages</span>
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={() => setPushNotifications(!pushNotifications)}
                className="w-6 h-6 accent-cyan-600"
              />
            </div>
          </div>

          {/* Tip Box */}
          <div className="mt-6 p-4 bg-cyan-100 rounded-xl border-l-4 border-cyan-400">
            <p className="text-cyan-700 font-medium">
              💡 Tip: Keep your profile updated so your dashboard shows your latest information instantly.
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="bg-cyan-600 text-white px-6 py-3 rounded-xl hover:bg-cyan-500 font-semibold transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Footer / Quote */}
        <div className="mt-10 text-center text-gray-500 italic">
          "Settings are the key to a smooth and personalized experience. 🔑"
        </div>
      </div>
    </div>
  );
};

export default Settings;
