import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AuthForm({ mode, setMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setPassword("");
    setName("");
  }, [mode]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home", {replace: true}); //redirect to home if already logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseURL = import.meta.env.VITE_API_URL;
    const url = `${baseURL}/api/users/${mode}`;
    const body =
      mode === "register" ? { name, email, password } : { email, password };

    try {
      console.log(url);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      //store token here
      localStorage.setItem("token", data.token);

      if (res.ok) {
        localStorage.setItem("token", data.token); //store JWT
        if (mode === "register") {
          toast.success(data.message);

          setMode("login"); //switch to login after successful registration
        } else {
          toast.success(data.message);
          navigate("/home"); //redirect to home page after successful login
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      setMessage("Network error");
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-extrabold text-center text-white-900 dark:text-white mb-4 ">
            mini-social-app
          </h1>
          <h2 className="text-2xl font-light text-center text-gray-800 dark:text-white mb-6">
            {mode === "register" ? "Create Account" : "Welcome Back"}
          </h2>

          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* Name Field */}
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 
              dark:border-gray-600 dark:bg-gray-700 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
              transition duration-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 
              dark:border-gray-600 dark:bg-gray-700 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
              transition duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 
              dark:border-gray-600 dark:bg-gray-700 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
              transition duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Button */}
            <div className="flex flex-col items-center gap-2">
              {mode === "register" ? (
                <>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-black text-white 
            hover:bg-gray-800 dark:bg-white dark:text-black 
            dark:hover:bg-gray-200 transition duration-200 font-medium cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setMode("login");
                    }}
                    className="w-15 text-white border-b font-light cursor-pointer"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-green-700 text-white 
  hover:bg-green-800 transition duration-200 font-medium cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setMode("register");
                    }}
                    className="w-15  text-white border-b font-light cursor-pointer"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
