import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });

  const handleSignup = async () => {
    if (!form.fullName || !form.email || !form.password) {
      alert("All fields are required!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/auth/signup", form);
      alert("Signup Successful! You can now login.");
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <input className="w-full p-2 border rounded mt-2" type="text" placeholder="Full Name" onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input className="w-full p-2 border rounded mt-2" type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full p-2 border rounded mt-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-blue-600 text-white p-2 rounded mt-4" onClick={handleSignup}>Signup</button>
        <p className="text-center mt-2 cursor-pointer text-blue-600" onClick={() => navigate("/login")}>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default Signup;
