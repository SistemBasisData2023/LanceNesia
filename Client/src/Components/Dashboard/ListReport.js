import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckIcon as BadgeCheckIcon, XCircleIcon as XIcon, EllipsisVerticalIcon as DotsVerticalIcon } from "@heroicons/react/24/solid";
import Sidebar from "../Sidebar";
import Navbar from "../NavbarBlack";
import Footer from "../Footer";

const ListReport = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportPerPage] = useState(10);
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
      const response = await fetch("/getreports");
      const data = await response.json();

      // Mengubah data yang diterima sesuai dengan kebutuhan
      const transformedData = data.map((report) => ({
        report_id: report.report_id,
        reporter_id: report.reporter_id,
        message: report.message,
        status: report.status,
      }));

      setReports(transformedData);
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

  const handleEdit = (report) => {
    window.globalReportId = report.report_id;
    console.log("Edit report:", report);
    navigate("/Dashboard/ListReport/UpdateReport");
  };

  const handleDelete = (report) => {
    axios
      .post("/deletereports", { report_id: report.report_id })
      .then((response) => {
        console.log("Data deleted successfully");
        // Panggil kembali fungsi fetchUsers setelah penghapusan berhasil
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
      });
  };

  // Get current reports
  const indexOfLast = currentPage * reportPerPage;
  const indexOfFirstReport = indexOfLast - reportPerPage;
  const currentReport = reports.slice(indexOfFirstReport, indexOfLast);

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
                      <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">ID Report</th>
                      <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">ID Sender</th>
                      <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">Message</th>
                      <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">Status</th>
                      <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReport.map((report, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap">{indexOfFirstReport + index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{report.report_id} </td>
                        <td className="px-6 py-4 whitespace-nowrap">{report.reporter_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{report.message}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-0.5 py-0.5 rounded-full text-m font-medium ${
                              report.status === "Pending" ? "bg-yellow-300 text-yellow-800" : report.status === "Accepted" ? "bg-green-300 text-green-800" : report.status === "Rejected" ? "bg-red-300 text-red-800" : ""
                            }`}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="relative inline-block">
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => handleMenuClick(index)}>
                              <DotsVerticalIcon className="h-5 w-5" />
                            </button>
                            {activeMenu === index && (
                              <div className="absolute top-0 left-6 mb-0 w-20 bg-white shadow-lg rounded-md p-2">
                                <button className="text-gray-500 hover:text-yellow-500 block w-full text-left" onClick={() => handleEdit(report)}>
                                  Edit
                                </button>
                                <button className="text-gray-500 hover:text-yellow-500 block w-full text-left" onClick={() => handleDelete(report)}>
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
                  {reports.length > 0 &&
                    Array.from({ length: Math.ceil(reports.length / reportPerPage) }, (_, i) => (
                      <li key={i}>
                        <button className={`mx-2 px-3 py-1 rounded-full ${currentPage === i + 1 ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-700"}`} onClick={() => paginate(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  {reports.length > reportPerPage * 3 && (
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

export default ListReport;
