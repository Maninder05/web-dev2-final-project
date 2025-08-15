import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const UpgradePlan = ({ onUpgrade }: { onUpgrade: () => void }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-purple-600 mb-4">Premium Plan</h2>
      <p className="text-gray-700 mb-4">
        Unlock all features for <span className="font-semibold">$9.99/month</span>
      </p>
      <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
        <li>Detailed monthly analytics</li>
        <li>Unlimited budget alerts</li>
        <li>Custom savings goals</li>
        <li>Priority support</li>
      </ul>
      <button
        onClick={onUpgrade}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500 w-full"
      >
        Upgrade Now
      </button>
    </div>
  );
};

const Upgrade = () => {
  const [upgraded, setUpgraded] = useState(false);

  const handleUpgrade = () => {
    setUpgraded(true);
    alert("🎉 Plan upgraded successfully! You now have access to all Premium features at $9.99/month.");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <h1 className="text-3xl font-bold text-purple-600 mb-6">Upgrade Plan</h1>

        <UpgradePlan onUpgrade={handleUpgrade} />

        {upgraded && (
          <div className="mt-6 bg-purple-50 p-6 rounded-lg shadow-md border-l-4 border-purple-600">
            <h2 className="text-xl font-bold text-purple-700 mb-2">🎉 Premium Activated!</h2>
            <p className="text-gray-700 mb-2">
              You now enjoy:
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Detailed monthly analytics</li>
              <li>Unlimited budget alerts</li>
              <li>Custom savings goals</li>
              <li>Priority support</li>
            </ul>
            <p className="mt-3 font-semibold text-purple-600">Price: $9.99/month</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upgrade;
