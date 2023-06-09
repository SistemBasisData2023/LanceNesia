import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Routing";
import styled from "styled-components";
import Images from "../Img/imgindex";
/* eslint-disable no-unused-vars */

const Navbar = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const [userRole, setUserRole] = useState(null);

  if (localStorage.getItem("globalUsername") !== null) {
    window.globalUsername = localStorage.getItem("globalUsername");
    window.globalUserId = localStorage.getItem("globalUserId");
    window.globalRole = localStorage.getItem("globalRole");
    dispatch({ type: "USER", payload: true });
  }

  useEffect(() => {
    const fetchUserRole = async () => {
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
        window.globalRole = data[0].role;
        window.globalUserId = data[0].user_id;
        console.log("User Name:", window.globalName);
      } catch (error) {
        console.log("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  //* Login/Logout Functionality
  const RenderMenu = () => {
    console.log("State:", state);
    console.log("UserRole:", userRole);

    if (state) {
      return (
        <div id="ndb">
          <button className="nbutton" id="nav-btn">
            <NavLink to="/Logout" id="nav-btn-a">
              Logout
            </NavLink>
          </button>
        </div>
      );
    } else {
      return (
        <div id="ndb">
          <button className="nbutton" id="nav-btn">
            <NavLink to="./Login1" id="nav-btn-a">
              Login
            </NavLink>
          </button>
        </div>
      );
    }
  };

  //* Progress bar in navbar on scroll
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 99.9;
    setScrollTop(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  //* Navbar sticky on scroll
  window.addEventListener("scroll", function () {
    var navbar = document.querySelector("#navbar");
    if (navbar) {
      navbar.classList.toggle("sticky", window.scrollY > 0);
    }
  });

  return (
    <>
      <div className="progressbar">
        <div className="progressbarIn" style={{ width: `${scrollTop}%` }}></div>
      </div>
      <Wrapper navColor={props.color}>
        <nav id="navbar">
          <div className="d-logo">
            <span id="logo">
              <img className="Logo" src="https://ik.imagekit.io/abdfikih/lancenesia-high-resolution-logo-color-on-transparent-background__1_.png?updatedAt=1685162869863" alt="LanceNesia" />
            </span>
          </div>
          <ul>
            <li>
              <NavLink to="/Home" id="nav-a">
                Home
              </NavLink>
            </li>
            {!state && (
              <>
                <li>
                  <NavLink to="/Login" id="nav-a">
                    Find Project
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Login" id="nav-a">
                    Find Freelancers
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Login" id="nav-a">
                    Profile
                  </NavLink>
                </li>
              </>
            )}
            {state && userRole === "freelancer" && (
              <>
                <li>
                  <NavLink to="/FindJobs" id="nav-a">
                    Find Project
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ProjectFreelance" id="nav-a">
                    List Project
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ProfileFreelance" id="nav-a">
                    Profile
                  </NavLink>
                </li>
              </>
            )}
            {state && userRole === "client" && (
              <>
                <li>
                  <NavLink to="/FindFreelancer" id="nav-a">
                    Find Freelancers
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ProjectClient" id="nav-a">
                    Projects
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ProfileClient" id="nav-a">
                    Profile
                  </NavLink>
                </li>
              </>
            )}
            {state && userRole === "admin" && (
              <>
                <li>
                  <NavLink to="/Dashboard" id="nav-a">
                    Dashboard
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <RenderMenu />
        </nav>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  #navbar {
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 2;
    transition: 0.6s;
    height: 54px;
    width: 100%;
    top: 0px;
  }

  .Logo {
    display: inline-block;
    height: 2.7rem;
    width: 13rem;
    margin-left: 50px;
    transition: 0.6s;
  }
  /* #logo {
    font-family: "PT Serif", "Caveat"; */
  /* position:relative; */
  /* display: inline-block;
    font-size: 1.5rem;
    margin-left: 50px;
    transition: 0.6s;
    color: ${(props) => props.navColor};
  }
  */
  #logo:hover {
    transform: scale(1.1);
  }

  #navbar ul {
    display: flex;
    z-index: 2;
    margin: auto;
  }

  #navbar ul li {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    font-size: 1.2rem;
    margin-right: 50px;
  }

  #navbar ul li a {
    position: relative;
    text-decoration: none;
    font-family: "PT Serif", serif;
    color: ${(props) => props.navColor};
    transition: 0.6s;
  }

  .active {
    color: #1cd6ce !important;
  }

  #navbar ul li a::after {
    content: "";
    position: absolute;
    background-color: ${(props) => props.navColor};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.5px;
  }

  #navbar ul li a:hover::after {
    transform: scale(1);
    transform-origin: left;
  }

  #ndb {
    margin-right: 50px;
  }

  #navbar button {
    display: inline-block;
    position: relative;
    background: transparent;
    text-decoration: none;
    font-family: "PT Serif", serif;
    font-size: 14px;
    font-weight: 500;
    border-radius: 23px;
    color: ${(props) => props.navColor};
    border: 2px solid ${(props) => props.navColor};
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    transition: all 0.35s;
    width: 82px;
    height: 32px;
  }

  #navbar button:after {
    position: absolute;
    content: "";
    background: var(--accent-color);
    transition: all 0.35s;
    z-index: -1;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
  }

  #navbar button:hover {
    color: ${(props) => props.navColor};
    border: 0px solid var(--accent-color) !important;
    transform: scale(1.05);
  }

  #navbar button:hover:after {
    width: 100%;
  }

  #navbar button a {
    text-decoration: none;
    font-family: "PT Serif", serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    user-select: none;
    color: ${(props) => props.navColor};
  }

  nav.sticky {
    background-color: #202124;
    opacity: 0.95;
    padding: 5px 50px;
    height: 60px !important;
  }

  nav.sticky .logo {
    background-image: url(https://imgur.com/Q6ijkld);
    display: inline-block;
    height: 2.7rem;
    width: 12rem;
    margin-left: 50px;
    transition: 0.6s;
  }
  nav.sticky #nav-a {
    color: #fff;
  }

  nav.sticky #nav-btn,
  nav.sticky #navbar button:focus {
    color: #fff;
    border: 2px solid #fff;
  }

  nav.sticky #navbar button:hover {
    color: #000000;
    border: 5px solid black;
  }

  nav.sticky #nav-btn-a {
    color: #fff !important;
    text-decoration: none;
    font-family: "PT Serif", serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    user-select: none;
  }

  nav.sticky #nav-a::after {
    content: "";
    position: absolute;
    background-color: #fff;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.5px;
  }

  nav.sticky #nav-a:hover::after {
    transform: scale(1);
    transform-origin: left;
  }
`;

export default Navbar;
