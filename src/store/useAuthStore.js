import { create } from "zustand";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import { apiServer } from "../lib/apiServer";

const useAuthStore = create((set, get) => ({
  isAuthenticated: false,

  isLoading: false,

  user: {
    username: "rithick",
  },

  isLoging: false,

  onLogin: async (event, data) => {
    event.preventDefault();
    if (!data.username || !data.password) {
      toast.error("Enter username and password");
      return;
    }
    if (!data.username) {
      toast.error("Enter username");
      return;
    }
    if (!data.password) {
      toast.error("Enter password");
      return;
    }
    set({ isLoging: true });


    try {
      const res = await apiServer.post("/user/login", data);
      Cookies.set("tokenAuth1", res.data.token, { expires: 2 });
      apiServer.defaults.headers.common[
        "Authorization"
      ] = `Barear ${Cookies.get("tokenAuth1")}`;
      set({isAuthenticated: true})
      toast.success(res.data.msg);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
    set({ isLoging: false });

  },


  chechAuth: async () => {
    if (Cookies.get("tokenAuth1") === undefined) {
      return;
    }
    set({ isLoading: true });
    try {
      const { data } = await apiServer.get("/user/check");
      set({ user: data.userData, isAuthenticated: true });
    } catch (err) {
      console.log(err);
    }
    set({ isLoading: false });
  },

  isEmployCreating: false,

  onCreateEmployee: async (event, data) => {
    event.preventDefault();
    const { name, email, mobileNo, designation, gender, course} =
      data;
    if (!name) {
      return toast.error("fill name");
    }
    if (!email) {
      return toast.error("fill email");
    }
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      return toast.error("Enter valid email id");
    }
    if (!mobileNo) {
      return toast.error("fill mobile No");
    }
    const isNumeric = /^[0-9]+$/.test(mobileNo);
    if (!isNumeric) {
      return toast.error("Enter valid mobile number");
    }
    if (!designation) {
      return toast.error("select designation");
    }
    if (!gender) {
      return toast.error("select gender");
    }
    if (!course) {
      return toast.error("select course");
    }
    set({isEmployCreating: true})
    try {
      const res = await apiServer.post("/user/empolyee", data);
      toast.success(`${res.data.msg}`);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
    set({isEmployCreating: false})
  },

  employeeList: [],

  isEmployeeListLoading: false,

  onGetEmployeeList: async () => {
    set({ isEmployeeListLoading: true });
    try {
      const {data} = await apiServer.get("/user/empolyee");
      set({ employeeList: data.employeeList });
    } catch (err) {
      console.log(err);
    }
    set({ isEmployeeListLoading: false });
  },

  onLogout : () => {
    Cookies.remove("tokenAuth1")
    apiServer.defaults.headers.common[
      "Authorization"
    ] = `Barear ${Cookies.get("tokenAuth1")}`;
    set({isAuthenticated: false})
    toast.success("logout sucessfully")
  }
}));

export default useAuthStore;
