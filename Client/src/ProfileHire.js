import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeSlashIcon as EyeOffIcon } from "@heroicons/react/24/solid";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ParticlesBg from "particles-bg";
import { useParams } from "react-router-dom";

const ProfileHire = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user_id from the URL path

  console.log("User ID: ", id);

  const [formData, setFormData] = useState({
    user_id: id || "", // Use the extracted user_id
    name: "",
    username: "",
    phone: "",
    age: "",
    domicile: "",
    short_profile: "",
    experience: "",
    category: "",
    expected_salary: "",
  });

  useEffect(() => {
    // Perform a GET request to retrieve user data
    console.log("user Id: ", id);
    axios
      .get(`/getdatafreelance?user_id=${id}`)
      .then((response) => {
        const userData = response.data[0]; // Get the first data from the array
        setFormData(userData);
        setIsLoading(false);
        console.log("User data:", userData);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
        setIsLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log("User ID: ", window.globalUserId);
    formData.user_id = window.globalUserId;
    e.preventDefault();
    // Kirim data update ke backend
    axios
      .put(`/`, formData)
      .then((response) => {
        console.log("Data updated successfully");
        // Lakukan tindakan setelah berhasil melakukan update
        navigate("/Home"); // Kembali ke halaman /home
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

  return (
    <>
      <div>
        <Navbar />
        <div className="flex">
          <div className="w-3/4 p-4 mt-20 mx-auto">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <img src="https://ik.imagekit.io/abdfikih/Young_businesswoman.jpg?updatedAt=1685714279176" alt="Profile Picture" className="w-40 h-40 rounded-full" />
            </div>
            {/* Card */}
            <div className="bg-white shadow-md rounded-lg p-8 mt-6">
              {/* Form Update */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name:
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} readOnly className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>

                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username:
                    </label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} readOnly className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone:
                    </label>
                    <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} readOnly className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>

                  <div>
                    <label htmlFor="domicile" className="block text-sm font-medium text-gray-700">
                      Domicile:
                    </label>
                    <input type="text" id="domicile" name="domicile" value={formData.domicile} onChange={handleChange} readOnly className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                      Age:
                    </label>
                    <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} readOnly className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category:
                    </label>
                    <select id="category" name="category" value={formData.category} onChange={handleChange} disabled className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                      <option value="">Select Category</option>
                      <option value="Web Developer">Web Developer</option>
                      <option value="Data Analytic">Data Analytic</option>
                      <option value="Android Developer">Android Developer</option>
                      <option value="Designer">Designer</option>
                      <option value="Video Grapher">Video Grapher</option>
                      <option value="Article Writing">Article Writing</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                      Experience:
                    </label>
                    <select id="experience" name="experience" value={formData.experience} onChange={handleChange} disabled className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                      <option value="">Select Experience</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="expected_salary" className="block text-sm font-medium text-gray-700">
                      Salary:
                    </label>
                    <input type="text" id="expected_salary" name="expected_salary" value={formData.expected_salary} onChange={handleChange} readOnly className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>
                  <div>
                    <label htmlFor="short_profile" className="block text-sm font-medium text-gray-700">
                      Short Profile:
                    </label>
                    <input type="text" id="short_profile" name="short_profile" value={formData.short_profile} onChange={handleChange} readOnly className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>
                </div>
                <button type="submit" className="ml-96 py-2 px-16 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 items-center justify-center">
                  Hire
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <ParticlesBg type="random" bg={true} params={{ color: "#FFF" }} />
    </>
  );
};

export default ProfileHire;
