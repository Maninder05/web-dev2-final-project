import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ExpenseForm = () => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [success, setSuccess] = useState("");
  const auth = useContext(AuthContext);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/transactions",
        { type: "expense", category, amount },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      setSuccess("Expense added successfully!");
      setCategory("");
      setAmount(0);
    } catch (err) {
      console.error(err);
      setSuccess("Error adding expense");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
    >
      <h2 className="text-xl font-bold text-red-600">Add Expense</h2>
      {success && <p className="text-green-500">{success}</p>}
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-red-500 text-white px-3 py-2 rounded w-full"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
