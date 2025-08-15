import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const BudgetPlanner = () => {
  const [limit, setLimit] = useState(0);
  const [success, setSuccess] = useState("");
  const auth = useContext(AuthContext);

  const fetchBudget = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/budget", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      if (data) setLimit(data.monthlyLimit);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, []);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/budget",
        { monthlyLimit: limit },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      setSuccess("Budget updated successfully!");
    } catch (err) {
      console.error(err);
      setSuccess("Error updating budget");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
    >
      <h2 className="text-xl font-bold text-yellow-600">Set Monthly Budget</h2>
      {success && <p className="text-green-500">{success}</p>}
      <input
        type="number"
        placeholder="Monthly Limit"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-yellow-500 text-white px-3 py-2 rounded w-full"
      >
        Save Budget
      </button>
    </form>
  );
};

export default BudgetPlanner;
