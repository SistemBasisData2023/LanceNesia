import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ activeTable, handleTableClick }) => {
  return (
    <div className="w-1/4 bg-gray-200 p-4 flex flex-col mt-12">
      <h1 className="text-2xl font-bold mt-8">LanceNesia || Dashboard</h1>
      <NavLink to="/Dashboard/ListFreelance" className="flex items-center justify-center py-2 px-4 mt-4 text-sm font-medium rounded-md bg-blue-200 hover:bg-yellow-200 hover:text-black" activeClassName="bg-blue-500 text-white">
        List Freelance
      </NavLink>
      <NavLink to="/Dashboard/ListClient" className="flex items-center justify-center py-2 px-4 mt-2 text-sm font-medium rounded-md bg-blue-200 hover:bg-yellow-200 hover:text-black" activeClassName="bg-blue-500 text-white">
        List Client
      </NavLink>
      <NavLink to="/Dashboard/ListProject" className="flex items-center justify-center py-2 px-4 mt-2 text-sm font-medium rounded-md bg-blue-200 hover:bg-yellow-200 hover:text-black" activeClassName="bg-blue-500 text-white">
        Project
      </NavLink>
      <NavLink to="/Dashboard/ListReport" className="flex items-center justify-center py-2 px-4 mt-2 text-sm font-medium rounded-md bg-blue-200 hover:bg-yellow-200 hover:text-black" activeClassName="bg-blue-500 text-white">
        Reports
      </NavLink>
    </div>
  );
};

export default Sidebar;
