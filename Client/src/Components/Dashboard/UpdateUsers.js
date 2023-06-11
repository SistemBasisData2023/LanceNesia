import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeSlashIcon as EyeOffIcon } from "@heroicons/react/24/solid";
import Sidebar from "../Sidebar";
import Navbar from "../NavbarBlack";
import Footer from "../Footer";
import { ref, uploadBytes, getDownloadURL, listAll, list } from "firebase/storage";
import { storage } from "../../context/firebase";
import { v4 } from "uuid";

const UpdateUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
    cpassword: "",
    age: "",
    domicile: "",
    short_profile: "",
    role: "",
    status: "",
    image_url: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log("User ID 2: ", window.globalNewId);
    // Lakukan permintaan GET untuk mendapatkan data pengguna
    axios
      .get(`/getusersone?user_id=${window.globalNewId}`)
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
    e.preventDefault();
    // Kirim data update ke backend
    axios
      .put(`/updateusers/${window.globalNewId}`, formData)
      .then((response) => {
        console.log("Data updated successfully");
        // Lakukan tindakan setelah berhasil melakukan update
        window.history.back(); // Kembali ke halaman sebelumnya
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
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
          <div className="flex justify-center mb-8">
            <img src={imageUrlNow || formData.image_url || "https://ik.imagekit.io/abdfikih/User-Profile-Icon-9mces.png?updatedAt=1686397269218"} alt="Profile Picture" className="w-40 h-40 rounded-full" />
          </div>
          {/* Form Update */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
                className="mt-1 p-2 rounded-md w-full justify-end items-end text-end"
              />
              <div>
                <button onClick={uploadFile} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  {" "}
                  Upload Image
                </button>
              </div>
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
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status:
                </label>
                <select id="status" name="status" value={formData.status} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Banned">Banned</option>
                </select>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role:
                </label>
                <select id="role" name="role" value={formData.role} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="client">Client</option>
                </select>
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
      <Footer />
    </div>
  );
};

export default UpdateUsers;
