import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ExpenseForm from "../components/ExpenseForm";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

interface Transaction {
  category: string;
  amount: number;
  date: string;
}

const Expenses = () => {
  const auth = useContext(AuthContext);
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/transactions", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      const expenseData = res.data.filter((t: any) => t.type === "expense");
      setExpenses(expenseData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [auth?.token]);

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <h1 className="text-3xl font-bold text-red-600 mb-6">Expenses Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add Expense Form Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <ExpenseForm />
          </div>

          {/* Expense History & Total Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-indigo-600">Expense History</h2>

            <div className="mb-4 text-lg font-semibold text-indigo-500">
              Total Expenses: ${totalExpenses}
            </div>

            {loading ? (
              <p className="text-gray-500">Loading expenses...</p>
            ) : expenses.length === 0 ? (
              <p className="text-gray-500">No expenses recorded yet.</p>
            ) : (
              <ul className="space-y-3 max-h-[400px] overflow-y-auto">
                {expenses.map((exp, idx) => (
                  <li
                    key={idx}
                    className="border p-3 rounded flex justify-between items-center hover:bg-indigo-50 transition"
                  >
                    <div>
                      <span className="font-semibold">{exp.category}</span>{" "}
                      <span className="ml-2 text-gray-400 text-sm">
                        {new Date(exp.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="font-bold text-indigo-600">${exp.amount}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Motivational / Tips Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col justify-center items-center text-center">
            <h2 className="text-xl font-bold text-indigo-600 mb-3">💡 Daily Tip</h2>
            <p className="text-gray-700">
              "Small daily savings can turn into big financial freedom. Track your
              spending and watch your wealth grow!"
            </p>
            <div className="mt-4">
              <span className="text-indigo-500 font-semibold text-lg">💰 Stay Motivated!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;


