import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../NavbarBlack";
import Footer from "../Footer";

const UpdateReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    report_id: "",
    reporter_id: "",
    message: "",
    status: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Lakukan permintaan GET untuk mendapatkan data laporan
    axios
      .get(`/getreportsone?report_id=${window.globalReportId}`)
      .then((response) => {
        const reportData = response.data[0]; // Mengambil data pertama dari array
        setFormData(reportData);
        setIsLoading(false);
        console.log("Data laporan:", reportData);
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
    e.preventDefault();
    // Kirim data update ke backend
    axios
      .put(`/updatereports/${window.globalReportId}`, formData)
      .then((response) => {
        console.log("Data updated successfully");
        // Lakukan tindakan setelah berhasil melakukan update
        window.history.back(); // Kembali ke halaman sebelumnya
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar activeTable={activeTableIndex} handleTableClick={handleTableClick} className="mt-8" />
        <div className="w-3/4 p-4 mt-20">
          {/* Form Update */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="report_id" className="block text-sm font-medium text-gray-700">
                  ID Report:
                </label>
                <input type="text" id="report_id" name="report_id" value={formData.report_id} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
              </div>

              <div>
                <label htmlFor="reporter_id" className="block text-sm font-medium text-gray-700">
                  ID Sender:
                </label>
                <input type="text" id="reporter_id" name="reporter_id" value={formData.reporter_id} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message:
                </label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status:
                </label>
                <select id="status" name="status" value={formData.status} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                  <option value="">Select Status</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="PENDING">Pending</option>
                  <option value="REJECTED">Rejected</option>
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
      <Footer />
    </div>
  );
};

export default UpdateReport;
