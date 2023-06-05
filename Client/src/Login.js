import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Routing";
import { ToastContainer, toast } from "react-toastify";
import Images from "./Img/imgindex.js";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import CustomizedBreadcrumbs from "./Components/Breadcrumb.jsx";
import ParticlesBg from "particles-bg";
// import './Styles/Modal.scss'
/* eslint-disable no-unused-vars */

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  //* Signup Auth
  const PostData = async (e) => {
    e.preventDefault();
    const isValid = ValidateForm();
    if (!isValid) {
      return;
    }
    const { name, username, phone, password, cpassword, role } = user; // Include "role" in destructuring
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        phone,
        password,
        cpassword,
        role, // Add "role" in the request body
      }),
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      toast.success("Registration Successful", {
        position: "bottom-right",
        theme: "colored",
      });
      console.log("Registration successful");
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  };

  //* Login Auth
  const [logemail, setlogEmail] = useState("");
  const [logpass, setlogPass] = useState("");

  const [userRole, setUserRole] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: logemail,
        password: logpass,
      }),
    });
    const data = await res.json();
    console.log("data", data);
    if (res.status === 400 || !data) {
      toast.error("Invalid Credentials", {
        position: "bottom-right",
        theme: "colored",
      });
    } else {
      console.log("Login Toast");
      dispatch({ type: "USER", payload: true });
      window.globalState = true;
      toast.success("Login Successful", {
        position: "bottom-right",
        theme: "colored",
      });
      console.log("Login successful");

      // Assign data.username to a global variable
      window.globalUsername = logemail;

      console.log("data.username : ", logemail);

      try {
        console.log("Username Global:", window.globalUsername);

        const username = window.globalUsername;
        const url = "/getstatus";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username }),
        });

        const data = await response.json();

        console.log("User Role:", data[0].role);
        setUserRole(data[0].role);
        window.globalName = data[0].name;
        window.globalUserId = data[0].user_id;
        window.globalStartId = data[0].user_id;
        console.log("User Name:", window.globalName);
        console.log("User Id:", window.globarUserId);

        // Menunda navigasi dengan setTimeout
        setTimeout(() => {
          if (data[0].role === "admin") {
            navigate("/Home");
          } else if (data[0].role === "freelancer") {
            navigate("/ProfileFreelance");
          } else {
            navigate("/ProfileClient");
          }
        }, 1000); // Ubah angka 2000 menjadi waktu penundaan yang diinginkan (dalam milidetik)
      } catch (error) {
        console.log("Error fetching user role:", error);
      }
    }
  };

  //* Tackling GUI of Login/Signup Page
  const rotateL = () => {
    var checkBox = document.getElementById("reg-log");
    if (checkBox.checked === true) {
      document.getElementById("reg-log").checked = false;
    }
  };
  const rotateR = () => {
    var checkBox = document.getElementById("reg-log");
    if (checkBox.checked === false) {
      document.getElementById("reg-log").checked = true;
    }
  };

  // Validation Form
  function ValidateForm() {
    var signname = document.forms.SignUpForm.name.value;
    var signemail = document.forms.SignUpForm.username.value;
    var signpassword = document.forms.SignUpForm.password.value;
    var signphone = document.forms.SignUpForm.phone.value;
    var signcpassword = document.forms.SignUpForm.cpassword.value;
    var regemail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/g;
    var regphone = /^\d{10,13}$/;
    if (signname == null || signname === "") {
      window.alert("Please enter your first name.");
      signname.focus();
      return false;
    }
    if (signemail === "" || !regemail.test(signemail)) {
      window.alert("Please enter a valid e-mail address.");
      signemail.focus();
      return false;
    }
    if (signphone === "" || !regphone.test(signphone)) {
      alert("Please enter valid phone number.");
      signphone.focus();
      return false;
    }
    if (signpassword === "") {
      alert("Please enter your password");
      signpassword.focus();
      return false;
    }
    if (signpassword.length < 8) {
      alert("Password should be atleast 8 character long");
      signpassword.focus();
      return false;
    }
    if (signcpassword === "") {
      alert("Please enter your password");
      signcpassword.focus();
      return false;
    }
    if (signcpassword.length < 8) {
      alert("Password should be atleast 8 character long");
      signcpassword.focus();
      return false;
    }
    return true;
  }

  return (
    <>
      <div className="section1">
        <CustomizedBreadcrumbs />
        <div className="right">
          <div className="row full-height justify-content-center">
            <div className="Glass">
              <div className="py-5 text-center col-12 align-self-center">
                <div className="pt-5 pb-5 text-center section pt-sm-2">
                  <div className="pt-5 pb-5 text-center section">
                    <h6 id="H6" className="pb-3 mb-0">
                      <span id="l" onClick={rotateL}>
                        Log In{" "}
                      </span>
                      <span id="r" onClick={rotateR}>
                        Sign Up
                      </span>
                    </h6>
                    <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                    <label htmlFor="reg-log"></label>

                    <div className="mx-auto card-3d-wrap">
                      <div className="card-3d-wrapper" id="wrep">
                        <div className="card-front">
                          <div className="center-wrap">
                            <div className="text-center section">
                              <h4 id="H4" className="pb-3 mb-4">
                                Log In
                              </h4>
                              <form method="POST">
                                <div className="form-group">
                                  <input
                                    type="email"
                                    name="logemail"
                                    className="form-style"
                                    placeholder="Your Email"
                                    id="logemail"
                                    value={logemail}
                                    onChange={(e) => {
                                      setlogEmail(e.target.value);
                                    }}
                                    autoComplete="off"
                                  />
                                  <i className="input-icon uil uil-at"></i>
                                </div>
                                <div className="mt-2 form-group">
                                  <input
                                    type="password"
                                    name="logpass"
                                    className="form-style"
                                    placeholder="Your Password"
                                    id="logpass"
                                    value={logpass}
                                    onChange={(e) => {
                                      setlogPass(e.target.value);
                                    }}
                                    autoComplete="off"
                                  />
                                  <i className="input-icon uil uil-lock-alt"></i>
                                </div>
                                <div className="btnLog">
                                  <a href="/" className="mt-4 btn" onClick={loginUser}>
                                    submit
                                  </a>
                                </div>
                              </form>
                            </div>

                            <span className="forgot">
                              <p id="Para" className="py-3 mt-4 mb-0 text-center">
                                <a href="/" className="link">
                                  Forgot your password?
                                </a>
                              </p>
                            </span>
                          </div>
                        </div>
                        <div className="card-back">
                          <div className="center-wrap">
                            <div className="text-center section">
                              <h3 id="H4" className="pb-2 mb-3">
                                Sign Up
                              </h3>
                              <form name="SignUpForm" method="POST">
                                <div className="my-2 form-group">
                                  <input type="text" name="name" className="form-style" placeholder="Your Full Name" id="logname" autoComplete="off" value={user.name} onChange={handleInputs} />
                                  <i className="input-icon uil uil-user"></i>
                                </div>
                                <div className="mt-2 form-group">
                                  <input type="email" name="username" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off" value={user.username} onChange={handleInputs} />
                                  <i className="input-icon uil uil-at"></i>
                                </div>
                                <div className="mt-2 form-group">
                                  <input type="number" name="phone" className="form-style" placeholder="Your Number" id="lognumber" autoComplete="off" value={user.phone} onChange={handleInputs} />
                                  <i className="input-icon uil uil-phone"></i>
                                </div>
                                <div className="mt-2 form-group">
                                  <input type="password" name="password" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off" value={user.password} onChange={handleInputs} />
                                  <i className="input-icon uil uil-lock-alt"></i>
                                </div>
                                <div className="mt-2 form-group">
                                  <input type="password" name="cpassword" className="form-style" placeholder="Confirm Password" id="logpass" autoComplete="off" value={user.cpassword} onChange={handleInputs} />
                                  <i className="input-icon uil uil-lock-access"></i>
                                </div>
                                <div className="mt-2 form-group">
                                  <select name="role" className="form-style" value={user.role} onChange={handleInputs}>
                                    <option value="">Select Role</option>
                                    <option value="client">Client</option>
                                    <option value="freelancer">Freelancer</option>
                                  </select>
                                  <i className="input-icon uil uil-angle-down"></i>
                                </div>
                                <div className="btnSig">
                                  <input type="submit" value="Submit" className="mt-4 btn" onClick={PostData} id="sbtn"></input>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* onClick={() => { PostData(); temp() }} */}
      </div>
      <ToastContainer />
      <ParticlesBg type="cobweb" bg={true} params={{ color: "#0000FF" }} />
    </>
  );
};

export default Login;
