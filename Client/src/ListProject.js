import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BadgeCheckIcon, XIcon, DotsVerticalIcon } from "@heroicons/react/solid";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/NavbarBlack";
import Footer from "./Components/Footer";

const ListProject = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectPerPage] = useState(10);
  const navigate = useNavigate();

  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setIsLoading(false);
    }, 500);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/getprojects");
      const data = await response.json();

      // Mengubah data yang diterima sesuai dengan kebutuhan
      const transformedData = data.map((project) => ({
        project_id: project.project_id,
        client_id: project.client_id,
        project_name: project.project_name,
        timeline: project.timeline,
        description: project.job_description,
        status: project.status,
      }));

      setProjects(transformedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleEdit = (project) => {
    window.globalProjectId = project.project_id;
    console.log("Edit report:", project);
    navigate("/Dashboard/ListProject/UpdateProject");
  };

  const handleDelete = (project) => {
    axios
      .post("/deleteprojects", { project_id: project.project_id })
      .then((response) => {
        console.log("Data deleted successfully");
        // Panggil kembali fungsi fetchUsers setelah penghapusan berhasil
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
      });
  };

  // Get current projects
  const indexOfLastUser = currentPage * projectPerPage;
  const indexOfFirstProject = indexOfLastUser - projectPerPage;
  const currentProject = projects.slice(indexOfFirstProject, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
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
                      <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">No</th>
                      <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">ID Project</th>
                      <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">ID Client</th>
                      <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">Title</th>
                      <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">Timeline</th>
                      <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">Status</th>
                      <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProject.map((project, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap">{indexOfFirstProject + index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{project.project_id} </td>
                        <td className="px-6 py-4 whitespace-nowrap">{project.client_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{project.project_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{project.timeline}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{project.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="relative inline-block">
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => handleMenuClick(index)}>
                              <DotsVerticalIcon className="h-5 w-5" />
                            </button>
                            {activeMenu === index && (
                              <div className="absolute top-0 left-6 mb-0 w-20 bg-white shadow-lg rounded-md p-2">
                                <button className="text-gray-500 hover:text-yellow-500 block w-full text-left" onClick={() => handleEdit(project)}>
                                  Edit
                                </button>
                                <button className="text-gray-500 hover:text-yellow-500 block w-full text-left" onClick={() => handleDelete(project)}>
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
                  {projects.length > 0 &&
                    Array.from({ length: Math.ceil(projects.length / projectPerPage) }, (_, i) => (
                      <li key={i}>
                        <button className={`mx-2 px-3 py-1 rounded-full ${currentPage === i + 1 ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-700"}`} onClick={() => paginate(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  {projects.length > projectPerPage * 3 && (
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
  );
};

export default ListProject;
