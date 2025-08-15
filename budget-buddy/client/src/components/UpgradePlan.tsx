const UpgradePlan = () => (
  <div className="bg-white p-6 rounded shadow-md w-full max-w-lg space-y-4">
    <h2 className="text-xl font-bold text-purple-600">Upgrade to Premium</h2>
    <p className="text-gray-700">
      Get advanced financial tips, alerts, and detailed monthly analytics by upgrading your plan.
    </p>
    <ul className="list-disc pl-5 text-gray-700">
      <li>Unlimited Budget Alerts</li>
      <li>Advanced Pie Chart Analytics</li>
      <li>Priority Support</li>
      <li>Custom Savings Goals</li>
    </ul>
    <button className="bg-purple-500 text-white px-4 py-2 rounded mt-3">Upgrade Now</button>
  </div>
);

export default UpgradePlan;
