import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../NavbarBlack";
import Footer from "../Footer";

const UpdateProject = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    project_id: "",
    client_id: "",
    project_name: "",
    timeline: "",
    job_description: "",
    status: "",
    duration: "",
    price: "",
    image_url: "",
    destination: "",
  });

  useEffect(() => {
    // Lakukan permintaan GET untuk mendapatkan data laporan
    console.log("Fetching data...", window.globalProjectId);
    axios
      .get(`/getprojectsone?project_id=${window.globalProjectId}`)
      .then((response) => {
        const projectData = response.data[0]; // Mengambil data pertama dari array
        setFormData(projectData);
        setIsLoading(false);
        console.log("Data laporan:", projectData);
      })
      .catch((error) => {
        console.error("Error fetching report data: ", error);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log("Submitting data...");
    e.preventDefault();
    // Kirim data update ke backend
    axios
      .put(`/updateprojects/${window.globalProjectId}`, formData)
      .then((response) => {
        console.log("Data updated successfully");
        // Lakukan tindakan setelah berhasil melakukan update
        window.history.back(); // Kembali ke halaman sebelumnya
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
  };

  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setIsLoading(false);
    }, 500);
  }

  const handleTableClick = (table) => {
    setActiveTableIndex(table);
  };

  let className = "flex";

  console.log("Rolenya ada :", window.globalRole);
  console.log("status: ", formData.status);

  if (window.globalRole === "client" || window.globalRole === "freelancer") {
    className += " justify-center items-center";
    if (window.globalRole === "freelancer") {
      window.globalFreelancerName = window.globalName;
    }
  }

  return (
    <div>
      <Navbar />
      <div className={className}>
        {window.globalRole === "admin" && <Sidebar activeTable={activeTableIndex} handleTableClick={handleTableClick} className="mt-8" />}
        <div className="w-3/4 p-4 mt-20">
          <div className="bg-white shadow-md rounded-lg px-4 py-6">
            <h2 className="text-2xl font-medium text-gray-900 capitalize items-center justify-center text-center">Update Project</h2>
            {/* Form Update */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="project_image" className="block text-sm font-medium text-gray-700 mt-8">
                  Project Image (Generated Automatically from Project Name):
                </label>
                <img src={formData.image_url || `https://source.unsplash.com/1600x900/?${formData.project_name}`} alt="Project" className="mt-1 rounded-md" style={{ width: "300px", height: "200px" }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="project_id" className="block text-sm font-medium text-gray-700">
                    ID Project:
                  </label>
                  <input
                    type="text"
                    id="project_id"
                    name="project_id"
                    value={formData.project_id}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    disabled={window.globalRole === "freelancer" || window.globalRole === "client"}
                  />
                </div>
                {window.globalRole === "Admin" && (
                  <div>
                    <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">
                      ID Client:
                    </label>
                    <input type="text" id="client_id" name="client_id" value={formData.client_id} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>
                )}

                <div>
                  <label htmlFor="freelancer" className="block text-sm font-medium text-gray-700">
                    Freelancer:
                  </label>
                  <input
                    type="text"
                    id="freelancer"
                    name="freelancer"
                    value={window.globalFreelancerName}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    disabled={window.globalRole === "freelancer" || window.globalRole === "client"}
                  />
                </div>

                <div>
                  <label htmlFor="project_name" className="block text-sm font-medium text-gray-700">
                    Project Name:
                  </label>
                  <input type="text" id="project_name" name="project_name" value={formData.project_name} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" disabled={window.globalRole === "freelancer"} />
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
                    Timeline:
                  </label>
                  <input type="text" id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" disabled={window.globalRole === "freelancer"} />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Duration:
                  </label>
                  <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" disabled={window.globalRole === "freelancer"} />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price:
                  </label>
                  <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" disabled={window.globalRole === "freelancer"} />
                </div>

                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                    Sender:
                  </label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    disabled={window.globalRole === "freelancer" || window.globalRole === "client"}
                  />
                </div>

                <div>
                  <label htmlFor="job_description" className="block text-sm font-medium text-gray-700">
                    Job Descriptions:
                  </label>
                  <textarea id="job_description" name="job_description" value={formData.job_description} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" disabled={window.globalRole === "freelancer"} />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status:
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    disabled={
                      (window.globalRole === "freelancer" && formData.destination === "FREELANCER" && formData.status === "PENDING") || (window.globalRole === "client" && formData.destination === "CLIENT" && formData.status === "PENDING")
                    }
                  >
                    <option value="">Select Status</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="DENIED">DENIED</option>
                    <option value="NOT STARTED">NOT STARTED</option>
                    <option value="25%">25%</option>
                    <option value="50%">50%</option>
                    <option value="75%">75%</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
              </div>

              <div>
                <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProject;
