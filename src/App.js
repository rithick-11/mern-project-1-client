import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  CreateEmployee,
  DashBoard,
  EmployeeEdit,
  EmployeeList,
  Login,
} from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from "./store/useAuthStore";

const App = () => {
  const { chechAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    chechAuth();
  }, [chechAuth,isAuthenticated]);

  return (
    <div>
      <Routes>
        <Route path="/login" exact element={<Login />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" exact element={<DashBoard />}></Route>
          <Route
            path="/create-employee"
            exact
            element={<CreateEmployee />}
          ></Route>
          <Route
            path="/edit-employee/:id"
            exact
            element={<EmployeeEdit />}
          ></Route>
          <Route path="/employee-list" exact element={<EmployeeList />}></Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
