import { Link, useNavigate } from "react-router-dom";
import Banner from "../assets/banner.jpg";
import { useAuth } from "../context/FirebaseContext";
import { useState } from "react";

export default function Login() {
  const { loginWithEmailPassword } = useAuth();
  const navigate = useNavigate();
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChanges = (e) => {
    setUserLoginData((prev) => ({
      ...prev,
      [e?.target?.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginWithEmailPassword(
        userLoginData.email,
        userLoginData.password
      );
      console.log("Logged in user:", user.uid);
      navigate("/");
    } catch (err) {
      alert(err.message); // show error to user
    }
  };
  return (
    <div
      className="w-screen h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${Banner})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Centered form */}
      <div className="flex justify-center items-center h-full relative z-10">
        <div className="bg-black/80 p-10 rounded-md w-full max-w-md">
          <h1 className="text-white text-3xl font-bold mb-6">Login</h1>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={userLoginData?.email}
              onChange={handleChanges}
              placeholder="Email or phone number"
              className="p-3 rounded bg-neutral-800 text-white placeholder-gray-400 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={userLoginData?.password}
              onChange={handleChanges}
              className="p-3 rounded bg-neutral-800 text-white placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-red-600 cursor-pointer hover:bg-red-700 transition p-3 rounded text-white font-semibold">
              Sign In
            </button>
          </form>

          {/* Extras */}
          <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-red-600" />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:underline">
              Need help?
            </a>
          </div>

          {/* Footer */}
          <p className="text-gray-400 mt-6">
            New to Netflix?{" "}
            <Link
              to="/signup"
              className="text-white hover:text-red-600 hover:underline transition duration-100"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
