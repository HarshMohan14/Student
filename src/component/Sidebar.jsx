import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents } from '../redux/studentSlice';
import { Oval } from 'react-loader-spinner';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const students = useSelector((state) => state.students.students || []);
  const loading = useSelector((state) => state.students.loading);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddStudent = (student) => {
    // Implement adding student logic here
    setIsModalOpen(false); // Close the modal after adding student
  };

  const filteredStudents = students.data
    ? students.data.filter((student) => {
        const firstName = student.attributes.firstName ? student.attributes.firstName.toLowerCase() : '';
        const lastName = student.attributes.lastName ? student.attributes.lastName.toLowerCase() : '';
        const fullName = `${firstName} ${lastName}`;

        return (
          firstName.includes(searchQuery.toLowerCase()) ||
          lastName.includes(searchQuery.toLowerCase()) ||
          fullName.includes(searchQuery.toLowerCase())
        );
      })
    : [];

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex h-full">
      <div className="fixed flex flex-col justify-between py-10 items-center inset-y-0 left-0 bg-gray-800 w-64 h-full p-4 text-white">
        <h1 className="text-2xl font-semibold mb-4">Sidebar</h1>
        <ul className='flex flex-col gap-10'>
          <li className="mb-2"><a href="#!" className="block p-2 rounded hover:bg-gray-700">Home</a></li>
          <li className="mb-2"><a href="#!" className="block p-2 rounded hover:bg-gray-700">About</a></li>
          <li className="mb-2"><a href="#!" className="block p-2 rounded hover:bg-gray-700">Services</a></li>
          <li className="mb-2"><a href="#!" className="block p-2 rounded hover:bg-gray-700">Contact</a></li>
        </ul>
        <IoIosLogOut size={40} />
      </div>
      <div className="ml-64 flex-1 p-4 w-full">
        <div className="bg-white h-full  rounded-2xl shadow-md flex flex-col gap-5 space-y-6 pb-4">
          {/* Header Section */}
          <div className="flex items-center justify-between border-b-2 p-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold">Students</h2>
                <span className="ml-2  bg-black text-white rounded-full p-1 font-semibold text-[10px]">{filteredStudents.length}</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="px-4 py-2 border rounded focus:outline-none"
                placeholder="Search..."
              />
            </div>
            <div className="flex items-center space-x-4">
              <FaBell className="h-6 w-6 text-gray-500" />
              <FaUserCircle className="h-6 w-6 text-gray-500" />
            </div>
          </div>

          {/* Controls Section */}
          <div className="flex items-center justify-between mx-10">
            <select className="px-4 py-2 border rounded focus:outline-none">
              <option value="">Select School</option>
              {/* Add school options here */}
            </select>
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Add Student
            </button>
          </div>

          {/* Table Section */}
          <div className="flex-1 overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Oval
                  height={50}
                  width={50}
                  color="#4fa94d"
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            ) : (
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">
                      <input type="checkbox" />
                    </th>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">First Name</th>
                    <th className="py-2 px-4 border-b">Last Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Phone</th>
                    <th className="py-2 px-4 border-b">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="py-2 px-4 border-b">
                        <input type="checkbox" />
                      </td>
                      <td className="py-2 px-4 border-b">{student.id}</td>
                      <td className="py-2 px-4 border-b">{student.attributes.firstName}</td>
                      <td className="py-2 px-4 border-b">{student.attributes.lastName}</td>
                      <td className="py-2 px-4 border-b">{student.attributes.parentEmailId}</td>
                      <td className="py-2 px-4 border-b">{student.attributes.parentContactNo}</td>
                      <td className="py-2 px-4 border-b">{student.attributes.dob}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Section */}
          <div className="flex justify-between items-center mx-10 ">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-green-500 text-white'}`}
            >
              Previous
            </button>
            <span className='text-xl font-semibold'>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-green-500 text-white'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddStudent} />
    </div>
  );
};

export default Sidebar;
