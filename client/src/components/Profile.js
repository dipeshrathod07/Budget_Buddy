import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/man.png";

export default function Profile({setViewProfile }) {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function handleGetUser() {
      const res = await fetch("/user/getProfile");
      const data = await res.json();
      // console.log(data);
      if (data.errors) {
        navigate("/");
      } else {
        setUser(data.user);
      }
    }
    handleGetUser();
  }, []);

  const handleLogOut = async () => {
    const res = await fetch("/user/logout");
    console.log(res.data);
    // props.setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div
      className="lg:flex hidden justify-end mt-4 items-center mr-10 cursor-pointer w-fit ml-auto hover:scale-110 duration-100 ease-out"
      onMouseEnter={() => {
        setViewProfile("block");
      }}
      onMouseLeave={() => {
        setViewProfile("hidden");
      }}
    >
      <h1 className="text-white mr-4 text-lg font-semibold">Hi, {user.name}</h1>
      <img src={avatar} alt="user" className="h-10 bg-mj-black rounded-full" />
      <div className="hidden lg:block mx-4">
          <button
            onClick={handleLogOut}
            className="bg-mj-yellow px-2 py-1 text-sm flex  gap-2 rounded-md font-bold duration-300 ease-out hover:scale-110"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </span>
            Logout
          </button>
        </div>
    </div>
  );
}
