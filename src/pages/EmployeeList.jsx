import React, { useEffect } from "react";
import BaseSkeleton from "../components/BaseSkeleton";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import EmployeeTableList from "../components/EmployeeTableList";

const EmployeeList = () => {
  const { onGetEmployeeList, isEmployeeListLoading, employeeList } =
    useAuthStore();

  useEffect(() => {
    onGetEmployeeList();
  }, []);

  console.log(isEmployeeListLoading, employeeList);

  return (
    <BaseSkeleton>
      <div className="grid grid-cols-12 gap-1 mt-4">
        <div className="col-span-12 sm:col-span-3 text-right text-sm font-semibold sm:col-start-7 flex items-center justify-end">
          Total Count: {employeeList.length}
        </div>
        <div className="col-span-12 sm:col-span-3  text-right flex justify-end">
          <Link
            to="/create-employee"
            className="bg-green-500 px-4 rounded-md font-medium text-gray-700 py-[2px]"
          >
            Create Employee
          </Link>
        </div>
        <div className="col-span-12 overflow-y-scroll mt-5">
          <table className=" w-full divide-y-1 divide-gray-600">
            <tr className="bg-gray-400/30 border-2 border-b-gray-600 text-start ">
              <th className="w-4 tracking-wider text-sm px-2 py-1 text-black/75">
                Id
              </th>
              <th className="w-4 tracking-wider text-sm px-2 py-1 text-black/75">
                Image
              </th>
              <th className="w-4 tracking-wider text-sm px-2 py-1 text-black/75">
                Name
              </th>
              <th className="w-4 tracking-wider text-sm px-2 py-1 text-black/75">
                Email
              </th>
              <th className="w-4 tracking-wider text-sm px-2 py-1 text-black/75">
                Mobile No
              </th>
              <th className="w-4 tracking-wider text-sm px-2 py-1 text-black/75">
                Designation
              </th>
              <th className="w-4 tracking-wider text-sm px-2 py-1 text-black/75">
                gender
              </th>
              <th className="w-4 tracking-wider text-sm px-2 py-1 text-black/75">
                Course
              </th>
              <th className="w-4 tracking-wider text-sm px-2 py-1 text-black/75">
                Create date
              </th>
              <th className="w-4 tracking-wider text-sm px-2 py-1 text-black/75">
                Action
              </th>
            </tr>
            {employeeList.map((each, i) => (
              <EmployeeTableList data={each} i={i} key={each._id} />
            ))}
          </table>
        </div>
      </div>
    </BaseSkeleton>
  );
};

export default EmployeeList;
