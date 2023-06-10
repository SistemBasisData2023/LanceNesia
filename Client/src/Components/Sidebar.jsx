// import React from "react";
// import { NavLink } from "react-router-dom";

// const Sidebar = ({ activeTable, handleTableClick }) => {
//   return (
//     <div className="w-1/4 bg-gray-200 p-4 flex flex-col mt-12">
//       <h1 className="text-2xl font-bold mt-8">LanceNesia || Dashboard</h1>
//       <NavLink to="/Dashboard/ListFreelance" className="flex items-center justify-center py-2 px-4 mt-4 text-sm font-medium rounded-md bg-blue-200 hover:bg-yellow-200 hover:text-black" activeClassName="bg-blue-500 text-white">
//         List Freelance
//       </NavLink>
//       <NavLink to="/Dashboard/ListClient" className="flex items-center justify-center py-2 px-4 mt-2 text-sm font-medium rounded-md bg-blue-200 hover:bg-yellow-200 hover:text-black" activeClassName="bg-blue-500 text-white">
//         List Client
//       </NavLink>
//       <NavLink to="/Dashboard/ListProject" className="flex items-center justify-center py-2 px-4 mt-2 text-sm font-medium rounded-md bg-blue-200 hover:bg-yellow-200 hover:text-black" activeClassName="bg-blue-500 text-white">
//         Project
//       </NavLink>
//       <NavLink to="/Dashboard/ListReport" className="flex items-center justify-center py-2 px-4 mt-2 text-sm font-medium rounded-md bg-blue-200 hover:bg-yellow-200 hover:text-black" activeClassName="bg-blue-500 text-white">
//         Reports
//       </NavLink>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip } from "@material-tailwind/react";
import { PresentationChartBarIcon, CalendarDaysIcon, UserCircleIcon, UserIcon, InboxIcon, PowerIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  const location = useLocation();

  return (
    <Card className="w-1/4 bg-white border border-black p-4 flex flex-col mt-12 shadow-xl sticky top-0">
      <div className="mb-2 p-4">
        <Typography className="text-2xl font-medium" color="blue-gray">
          LanceNesia || Dashboard
        </Typography>
      </div>
      <List>
        <ListItem className={`hover:bg-blue-200 ${location.pathname === "/dashboard" ? "bg-blue-200" : ""}`}>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/dashboard" className="w-full text-xl">
            Dashboard
          </Link>
        </ListItem>
        <ListItem className={`hover:bg-blue-200 ${location.pathname.startsWith("/dashboard/listfreelance") ? "bg-blue-200" : ""}`}>
          <ListItemPrefix>
            <UserIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/dashboard/listfreelance" className="w-full text-xl">
            Freelancer
          </Link>
        </ListItem>
        <ListItem className={`hover:bg-blue-200 ${location.pathname.startsWith("/dashboard/listclient") ? "bg-blue-200" : ""}`}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/dashboard/listclient" className="w-full text-xl">
            Client
          </Link>
        </ListItem>
        <ListItem className={`hover:bg-blue-200 ${location.pathname.startsWith("/dashboard/listproject") ? "bg-blue-200" : ""}`}>
          <ListItemPrefix>
            <CalendarDaysIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/dashboard/listproject" className="w-full text-xl">
            Projects
          </Link>
        </ListItem>
        <ListItem className={`hover:bg-blue-200 ${location.pathname.startsWith("/dashboard/listreport") ? "bg-blue-200" : ""}`}>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          <div className="w-full flex items-center">
            <Link to="/dashboard/listreport" className="flex items-center text-xl">
              <span>Reports</span>
              <ListItemSuffix>
                <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full ml-16" />
              </ListItemSuffix>
            </Link>
          </div>
        </ListItem>
      </List>
    </Card>
  );
}
