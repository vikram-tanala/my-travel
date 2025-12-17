import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Standardized to VITE_URL
  const baseUrl = import.meta.env.VITE_B_URL;

  const handlAPI = async (e) => {
    e.preventDefault();
    console.log("ENV OBJECT:", import.meta.env);
console.log("VITE_B_URL:", import.meta.env.VITE_B_URL);

    try {
      // Standardized path: added /api/user to match your other files
      const res = await fetch(`${baseUrl}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Network error. Is the server running?");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center font-roboto">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)" }}
      />
      <div className="absolute inset-0 bg-linear-to-br from-slate-900/70 via-indigo-900/60 to-slate-900/70" />

      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10">
        <h1 className="text-4xl text-center mb-2 text-indigo-600" style={{ fontFamily: "Caveat, cursive" }}>
          Travel Trip
        </h1>
        <p className="text-center text-slate-500 mb-8">Sign in to plan your next journey</p>

        <form onSubmit={handlAPI} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium shadow transition">
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-slate-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 font-medium hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;