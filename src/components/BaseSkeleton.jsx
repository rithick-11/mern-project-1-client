import React from "react";
import { Link } from "react-router-dom";
import { HiMiniXMark } from "react-icons/hi2";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import Cookies from "js-cookie"
import toast from "react-hot-toast";

import useAuthStore from "../store/useAuthStore";
import { useState } from "react";
import { apiServer } from "../lib/apiServer";


const navList = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Employee List",
    path: "/employee-list",
  },
];

const BaseSkeleton = ({ children }) => {
  const [showNav, setShowNav] = useState(false);
  const { user, isAuthenticated, onLogout } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-200">
      <nav className="h-[10vh] max-h[10vh] bg-gray-600 relative">
        <div className="w-[90%] flex items-center justify-between mx-auto px-2 py-4 text-white">
          <h1 className="text-2xl font-serif font-semibold">Logo</h1>
          {isAuthenticated && (
            <>
              <button
                className="sm:hidden"
                onClick={() => {
                  setShowNav((pre) => !pre);
                }}
              >
                {showNav ? <RiBarChartHorizontalLine /> : <HiMiniXMark />}
              </button>
              {!showNav && (
                <div className="absolute bg-white sm:bg-transparent sm:shadow-none sm:text-[18px] sm:text-white/80 text-black text-sm rounded-md shadow-md  right-5 top-16 px-4 py-6 sm:p-0  sm:flex sm:w-3/4 sm:justify-between sm:items-center sm:static">
                  <ul className="flex  items-start sm:items-center flex-col gap-2 sm:gap-3 sm:flex-row">
                    {navList.map((each, i) => (
                      <li key={`nav${i}`}>
                        <Link to={each.path}>{each.label}</Link>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 sm:mt-0 flex items-center gap-2" onClick={onLogout}>
                    <h1>{user.fullName}</h1>
                    <MdOutlineLogout className="text-xl" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
      <div className="h-[90vh] w-[90%] mx-auto">{children}</div>
    </div>
  );
};

export default BaseSkeleton;
