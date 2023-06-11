import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckIcon as BadgeCheckIcon, XCircleIcon as XIcon, EllipsisVerticalIcon as DotsVerticalIcon } from "@heroicons/react/24/solid";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ParticlesBg from "particles-bg";

const ProjectFreelancer = () => {
  const [usernames, setUsernames] = useState({});

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false); // State untuk mengontrol tampilan modals
  const navigate = useNavigate();

  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setIsLoading(false);
    }, 500);
  }

  const [formData, setFormData] = useState({
    freelancer_id: "",
    projectName: "",
    timeline: "",
    jobDescription: "",
    duration: "",
    price: "",
    name: "",
    company_name: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`/getprojectsfreelancer?freelancer_id=${window.globalUserId}`);
      const projectsData = response.data;
      setProjects(projectsData);

      //Mengambil data username untuk setiap project
      const usernamesData = {};
      for (const project of projectsData) {
        const usernameResponse = await axios.get(`/getUsernameClientNew?freelancer_id=${window.globalUserId}`);
        const usernames = usernameResponse.data.map((user) => user.name); // Mengambil array nama pengguna dari respons
        const companyNames = usernameResponse.data.map((user) => user.company_name); // Menambahkan array nama perusahaan dari respons
        const destination = usernameResponse.data.map((user) => user.destination); // Menambahkan array nama perusahaan dari respons

        usernamesData[project.project_id] = {
          usernames,
          companyNames, // Menyimpan array nama perusahaan dalam objek
          destination,
        };
        console.log("Usernames data:", usernamesData);
      }
      setUsernames(usernamesData);

      setIsLoading(false);
      console.log("Usernames data 2:", usernames);
      console.log("Projects data:", projectsData);
    } catch (error) {
      console.error("Error fetching projects data: ", error);
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
    console.log("ID Global: ", window.globalUserId);
    window.globalProjectId = project.project_id;
    console.log("Project ID: ", window.globalProjectId);
    console.log("Edit report:", project);
    console.log("Edit ID: ", usernames[project.project_id].usernames[0]);
    window.globalFreelancerName = usernames[project.project_id].usernames[0];
    console.log("Freelancer name:", window.globalFreelancerName);
    console.log("Freelancer id:", project);
    navigate("/UpdateProject");
  };

  const handleDelete = (project) => {
    axios
      .post("/deleteprojectsfreelance", { project_id: project.project_id, freelance_id: window.globalUserId })
      .then((response) => {
        console.log("Data deleted successfully");
        // Panggil kembali fungsi fetchProjects setelah penghapusan berhasil
        fetchProjects();
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
      <div className="flex justify-center">
        <div className="w-3/4 p-4 mt-20">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <>
              {activeTableIndex === 0 && (
                <table className="min-w-full bg-white border border-gray-300 shadow-xl rounded-xl">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-blue-300 text-left font-semibold text-sm uppercase border-b items-center">No</th>
                      <th className="px-6 py-3 bg-blue-300 text-left font-semibold text-sm uppercase border-b">Project Name</th>
                      <th className="px-6 py-3 bg-blue-300 text-left font-semibold text-sm uppercase border-b">Client</th>
                      <th className="px-6 py-3 bg-blue-300 text-left font-semibold text-sm uppercase border-b">Company</th>
                      <th className="px-6 py-3 bg-blue-300 text-left font-semibold text-sm uppercase border-b">Timeline</th>
                      <th className="px-6 py-3 bg-blue-300 text-left font-semibold text-sm uppercase border-b">Status</th>
                      <th className="px-6 py-3 bg-blue-300 text-left font-semibold text-sm uppercase border-b">Sender</th>
                      <th className="px-6 py-3 bg-blue-300 text-left font-semibold text-sm uppercase border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProject.map((project, index) => (
                      <tr key={index} className={`border-b-2 ${index % 2 === 0 ? "bg-gray-100" : ""}`}>
                        <td className="px-6 py-4 whitespace-nowrap">{indexOfFirstProject + index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{project.project_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{usernames[project.project_id] ? usernames[project.project_id].usernames[index] : ""}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{usernames[project.project_id] ? usernames[project.project_id].companyNames[index] : ""}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{project.timeline}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{project.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{usernames[project.project_id] ? usernames[project.project_id].destination[index] : ""}</td>
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
      <ParticlesBg type="cobweb" bg={true} params={{ color: "#0000FF" }} />
    </div>
  );
};

export default ProjectFreelancer;
