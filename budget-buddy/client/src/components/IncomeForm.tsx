import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

interface IncomeFormProps {
  existingIncome?: { _id: string; category: string; amount: number };
  onSuccess?: (income: { category: string; amount: number; type: "income" }) => void;
  onCancel?: () => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ existingIncome, onSuccess, onCancel }) => {
  const [category, setCategory] = useState(existingIncome?.category || "");
  const [amount, setAmount] = useState(existingIncome?.amount || 0);
  const auth = useContext(AuthContext);

  useEffect(() => {
    setCategory(existingIncome?.category || "");
    setAmount(existingIncome?.amount || 0);
  }, [existingIncome]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth?.token) return console.error("No auth token found");

    try {
      if (!existingIncome) {
        // Only POST to backend for new income
        await axios.post(
          "http://localhost:4000/api/transactions",
          { type: "income", category, amount },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
      }

      // Call onSuccess for frontend update (for both add & update)
      onSuccess?.({ category, amount, type: "income" });

      setCategory("");
      setAmount(0);
      onCancel?.();
    } catch (err: any) {
      console.error("Axios error:", err.response?.data || err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 w-full">
      <h2 className="text-xl font-bold text-indigo-700">
        {existingIncome ? "Update Income" : "Add Income"}
      </h2>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 w-full rounded"
        required
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-indigo-700 text-white px-4 py-2 rounded flex-1">
          {existingIncome ? "Update" : "Add"}
        </button>
        {existingIncome && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded flex-1"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default IncomeForm;




