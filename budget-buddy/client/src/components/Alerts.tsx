import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Alerts = () => {
  const [alerts, setAlerts] = useState<string[]>([]);
  const auth = useContext(AuthContext);

  const checkBudget = async () => {
    try {
      const resTrans = await axios.get("http://localhost:4000/api/transactions", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      const resBudget = await axios.get("http://localhost:4000/api/budget", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });

      const expenses = resTrans.data.filter((t: any) => t.type === "expense")
        .reduce((acc: number, curr: any) => acc + curr.amount, 0);
      const monthlyLimit = resBudget.data?.monthlyLimit || 0;

      if (expenses > monthlyLimit) setAlerts(["⚠️ You have exceeded your monthly budget!"]);
      else setAlerts([]);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { checkBudget(); }, []);

  return (
    <div className="bg-red-50 p-4 rounded shadow-md space-y-2">
      {alerts.length > 0 ? (
        alerts.map((alert, idx) => <p key={idx} className="text-red-600 font-bold">{alert}</p>)
      ) : (
        <p className="text-gray-600">No alerts</p>
      )}
    </div>
  );
};

export default Alerts;
