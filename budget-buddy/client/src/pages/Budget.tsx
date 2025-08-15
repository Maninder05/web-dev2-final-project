import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

interface BudgetData {
  _id: string;
  monthlyLimit: number;
  user?: string;
  date?: string;
}

const Budget = () => {
  const auth = useContext(AuthContext);
  const [budget, setBudget] = useState<BudgetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<boolean>(false);
  const [newAmount, setNewAmount] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0); // for alerts

  // Fetch budget from backend
  const fetchBudget = async () => {
    if (!auth?.token) return;
    setLoading(true);
    try {
      const [budgetRes, transRes] = await Promise.all([
        axios.get("http://localhost:4000/api/budget", { headers: { Authorization: `Bearer ${auth.token}` } }),
        axios.get("http://localhost:4000/api/transactions", { headers: { Authorization: `Bearer ${auth.token}` } }),
      ]);

      if (budgetRes.data) {
        setBudget(budgetRes.data);
        setNewAmount(budgetRes.data.monthlyLimit);
      } else {
        setBudget(null);
        setNewAmount(0);
      }

      // Compute total expenses for alerts
      const totalExpenses = transRes.data
        .filter((t: any) => t.type === "expense")
        .reduce((acc: number, t: any) => acc + t.amount, 0);
      setExpenses(totalExpenses);

    } catch (err) {
      console.error("Failed to fetch budget or transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Save / Update budget
  const handleSave = async () => {
    if (!auth?.token) return;
    try {
      const res = await axios.post(
        "http://localhost:4000/api/budget",
        { monthlyLimit: newAmount },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setBudget(res.data);
      setEditing(false);
    } catch (err) {
      console.error("Failed to save budget:", err);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, [auth?.token]);

  const overBudget = expenses > (budget?.monthlyLimit || 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 flex flex-col">
        <Header />

        {auth?.user && (
          <p className="text-gray-600 mb-4 text-lg">
            Hello, <span className="font-semibold">{auth.user.name}</span> — ready to plan your budget?
          </p>
        )}

        <h1 className="text-3xl font-bold text-yellow-600 mb-6">Budget Planner</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Budget Card */}
          <div className="bg-gray-50 p-6 rounded-3xl shadow-lg flex flex-col justify-between">
            <h2 className="text-xl font-semibold mb-4 text-yellow-600">Monthly Budget</h2>

            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <div className="flex flex-col gap-4">
                {editing ? (
                  <>
                    <input
                      type="number"
                      value={newAmount}
                      onChange={(e) => setNewAmount(Number(e.target.value))}
                      className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(false)}
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-gray-800">${budget?.monthlyLimit || 0}</p>
                    <button
                      onClick={() => setEditing(true)}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-yellow-500 mt-2"
                    >
                      Update Budget
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Alerts Card */}
          <div className={`p-6 rounded-3xl shadow-lg flex flex-col justify-center ${
            overBudget ? "bg-red-100" : "bg-green-100"
          }`}>
            <h2 className={`text-xl font-semibold mb-2 ${overBudget ? "text-red-700" : "text-green-700"}`}>
              {overBudget ? "Over Budget!" : "Within Budget"}
            </h2>
            <p className="text-gray-700">
              {overBudget
                ? `You have spent $${expenses}, which exceeds your monthly limit of $${budget?.monthlyLimit}.`
                : `You have spent $${expenses} of $${budget?.monthlyLimit}. Keep it up!`}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-600">
            Track your monthly spending and adjust your budget accordingly. The alert card will notify you if you exceed your budget.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Budget;
