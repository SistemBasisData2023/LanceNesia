import React, { createContext, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initialState, reducer } from "./reducer/UseReducer";
import App from "./App";
import Login from "./Login";
import FindJobs from "./FindJobs";
import Logout from "./Components/Logout";
import Error from "./Components/Error";
import PostJobs from "./Components/PostJobs";
import SingleJob from "./Components/SingleJob";
import Profile from "./Components/Profile";
import GetHired from "./Components/GetHired";
import FindFreelancer from "./FindFreelancer";
import Dashboard from "./Dashboard";
import ListFreelance from "./Components/Dashboard/ListFreelance";
import ListClient from "./Components/Dashboard/ListClient";
import ListProject from "./Components/Dashboard/ListProject";
import ListReport from "./Components/Dashboard/ListReport";
import UpdateUsers from "./Components/Dashboard/UpdateUsers";
import UpdateReport from "./Components/Dashboard/UpdateReport";
import UpdateProject from "./Components/Dashboard/UpdateProject";
import UpdateFreelance from "./ProfileFreelance";
import UpdateClient from "./ProfileClient";
import ProfileHire from "./ProfileHire";
import ProjectClient from "./ProjectClient";
import ProjectFreelancer from "./ProjectFreelancer";

// Context API
export const UserContext = createContext();

const Paths = () => {
  return (
    <Routes>
      <Route exact path="/" element={<App />}></Route>
      <Route exact path="/Logout" element={<Logout />}></Route>
      <Route path="/Home" element={<App />}></Route>
      <Route exact path="/Login1" element={<Login />}></Route>
      <Route path="/Home/Login1" element={<Login />}></Route>
      <Route path="/Home/Logout" element={<Logout />}></Route>
      <Route path="/Dashboard" element={<Dashboard />}></Route>
      <Route path="/Dashboard/ListFreelance" element={<ListFreelance />}></Route>
      <Route path="/Dashboard/ListFreelance/UpdateUsers" element={<UpdateUsers />}></Route>
      <Route path="/Dashboard/ListClient" element={<ListClient />}></Route>
      <Route path="/Dashboard/ListClient/UpdateUsers" element={<UpdateUsers />}></Route>
      <Route path="/Dashboard/ListProject" element={<ListProject />}></Route>
      <Route path="/Dashboard/ListProject/UpdateProject" element={<UpdateProject />}></Route>
      <Route path="/Dashboard/ListReport" element={<ListReport />}></Route>
      <Route path="/Dashboard/ListReport/UpdateReport" element={<UpdateReport />}></Route>
      <Route path="Login" element={<Login />}></Route>
      <Route path="/FindJobs" element={<FindJobs />}></Route>
      <Route path="/FindJobs/:id" element={<SingleJob />}></Route>
      <Route path="/FindJobs/Profile" element={<Profile />}></Route>
      <Route path="/FindJobs/Profile/Home" element={<App />}></Route>
      <Route path="/FindJobs/Logout" element={<Logout />}></Route>
      <Route path="/FindJobs/Home" element={<App />}></Route>
      <Route path="/FindJobs/PostJobs" element={<PostJobs />}></Route>
      <Route path="/FindFreelancer" element={<FindFreelancer />}></Route>
      <Route path="/FindFreelancer/:id" element={<ProfileHire />}></Route>
      <Route path="/FindFreelancer/Login" element={<Login />}></Route>
      <Route path="/FindFreelancer/Home" element={<App />}></Route>
      <Route path="/FindFreelancer/GetHired" element={<GetHired />}></Route>
      <Route path="/FindFreelancer/Profile" element={<Profile />}></Route>
      <Route path="/FindFreelancer/Profile/Home" element={<App />}></Route>
      <Route path="/FindFreelancer/Logout" element={<Logout />}></Route>
      <Route path="/FindFreelancer/PostJobs" element={<PostJobs />}></Route>
      <Route path="/ProjectClient" element={<ProjectClient />}></Route>
      <Route path="/ProjectFreelance" element={<ProjectFreelancer />}></Route>
      <Route path="/UpdateProject" element={<UpdateProject />}></Route>
      <Route path="/ProfileFreelance" element={<UpdateFreelance />}></Route>
      <Route path="/ProfileClient" element={<UpdateClient />}></Route>
      <Route path="/Dev" element={<Error />}></Route>

      <Route path="/Logout" element={<Logout />}></Route>
      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
};

const Routing = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Paths />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
};

export default Routing;
