import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

interface NotificationSettings {
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushNotifications: boolean;
}

const Notifications = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<NotificationSettings>({
    emailAlerts: false,
    smsAlerts: false,
    pushNotifications: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("notificationSettings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    localStorage.setItem("notificationSettings", JSON.stringify(settings));
    alert("✅ Notification settings saved successfully!");
  };

  const handleCancel = () => navigate("/dashboard");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white-100 via-gray-200 to-gray-300">
      <Sidebar />
      <div className="flex-1 p-6 flex flex-col">
        <Header />

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-500 mb-1">Notification Settings</h1>
          <p className="text-gray-600 italic">"Stay informed, stay in control! 🌟"</p>
        </div>

        {/* Main Card */}
        <div className="bg-gray-50 rounded-3xl shadow-xl p-8 flex flex-col gap-6 max-w-5xl mx-auto w-full">
          <h2 className="text-2xl font-semibold text-indigo-500 mb-2">Manage Your Notifications</h2>
          <p className="text-gray-500 mb-4">
            Select which notifications you want to receive. Adjust anytime! ✨
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span>📧 Email Alerts</span>
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={() => handleToggle("emailAlerts")}
                className="w-6 h-6 accent-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span>📱 SMS Alerts</span>
              <input
                type="checkbox"
                checked={settings.smsAlerts}
                onChange={() => handleToggle("smsAlerts")}
                className="w-6 h-6 accent-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span>🔔 Push Notifications</span>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={() => handleToggle("pushNotifications")}
                className="w-6 h-6 accent-indigo-500"
              />
            </div>
          </div>

          {/* Tips / Quote */}
          <div className="mt-6 p-4 bg-gray-200 rounded-xl border-l-4 border-indigo-300">
            <p className="text-indigo-700 font-medium">
              💡 Tip: Enable push notifications to never miss a budget alert or important update.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={handleSave}
              className="bg-indigo-500 text-white px-6 py-3 rounded-xl hover:bg-indigo-400 font-semibold transition-all"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-6 py-3 rounded-xl hover:bg-gray-300 font-semibold transition-all"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Footer / Quote */}
        <div className="mt-10 text-center text-gray-500 italic">
          "Your notifications, your control. Make them work for you! 🌟"
        </div>
      </div>
    </div>
  );
};

export default Notifications;
