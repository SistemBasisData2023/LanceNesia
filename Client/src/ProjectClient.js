import { useEffect, useState, React } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckIcon as BadgeCheckIcon, XCircleIcon as XIcon, EllipsisVerticalIcon as DotsVerticalIcon } from "@heroicons/react/24/solid";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ParticlesBg from "particles-bg";
import { Rating, Typography } from "@material-tailwind/react";
import { ref, uploadBytes, getDownloadURL, listAll, list } from "firebase/storage";
import { storage } from "./context/firebase";
import { v4 } from "uuid";

const ListProject = () => {
  const [usernames, setUsernames] = useState({});
  const [freelancerId, setFreelancerId] = useState({});
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false); // State untuk mengontrol tampilan modals
  const [showModal1, setShowModal1] = useState(false); // State untuk mengontrol tampilan modals
  const [rated, setRated] = useState(4);

  const [review, setReview] = useState(""); // State untuk mengontrol tampilan modals

  const navigate = useNavigate();

  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setIsLoading(false);
    }, 500);
  }

  const [formData, setFormData] = useState({
    client_id: "",
    projectName: "",
    timeline: "",
    jobDescription: "",
    duration: "",
    price: "",
    image_url: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`/getprojectsclient?client_id=${window.globalUserId}`);
      const projectsData = response.data;
      setProjects(projectsData);

      // Mengambil data username untuk setiap project
      const usernamesData = {};
      const freelancerData = {};
      for (const project of projectsData) {
        const usernameResponse = await axios.get(`/getUsernameByProjectId?project_id=${project.project_id}`);
        const usernames = usernameResponse.data.map((user) => user.name); // Mengambil array nama pengguna dari respons
        const freelancer_id = usernameResponse.data.map((user) => user.freelancer_id); // Mengambil array nama pengguna dari respons

        usernamesData[project.project_id] = usernames;
        freelancerData[project.project_id] = freelancer_id;
      }
      setUsernames(usernamesData);
      setFreelancerId(freelancerData);

      setIsLoading(false);
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
    window.globalProjectId = project.project_id;
    console.log("Edit report:", project);
    window.globalFreelancerName = usernames[project.project_id][0];
    console.log("Freelancer name:", window.globalFreelancerName);
    console.log("Freelancer id:", project);
    navigate("/UpdateProject");
  };

  const handleCreate = () => {
    axios
      .post("/makeprojects", {
        project_name: formData.projectName,
        timeline: formData.timeline,
        job_description: formData.jobDescription,
        duration: formData.duration,
        price: formData.price,
        client_id: window.globalUserId,
        image_url: formData.image_url,
      })
      .then((response) => {
        console.log("Data created successfully");
        // Panggil kembali fungsi fetchProjects setelah pembuatan berhasil
        fetchProjects();
        closeModal();
      })
      .catch((error) => {
        console.error("Error creating data: ", error);
      });
  };

  const handleDelete = (project) => {
    axios
      .post("/deleteprojects", { project_id: project.project_id })
      .then((response) => {
        console.log("Data deleted successfully");
        // Panggil kembali fungsi fetchProjects setelah penghapusan berhasil
        fetchProjects();
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
      });
  };

  const handleReview = () => {
    console.log("Rated:", rated);
    axios
      .put("/updateTotalRating", { rated: rated, user_id: window.globalFreelancerId })
      .then((response) => {
        console.log("Data deleted successfully");
        // Panggil kembali fungsi fetchProjects setelah penghapusan berhasil
        fetchProjects();
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
      });
  };

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUrlNow, setImageUrlNow] = useState(null);

  const imagesListRef = ref(storage, "images/");

  const uploadFile = (event) => {
    event.preventDefault(); // Mencegah perilaku default form

    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls([url]); // Mengganti imageUrls dengan array baru yang hanya berisi URL gambar terbaru
        console.log("Image URL: ", url);
        formData.image_url = url;
        setImageUrlNow(url);
      });
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

  // Function untuk menampilkan modals
  const openModal = () => {
    setReview({
      client_id: window.globalUserId,
      projectName: "",
      timeline: "",
      jobDescription: "",
      duration: "",
      price: "",
    });
    setShowModal(true);
  };

  // Function untuk menutup modals
  const closeModal = () => {
    setShowModal(false);
  };

  const openModal1 = (project) => {
    console.log("Project pilihan:", project);
    window.globalFreelancerId = freelancerId[project.project_id][0];
    window.globalRated = rated;
    console.log("Freelancer id:", window.globalFreelancerId);
    handleReview(project);
    setReview("");
    setShowModal1(true);
  };

  // Function untuk menutup modals
  const closeModal1 = () => {
    setShowModal1(false);
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-3/4 p-4 mt-8">
          <div className="flex justify-end mb-4">
            <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-xl shadow-xl" onClick={openModal}>
              Add Project +
            </button>
          </div>
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
                      <th className="px-6 py-3 bg-blue-300 text-left font-semibold text-sm uppercase border-b">Freelancer</th>
                      <th className="px-6 py-3 bg-blue-300 text-left font-semibold text-sm uppercase border-b">Timeline</th>
                      <th className="px-6 py-3 bg-blue-300 text-left font-semibold text-sm uppercase border-b">Status</th>
                      <th className="px-6 py-3 bg-blue-300 text-left font-semibold text-sm uppercase border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProject.map((project, index) => (
                      <tr key={index} className={`border-b-2 ${index % 2 === 0 ? "bg-gray-100" : ""}`}>
                        <td className="px-6 py-4 whitespace-nowrap">{indexOfFirstProject + index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{project.project_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{usernames[project.project_id] ? usernames[project.project_id][0] : ""}</td>

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
                                {project.status === "DONE" && (
                                  <button className="text-gray-500 hover:text-yellow-500 block w-full text-left" onClick={() => openModal1(project)}>
                                    Review
                                  </button>
                                )}
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
          {showModal1 && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center px-4 text-center">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="sm:mt-0 sm:text-left w-full">
                        <h3 className="text-center text-2xl leading-6 font-medium text-gray-900" id="modal-headline">
                          Review Freelancer
                        </h3>
                        <div className="mt-12">
                          {/* Form untuk create project */}
                          {/* Tambahkan form input sesuai kebutuhan */}
                          <form className="grid grid-cols-1 gap-4">
                            <div className="mb-4 justify-center items-center">
                              <label className="block text-gray-700 text-xl font-medium mb-2 items-center justify-center text-center" htmlFor="projectName">
                                Give a review with stars
                              </label>
                              <div className="flex items-center gap-2 mt-4 justify-center">
                                <Rating color="primary" value={4} onChange={(value) => setRated(value)} style={{ color: "#FFB700" }} />
                                <Typography color="blue-gray" className="font-medium">
                                  {rated} Rated
                                </Typography>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleReview}
                    >
                      Review
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={closeModal1}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center px-4 text-center">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="sm:mt-0 sm:text-left w-full">
                        <h3 className="text-center text-2xl leading-6 font-medium text-gray-900" id="modal-headline">
                          Create Project
                        </h3>
                        <div className="mt-12">
                          {/* Form untuk create project */}
                          {/* Tambahkan form input sesuai kebutuhan */}
                          <form className="grid grid-cols-2 gap-4">
                            <div className="flex justify-center">
                              <img
                                src={imageUrlNow || formData.image_url || "https://ik.imagekit.io/abdfikih/lancenesia-high-resolution-logo-color-on-transparent-background__1_.png?updatedAt=1685162869863"}
                                alt="Profile Picture"
                                className="w-40 h-30"
                              />
                            </div>
                            <div>
                              <input
                                type="file"
                                onChange={(event) => {
                                  setImageUpload(event.target.files[0]);
                                }}
                              />
                              <button onClick={uploadFile} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                {" "}
                                Upload Image
                              </button>
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="projectName">
                                Project Name
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="projectName"
                                type="text"
                                placeholder="Enter project name"
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="timeline">
                                Timeline
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="timeline"
                                type="text"
                                placeholder="Ex: 2023-06-01"
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="jobDescription">
                                Job Description
                              </label>
                              <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="jobDescription"
                                rows="3"
                                placeholder="Enter project job description"
                                name="jobDescription"
                                value={formData.jobDescription}
                                onChange={handleInputChange}
                              ></textarea>
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="duration">
                                Duration
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="duration"
                                type="text"
                                placeholder="Ex: 1 Month"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="price">
                                Price (IDR)
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="price"
                                type="text"
                                placeholder="Ex: 1.000.000"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleCreate}
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ParticlesBg type="cobweb" bg={true} params={{ color: "#0000FF" }} />
    </div>
  );
};

export default ListProject;
