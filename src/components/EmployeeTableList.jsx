import React, { useState } from "react";
import { format } from "date-fns";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { apiServer } from "../lib/apiServer";
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";

const EmployeeTableList = ({ data, i }) => {

  const [isDelete, setIsDelete] = useState(false)

  const {onGetEmployeeList} = useAuthStore()
  const {
    course,
    createdAt,
    designation,
    email,
    gender,
    imgUrl,
    mobileNo,
    name,
    _id,
  } = data;



  const onDeleteEmployee = async () => {
    setIsDelete(true)
    try{
      await apiServer.get(`/user/delete/employee?id=${_id}`)
      await onGetEmployeeList()
      toast.success("deleted successfully")
    }catch(err){
      console.log(err);
    }
    setIsDelete(true)
  } 

  return (
    <tr className="text-sm text-gray-700 border-b border-b-black">
      <td>{i + 1}</td>
      <td className="flex justify-center items-center">
        <img
          src={imgUrl}
          className="h-8 shadow w-8 rounded-full "
          alt={name}
        />
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{mobileNo}</td>
      <td>{designation}</td>
      <td>{gender}</td>
      <td>{course}</td>
      <td>{`${format(createdAt, "d-MMM-yy")}`}</td>
      <td className="flex px-3 justify-center gap-4 items-center">
        <Link to={`/edit-employee/${_id}`}>
          <AiFillEdit className="text-xl text-black" />
        </Link>
        <button onClick={onDeleteEmployee}>
          {isDelete ? <ClipLoader size={10} color="#000" />  : <RiDeleteBin5Fill className="text-xl text-red-700" />}
        </button>
      </td>
    </tr>
  );
};

export default EmployeeTableList;
