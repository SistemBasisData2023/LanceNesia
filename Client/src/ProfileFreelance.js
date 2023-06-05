import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeSlashIcon as EyeOffIcon } from "@heroicons/react/24/solid";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ParticlesBg from "particles-bg";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography } from "@material-tailwind/react";
import { BellIcon } from "@heroicons/react/24/solid";

const UpdateFreelance = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(!open);

  const [formData, setFormData] = useState({
    user_id: window.globalUserId || "",
    name: "",
    username: "",
    phone: "",
    password: "",
    cpassword: "",
    age: "",
    domicile: "",
    short_profile: "",
    experience: "",
    category: "",
    expected_salary: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const backupId = window.globalUserId;

  useEffect(() => {
    // Lakukan permintaan GET untuk mendapatkan data pengguna
    console.log("user Id: ", backupId);
    axios
      .get(`/getdatafreelance?user_id=${backupId}`)
      .then((response) => {
        const userData = response.data[0]; // Mengambil data pertama dari array
        setFormData(userData);
        setIsLoading(false);
        console.log("Data user:", userData);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
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
    console.log("User ID: ", window.globalUserId);
    formData.user_id = window.globalUserId;
    e.preventDefault();
    // Kirim data update ke backend
    axios
      .put(`/updatedatafreelancer`, formData)
      .then((response) => {
        console.log("Data updated successfully");
        // Lakukan tindakan setelah berhasil melakukan update
        navigate("/Home"); // Kembali ke halaman /home
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
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>

                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username:
                    </label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone:
                    </label>
                    <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>

                  <div>
                    <label htmlFor="domicile" className="block text-sm font-medium text-gray-700">
                      Domicile:
                    </label>
                    <input type="text" id="domicile" name="domicile" value={formData.domicile} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                      Age:
                    </label>
                    <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category:
                    </label>
                    <select id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
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
                    <select id="experience" name="experience" value={formData.experience} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
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
                    <input type="text" id="expected_salary" name="expected_salary" value={formData.expected_salary} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>
                  <div>
                    <label htmlFor="short_profile" className="block text-sm font-medium text-gray-700">
                      Short Profile:
                    </label>
                    <input type="text" id="short_profile" name="short_profile" value={formData.short_profile} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password:
                    </label>
                    <div className="relative mt-1">
                      <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.cpassword} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleShowPassword}>
                        {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                      </div>
                    </div>
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
        <Dialog open={open} handler={handleOpen} className="justify-center ml-4">
          <DialogHeader>
            <Typography variant="h5" color="blue-gray">
              Your Attention is Required!
            </Typography>
          </DialogHeader>
          <DialogBody divider className="grid place-items-center gap-4">
            <BellIcon className="h-16 w-16 text-red-500" />
            <Typography color="red" variant="h4">
              You should read this!
            </Typography>
            <Typography className="text-center font-normal">Please Complete Your Profile For Enjoy All Features. Thank You</Typography>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="text" color="green" onClick={handleOpen}>
              Ok, Got it
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
      <ParticlesBg type="random" bg={true} params={{ color: "#FFF" }} />
    </>
  );
};

export default UpdateFreelance;
