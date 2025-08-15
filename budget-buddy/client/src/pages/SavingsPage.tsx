import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export interface Transaction {
  _id: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense";
}

const SavingsPage = () => {
  const auth = useContext(AuthContext);
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("");

  // Fetch incomes from localStorage or backend
  const fetchIncomes = async () => {
    setLoading(true);
    try {
      let data: Transaction[] = [];
      const stored = localStorage.getItem("incomes");
      if (stored) {
        data = JSON.parse(stored);
      }

      if (auth?.token) {
        const res = await axios.get("http://localhost:4000/api/transactions", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        data = res.data.filter((t: Transaction) => t.type === "income");
        localStorage.setItem("incomes", JSON.stringify(data));
      }
      setIncomes(data);
    } catch (err) {
      console.error("Error fetching incomes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, [auth?.token]);

  // Calculate total savings
  const totalSavings = incomes
    .filter((inc) => !filterCategory || inc.category === filterCategory)
    .reduce((sum, inc) => sum + inc.amount, 0);

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(incomes.map((inc) => inc.category)));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />

        {auth?.user && (
          <p className="text-gray-600 mb-2">
            Welcome back, <span className="font-semibold">{auth.user.name}</span>!
          </p>
        )}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-green-600">Savings</h1>
          <button
            onClick={fetchIncomes}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
          >
            Refresh
          </button>
        </div>

        <div className="bg-white p-6 rounded shadow-md mb-6">
          <h2 className="text-xl font-bold mb-2 text-green-700">
            Total Savings: <span className="text-indigo-700">${totalSavings}</span>
          </h2>

          <div className="flex items-center gap-4 mt-3">
            <label className="font-semibold text-gray-700">Filter by Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Income list */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4 text-green-700">Income History</h2>

          {loading ? (
            <p className="text-gray-500">Loading incomes...</p>
          ) : incomes.length === 0 ? (
            <p className="text-gray-500">No income recorded yet.</p>
          ) : (
            <ul className="space-y-2 max-h-[400px] overflow-y-auto">
              {incomes
                .filter((inc) => !filterCategory || inc.category === filterCategory)
                .map((inc) => (
                  <li
                    key={inc._id}
                    className="flex justify-between items-center p-3 border rounded hover:bg-green-50 transition"
                  >
                    <div>
                      <span className="font-semibold">{inc.category}</span>{" "}
                      <span className="ml-2 text-gray-500 text-sm">
                        {new Date(inc.date).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="font-bold text-green-700">${inc.amount}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="mt-6 bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-3 text-green-700">Tips to Increase Savings</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Track your daily expenses accurately</li>
            <li>Set monthly savings goal</li>
            <li>Avoid unnecessary subscriptions</li>
            <li>Use alerts to avoid overspending</li>
            <li>Review and adjust budget monthly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SavingsPage;

