import { useEffect, useState } from "react";
import { CheckIcon as BadgeCheckIcon, XCircleIcon as XIcon, EllipsisVerticalIcon as DotsVerticalIcon } from "@heroicons/react/24/solid";

import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/NavbarBlack";
import Footer from "./Components/Footer";
import Report from "./Components/Report";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setIsLoading(false);
    }, 500);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=40");
        const data = await response.json();
        setUsers(data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleTableClick = (table) => {
    setActiveTableIndex(table);
  };

  const handleNextTable = () => {
    if (activeTableIndex < 2) {
      setActiveTableIndex(activeTableIndex + 1);
    }
  };

  const handlePrevTable = () => {
    if (activeTableIndex > 0) {
      setActiveTableIndex(activeTableIndex - 1);
    }
  };

  const handleMenuClick = (index) => {
    if (activeMenu === index) {
      setActiveMenu(null);
    } else {
      setActiveMenu(index);
    }
  };

  const handleEdit = (user) => {
    console.log("Edit user:", user);
  };

  const handleDelete = (user) => {
    console.log("Delete user:", user);
  };

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="flex">
          <Sidebar activeTable={activeTableIndex} handleTableClick={handleTableClick} className="mt-8" />
          <div className="w-3/4 p-4 mt-8">
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <>
                {activeTableIndex === 0 && (
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">ID</th>
                        <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">Name</th>
                        <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">Username</th>
                        <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">Role</th>
                        <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">Status</th>
                        <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map((user, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap">{indexOfFirstUser + index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.name.first} {user.name.last}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.login.username}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.dob.age > 18 ? "Admin" : "User"}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.status ? (
                              <span className="flex items-center">
                                <span className="text-green-500 mr-1">Active</span>
                                <BadgeCheckIcon className="h-5 w-5 text-green-500" />
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <span className="text-red-500 mr-1">Banned</span>
                                <XIcon className="h-5 w-5 text-red-500" />
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="relative inline-block">
                              <button className="text-gray-500 hover:text-gray-700" onClick={() => handleMenuClick(index)}>
                                <DotsVerticalIcon className="h-5 w-5" />
                              </button>
                              {activeMenu === index && (
                                <div className="absolute top-0 left-6 mb-0 w-20 bg-white shadow-lg rounded-md p-2">
                                  <button className="text-gray-500 hover:text-yellow-500 block w-full text-left" onClick={() => handleEdit(user)}>
                                    Edit
                                  </button>
                                  <button className="text-gray-500 hover:text-yellow-500 block w-full text-left" onClick={() => handleDelete(user)}>
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {activeTableIndex === 1 && <table className="min-w-full bg-white border border-gray-300">{/* Table 1 content */}</table>}
                {activeTableIndex === 2 && <table className="min-w-full bg-white border border-gray-300">{/* Table 2 content */}</table>}
              </>
            )}
            <div className="mt-4">
              {activeTableIndex === 0 && (
                <nav>
                  <ul className="flex justify-center">
                    {users.length > 0 &&
                      Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
                        <li key={i}>
                          <button className={`mx-2 px-3 py-1 rounded-full ${currentPage === i + 1 ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-700"}`} onClick={() => paginate(i + 1)}>
                            {i + 1}
                          </button>
                        </li>
                      ))}
                    {users.length > usersPerPage * 3 && (
                      <li>
                        <button className="mx-2 px-3 py-1 rounded-full bg-gray-300 text-gray-700" onClick={() => handleNextTable()}>
                          &raquo;
                        </button>
                      </li>
                    )}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <Report />
    </>
  );
};

export default UserListPage;
