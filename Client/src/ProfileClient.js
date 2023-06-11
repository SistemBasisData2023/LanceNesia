import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeSlashIcon as EyeOffIcon } from "@heroicons/react/24/solid";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ParticlesBg from "particles-bg";
import ModalExample from "./Components/ModalExample";
import { ref, uploadBytes, getDownloadURL, listAll, list } from "firebase/storage";
import { storage } from "./context/firebase";
import { v4 } from "uuid";

const UpdateFreelance = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const navigate = useNavigate();

  if (localStorage.getItem("globalUsername") !== null) {
    window.globalUsername = localStorage.getItem("globalUsername");
    window.globalUserId = localStorage.getItem("globalUserId");
    window.globalRole = localStorage.getItem("globalRole");
  }

  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(!open);

  console.log("User ID AWAL: ", window.globalUserId);

  const [formDataClient, setFormDataClient] = useState({
    user_id: window.globalUserId || "",
    name: "",
    username: "",
    phone: "",
    password: "",
    cpassword: "",
    age: "",
    domicile: "",
    short_profile: "",
    company_name: "",
    image_url: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Lakukan permintaan GET untuk mendapatkan data pengguna
    console.log("user Id: ", formDataClient.user_id);
    axios
      .get(`/getdataclient?user_id=${formDataClient.user_id}`)
      .then((response) => {
        const userData = response.data[0]; // Mengambil data pertama dari array
        setFormDataClient(userData);
        setIsLoading(false);
        console.log("Data user:", userData);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
        setIsLoading(false);
      });
  }, []);

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
        formDataClient.image_url = url;
        setImageUrlNow(url);
      });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataClient((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log("User ID: ", window.globalUserId);
    formDataClient.user_id = window.globalUserId;
    formDataClient.image_url = imageUrlNow;
    e.preventDefault();
    // Kirim data update ke backend
    axios
      .put(`/updatedataclient`, formDataClient)
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
    console.log("Image URL NOW: ", imageUrlNow);
    console.log("Image URL Form: ", formDataClient.image_url);
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
              <img src={imageUrlNow || formDataClient.image_url || "https://ik.imagekit.io/abdfikih/User-Profile-Icon-9mces.png?updatedAt=1686397269218"} alt="Profile Picture" className="w-40 h-40 rounded-full" />
            </div>
            {/* Card */}
            <div className="bg-white shadow-md rounded-lg p-8 mt-6">
              {/* Form Update */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="file"
                    onChange={(event) => {
                      setImageUpload(event.target.files[0]);
                    }}
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
                    <input type="text" id="name" name="name" value={formDataClient.name} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>

                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username:
                    </label>
                    <input type="text" id="username" name="username" value={formDataClient.username} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone:
                    </label>
                    <input type="text" id="phone" name="phone" value={formDataClient.phone} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>

                  <div>
                    <label htmlFor="domicile" className="block text-sm font-medium text-gray-700">
                      Domicile:
                    </label>
                    <input type="text" id="domicile" name="domicile" value={formDataClient.domicile} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                      Age:
                    </label>
                    <input type="text" id="age" name="age" value={formDataClient.age} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>
                  <div>
                    <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                      Company:
                    </label>
                    <input type="text" id="company_name" name="company_name" value={formDataClient.company_name} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>
                  <div>
                    <label htmlFor="short_profile" className="block text-sm font-medium text-gray-700">
                      Short Profile:
                    </label>
                    <input type="text" id="short_profile" name="short_profile" value={formDataClient.short_profile} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password:
                    </label>
                    <div className="relative mt-1">
                      <input type={showPassword ? "text" : "password"} id="password" name="password" value={formDataClient.cpassword} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
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
        {formDataClient.company_name === null ? <ModalExample /> : null}
      </div>
      <ParticlesBg type="color" bg={true} />
    </>
  );
};

export default UpdateFreelance;
