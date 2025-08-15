import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth?.signup(name, email, password);
      navigate("/");
    } catch (err) {
      setError("Error creating account");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 via-purple-100 to-purple-50 overflow-hidden">
      {/* Interactive background shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Signup Card */}
      <form 
        onSubmit={submitHandler} 
        className="relative bg-white backdrop-blur-md bg-opacity-80 p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6 z-10"
      >
        <h1 className="text-4xl font-bold text-purple-600 mb-6 text-center">Sign Up</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        />
        
        <button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl font-semibold shadow-md transform hover:scale-105 transition"
        >
          Create Account
        </button>
        
        <p className="text-gray-600 text-center">
          Already have an account?{" "}
          <span 
            className="text-purple-600 font-medium cursor-pointer hover:underline" 
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;

