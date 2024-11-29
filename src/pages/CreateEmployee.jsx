import React, { useState } from "react";
import BaseSkeleton from "../components/BaseSkeleton";
import useAuthStore from "../store/useAuthStore";
import { ClipLoader } from "react-spinners";

const initEmployeeData = {
  name: "",
  email: "",
  mobileNo: "",
  designation: "HR",
  gender: "M",
  course: "MCA",
};

const CreateEmployee = () => {
  const [employeeFormData, setEmployeeFormData] = useState(initEmployeeData);
  const { onCreateEmployee, isEmployCreating } = useAuthStore();

  const handelEmplyeeFormData = (e) => {
    const { name } = e.target;
    if (name === "mobileNo") {
      setEmployeeFormData((pre) => ({
        ...pre,
        [name]: parseInt(e.target.value),
      }));
    }
    setEmployeeFormData((pre) => ({ ...pre, [name]: e.target.value }));
  };

  return (
    <BaseSkeleton>
      <div className="mt-4 grid grid-cols-12 gap-1">
        <div className="col-span-12 sm:col-span-9 md:col-span-6 bg-white rounded-md px-4 py-6">
          <h1 className="text-xl font-medium text-black/80">Create Employee</h1>
          <form
            className="mt-8"
            onSubmit={(e) => {
              onCreateEmployee(e, employeeFormData);
            }}
          >
            <div className="mt-3 grid grid-cols-3">
              <label htmlFor="eName" className="mb-1">
                Name
              </label>
              <input
                id="eName"
                name="name"
                value={employeeFormData.name}
                onChange={handelEmplyeeFormData}
                className="border outline-none px-2 py-1 rounded-md focus:border-black col-span-2"
                placeholder="employee name"
              />
            </div>
            <div className="mt-3 grid grid-cols-3">
              <label htmlFor="eEmail" className="mb-1">
                Email
              </label>
              <input
                id="eEmail"
                name="email"
                value={employeeFormData.email}
                onChange={handelEmplyeeFormData}
                className="border outline-none px-2 py-1 rounded-md focus:border-black col-span-2"
                placeholder="employee email"
              />
            </div>
            <div className="mt-3 grid grid-cols-3">
              <label htmlFor="eMobile" className="mb-1">
                Mobile No :{" "}
              </label>
              <input
                id="eMobile"
                type="number"
                name="mobileNo"
                value={employeeFormData.mobileNo}
                onChange={handelEmplyeeFormData}
                className="border outline-none px-2 py-1 rounded-md focus:border-black col-span-2"
                placeholder="employee mobile no"
              />
            </div>
            <div className="mt-3 grid grid-cols-3">
              <label htmlFor="eDesignation" className="mb-1">
                Designation :{" "}
              </label>
              <select
                id="eDesignation"
                name="designation"
                value={employeeFormData.designation}
                onChange={handelEmplyeeFormData}
                className="border outline-none px-2 py-1 rounded-md focus:border-black col-span-2"
                placeholder="employee mobile no"
              >
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="sales">sales</option>
              </select>
            </div>
            <div className="mt-3 grid grid-cols-3">
              <label htmlFor="eMobile" className="mb-1">
                Gender :{" "}
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm gap-1">
                  <input
                    id="eMale"
                    type="radio"
                    value="M"
                    name="gender"
                    checked={employeeFormData.gender === "M"}
                    onChange={handelEmplyeeFormData}
                  />
                  <label htmlFor="eMale">Male</label>
                </div>
                <div className="flex items-center text-sm gap-1">
                  <input
                    id="eFemale"
                    type="radio"
                    value="F"
                    name="gender"
                    checked={employeeFormData.gender === "F"}
                    onChange={handelEmplyeeFormData}
                  />
                  <label htmlFor="eFemale">Female</label>
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3">
              <label htmlFor="eCourse" className="mb-1">
                Course :{" "}
              </label>
              <select
                id="eCourse"
                name="course"
                value={employeeFormData.course}
                onChange={handelEmplyeeFormData}
                className="border outline-none px-2 py-1 rounded-md focus:border-black col-span-2"
                placeholder="employee mobile no"
              >
                <option value="MCA">MCA</option>
                <option value="BCA">BCA</option>
                <option value="BSC">BSC</option>
              </select>
            </div>
            <button
              className="bg-blue-500 px-3 py-1 mt-3 rounded-md shadow-sm text-white"
              type="submit"
            >
              Add Employee {isEmployCreating && <ClipLoader size={10} />}
            </button>
          </form>
        </div>
      </div>
    </BaseSkeleton>
  );
};

export default CreateEmployee;
