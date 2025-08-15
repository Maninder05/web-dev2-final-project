import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import IncomeForm from "../components/IncomeForm";

interface Transaction {
  _id: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense";
}

const Income = () => {
  const auth = useContext(AuthContext);
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingIncome, setEditingIncome] = useState<Transaction | null>(null);

  // Fetch from backend or localStorage
  const fetchIncomes = async () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem("incomes");
      if (stored) {
        setIncomes(JSON.parse(stored));
      } else if (auth?.token) {
        const res = await axios.get("http://localhost:4000/api/transactions", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        const incomeData = res.data.filter((t: Transaction) => t.type === "income");
        setIncomes(incomeData);
        localStorage.setItem("incomes", JSON.stringify(incomeData));
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (income: { category: string; amount: number; type: "income" }) => {
    const newIncome: Transaction = {
      _id: Date.now().toString(), // temporary id for frontend
      category: income.category,
      amount: income.amount,
      date: new Date().toISOString(),
      type: income.type,
    };
    const updated = [newIncome, ...incomes];
    setIncomes(updated);
    localStorage.setItem("incomes", JSON.stringify(updated));
  };

  const handleUpdate = (updatedIncome: Transaction) => {
    const updated = incomes.map((inc) =>
      inc._id === updatedIncome._id ? updatedIncome : inc
    );
    setIncomes(updated);
    localStorage.setItem("incomes", JSON.stringify(updated));
  };

  const handleDelete = (id: string) => {
    const updated = incomes.filter((inc) => inc._id !== id);
    setIncomes(updated);
    localStorage.setItem("incomes", JSON.stringify(updated));
  };

  useEffect(() => {
    fetchIncomes();
  }, [auth?.token]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 flex flex-col">
        <Header />
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Income</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IncomeForm
            key={editingIncome?._id || "new"}
            existingIncome={editingIncome || undefined}
            onSuccess={(income: any) => {
              editingIncome
                ? handleUpdate({ ...editingIncome, ...income })
                : handleAdd({ ...income, type: "income" });
              setEditingIncome(null);
            }}
            onCancel={() => setEditingIncome(null)}
          />

          <div className="bg-white p-6 rounded shadow-md h-full">
            <h2 className="text-xl font-bold mb-4 text-green-600">Income History</h2>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : incomes.length === 0 ? (
              <p className="text-gray-500">No income recorded yet.</p>
            ) : (
              <ul className="space-y-3 max-h-[500px] overflow-y-auto">
                {incomes.map((inc) => (
                  <li
                    key={inc._id}
                    className="border p-3 rounded flex justify-between items-center hover:bg-green-50"
                  >
                    <div>
                      <span className="font-semibold">{inc.category}</span>{" "}
                      <span className="ml-2 text-gray-500 text-sm">
                        {new Date(inc.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-700">${inc.amount}</span>
                      <button
                        onClick={() => setEditingIncome(inc)}
                        className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-500 text-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(inc._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;





