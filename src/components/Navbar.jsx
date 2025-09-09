import Profile from "../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/FirebaseContext";
import { useContext, useEffect, useState } from "react";
import { MoviesDataContext } from "../context/ApiRequest";
function Navbar() {
  const { userDetail, LogOut } = useAuth();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { MoviesList } = useContext(MoviesDataContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return !MoviesList.length ? (
    ""
  ) : (
    <div
      className={`w-full flex items-center justify-between px-2 py-2 fixed top-0 left-0 z-100 ${
        isScrolled ? "bg-white/10 backdrop-blur-lg" : ""
      }`}
    >
      <h1 className="text-red-600 text-4xl font-bold font-robo">NETFLIX</h1>
      {!userDetail?.email ? (
        <div className="flex gap-2">
          <Link
            to={"/signup"}
            className="bg-red-600 text-white font-poppins px-4 py-1.5 font-normal rounded cursor-pointer"
          >
            Sign Up
          </Link>
          <Link
            to={"/login"}
            className="px-4 py-1 text-white font-normal font-poppins rounded cursor-pointer "
          >
            Login
          </Link>
        </div>
      ) : (
        <div className="relative">
          <img
            className="w-10 cursor-pointer"
            src={Profile}
            alt=""
            onClick={() => {
              setProfileOpen((prev) => !prev);
            }}
          />
          {isProfileOpen && (
            <div className="absolute cursor-pointer animate-open transition duration-150 top-12 right-0 bg-white/30 px-5 pt-10 pb-3  rounded-sm">
              <button
                onClick={() => {
                  LogOut();
                  navigate("/");
                }}
                className="bg-red-600 cursor-pointer hover:bg-red-700 transition duration-200 text-white font-poppins py-1 px-4 whitespace-nowrap"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
