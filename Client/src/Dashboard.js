import { useEffect, useState } from "react";
import { CheckIcon as BadgeCheckIcon, XCircleIcon as XIcon, EllipsisVerticalIcon as DotsVerticalIcon } from "@heroicons/react/24/solid";
// material-ui
import { Avatar, AvatarGroup, Box, Button, Grid, List, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, MenuItem, Stack, TextField, Typography } from "@mui/material";

// project import
import OrdersTable from "./Components/Dashboard/OrdersTable";
import IncomeAreaChart from "./Components/Dashboard/IncomeAreaChart";
import MonthlyBarChart from "./Components/Dashboard/MonthlyBarChart";
import ReportAreaChart from "./Components/Dashboard/ReportAreaChart";
import SalesColumnChart from "./Components/Dashboard/SalesColumnChart";
import MainCard from "./Components/Drawer/MainCard";
import AnalyticEcommerce from "./Components/Drawer/third-party/AnalyticEcommerce";

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from "@ant-design/icons";

import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/NavbarBlack";
import Footer from "./Components/Footer";
import Report from "./Components/Report";

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};

// sales report status
const status = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "year",
    label: "This Year",
  },
];

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setIsLoading(false);
    }, 500);
  }

  const [value, setValue] = useState("today");
  const [slot, setSlot] = useState("week");

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

  return (
    <>
      <div>
        <Navbar />
        <div className="flex">
          <Sidebar activeTable={activeTableIndex} handleTableClick={handleTableClick} className="mt-8" />
          <div className="w-3/4 p-4 mt-8">
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
              {/* row 1 */}
              <Grid item xs={12} sx={{ mt: 2.25 }}>
                <Typography style={{ fontSize: "1.5rem", color: "#333", fontWeight: "bold" }}>Selamat Datang di Dashboard LanceNesia ^_^</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Project" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Deals" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
              </Grid>

              <Grid item md={8} sx={{ display: { sm: "none", md: "block", lg: "none" } }} />

              {/* row 2 */}

              <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h5">Income Overview</Typography>
                  </Grid>
                  <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                  <Box sx={{ p: 3, pb: 0 }}>
                    <Stack spacing={2}>
                      <Typography variant="h6" color="textSecondary">
                        This Week Statistics
                      </Typography>
                      <Typography variant="h3">7,650 People</Typography>
                    </Stack>
                  </Box>
                  <MonthlyBarChart />
                </MainCard>
              </Grid>

              {/* row 3 */}
              <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h5">Recent Transaction</Typography>
                  </Grid>
                  <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                  <OrdersTable />
                </MainCard>
              </Grid>
              <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h5">Analytics Report</Typography>
                  </Grid>
                  <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                  <List sx={{ p: 0, "& .MuiListItemButton-root": { py: 2 } }}>
                    <ListItemButton divider>
                      <ListItemText primary="Company Project Growth" />
                      <Typography variant="h5">+45.14%</Typography>
                    </ListItemButton>
                    <ListItemButton divider>
                      <ListItemText primary="Company Expenses Ratio" />
                      <Typography variant="h5">0.58%</Typography>
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="Business Risk Cases" />
                      <Typography variant="h5">Low</Typography>
                    </ListItemButton>
                  </List>
                  <ReportAreaChart />
                </MainCard>
              </Grid>

              {/* row 4 */}
              <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h5">Sales Report</Typography>
                  </Grid>
                  <Grid item>
                    <TextField id="standard-select-currency" size="small" select value={value} onChange={(e) => setValue(e.target.value)} sx={{ "& .MuiInputBase-input": { py: 0.5, fontSize: "0.875rem" } }}>
                      {status.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <MainCard sx={{ mt: 1.75 }}>
                  <Stack spacing={1.5} sx={{ mb: -12 }}>
                    <Typography variant="h6" color="secondary">
                      Net Profit
                    </Typography>
                    <Typography variant="h4">IDR 1.560.000.000</Typography>
                  </Stack>
                  <SalesColumnChart />
                </MainCard>
              </Grid>
              <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h5">Transaction History</Typography>
                  </Grid>
                  <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                  <List
                    component="nav"
                    sx={{
                      px: 0,
                      py: 0,
                      "& .MuiListItemButton-root": {
                        py: 1.5,
                        "& .MuiAvatar-root": avatarSX,
                        "& .MuiListItemSecondaryAction-root": { ...actionSX, position: "relative" },
                      },
                    }}
                  >
                    <ListItemButton divider>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: "success.main",
                            bgcolor: "success.lighter",
                          }}
                        >
                          <GiftOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
                      <ListItemSecondaryAction>
                        <Stack alignItems="flex-end">
                          <Typography variant="subtitle1" noWrap>
                            + $1,430
                          </Typography>
                          <Typography variant="h6" color="secondary" noWrap>
                            78%
                          </Typography>
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <ListItemButton divider>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: "primary.main",
                            bgcolor: "primary.lighter",
                          }}
                        >
                          <MessageOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
                      <ListItemSecondaryAction>
                        <Stack alignItems="flex-end">
                          <Typography variant="subtitle1" noWrap>
                            + $302
                          </Typography>
                          <Typography variant="h6" color="secondary" noWrap>
                            8%
                          </Typography>
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: "error.main",
                            bgcolor: "error.lighter",
                          }}
                        >
                          <SettingOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
                      <ListItemSecondaryAction>
                        <Stack alignItems="flex-end">
                          <Typography variant="subtitle1" noWrap>
                            + $682
                          </Typography>
                          <Typography variant="h6" color="secondary" noWrap>
                            16%
                          </Typography>
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  </List>
                </MainCard>
                <MainCard sx={{ mt: 2 }}>
                  <Stack spacing={3}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack>
                          <Typography variant="h5" noWrap>
                            Help & Support Chat
                          </Typography>
                          <Typography variant="caption" color="secondary" noWrap>
                            Typical replay within 5 min
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <AvatarGroup sx={{ "& .MuiAvatar-root": { width: 32, height: 32 } }}>
                          <Avatar alt="A" src={" "} />
                          <Avatar alt="F" src={" "} />
                          <Avatar alt="K" src={" "} />
                          <Avatar alt="C" src={" "} />
                        </AvatarGroup>
                      </Grid>
                    </Grid>
                    <Button size="small" variant="contained" sx={{ textTransform: "capitalize" }}>
                      Need Help?
                    </Button>
                  </Stack>
                </MainCard>
              </Grid>
            </Grid>
          </div>
        </div>
        <Footer />
      </div>
      <Report />
    </>
  );
};

export default UserListPage;
