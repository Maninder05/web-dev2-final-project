import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [savings, setSavings] = useState(0);
  const [budget, setBudget] = useState(0);
  const auth = useContext(AuthContext);

  const primaryColor = "#8B5CF6"; 
  const secondaryColor = "#E5E7EB"; 

  const fetchData = async () => {
    try {
      const token = auth?.token;
      if (!token) return;

      // Fetch transactions
      const res = await axios.get("http://localhost:4000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const incomes = res.data
        .filter((t: any) => t.type === "income")
        .reduce((acc: number, curr: any) => acc + curr.amount, 0);

      const expenses = res.data
        .filter((t: any) => t.type === "expense")
        .reduce((acc: number, curr: any) => acc + curr.amount, 0);

      const netSavings = incomes - expenses;

      setIncome(incomes);
      setExpense(expenses);
      setSavings(netSavings);

      // Fetch budget from backend
      const budgetRes = await axios.get("http://localhost:4000/api/budget", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBudget(budgetRes.data?.monthlyLimit || 0);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth?.token]);

  const miniChartData = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        data: [income || 1, expense || 1, savings || 1],
        backgroundColor: [primaryColor, secondaryColor, "#C4B5FD"],
        borderWidth: 1,
      },
    ],
  };

  const fullChartData = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        label: "Finance",
        data: [income || 1, expense || 1, savings || 1],
        backgroundColor: [primaryColor, secondaryColor, "#C4B5FD"],
        borderColor: [primaryColor, secondaryColor, "#A78BFA"],
        borderWidth: 1,
      },
    ],
  };

  // Determine budget card color based on overbudget
  const budgetCardColor =
    expense > budget
      ? "bg-red-500 text-white hover:bg-red-600"
      : "bg-gray-300 text-black hover:bg-gray-400";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 flex flex-col">
        <Header />

        {/* Banner with smaller chart */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-purple-50 text-gray-900 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-semibold mb-2">
              Welcome back, {auth?.user?.name}
            </h1>
            <p className="text-lg">“Track your finances, grow your savings!” ✨</p>
          </div>
          <div className="w-32 h-32 mt-4 md:mt-0">
            <Pie
              data={miniChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "bottom", labels: { boxWidth: 12, padding: 8 } },
                },
              }}
            />
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Income"
            amount={income}
            color="bg-purple-500 text-white hover:bg-purple-700"
            route="/income"
          />
          <DashboardCard
            title="Total Expenses"
            amount={expense}
            color="bg-gray-300 text-black hover:bg-gray-400"
            route="/expenses"
          />
          <DashboardCard
            title="Net Savings"
            amount={savings}
            color="bg-purple-500 text-white hover:bg-purple-700"
            route="/savings"
          />
          <DashboardCard
            title="Check Budget"
            amount={budget}
            color={budgetCardColor}
            route="/budget"
          />
        </div>

        {/* Full Pie Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-md w-full max-w-5xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Income vs Expenses 📊
          </h2>
          <div className="h-72">
            <Pie
              data={fullChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "bottom", labels: { boxWidth: 14, padding: 10 } },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



