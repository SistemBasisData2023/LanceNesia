// import { createContext, useContext, useEffect, useReducer } from "react";
// import reducer from '../reducer/jobReducer'
// const JobContext = createContext();

// const FilterJobs = ({ children }) => {

//     useEffect(() => {
//         getJobs();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     const initialState = {
//         isLoading: false,
//         isError: false,
//         jobs: [],
//         isSingleLoading: false,
//         singleJob: {},
//     };

//     const [state, dispatch] = useReducer(reducer, initialState);

//     const getJobs = async () => {
//         dispatch({ type: "SET_LOADING" });
//         try {
//             const res = await fetch("/JobsFetch", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             const CardsData = await res.json();
//             const jobs = CardsData.data
//             dispatch({ type: "SET_API_DATA", payload: jobs });
//         } catch (error) {
//             dispatch({ type: "API_ERROR" });
//         }
//     };

//     const getSingleJob = async (_id) => {
//         dispatch({ type: "SET_SINGLE_LOADING" });
//         try {
//             const res = await fetch("/JobsFetch", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             const SingleCardData = await res.json();
//             const singleJob = SingleCardData.data;
//             dispatch({ type: "SET_SINGLE_JOB", payload: singleJob });
//         } catch (error) {
//             dispatch({ type: "SET_SINGLE_ERROR" });
//         }
//     }
//     return (<JobContext.Provider value={{ ...state, getJobs, getSingleJob }}>{children}</JobContext.Provider>);
// };

// // Custom Hooks
// const useJobContext = () => {
//     return useContext(JobContext);
// };

// export { JobContext, FilterJobs, useJobContext }

import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/jobReducer";
import axios from "axios";

const JobContext = createContext();

const FilterJobs = ({ children }) => {
  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialState = {
    isLoading: false,
    isError: false,
    jobs: [],
    isSingleLoading: false,
    singleJob: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getJobs = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get("/getprojectsfree"); // Mengambil data dari backend menggunakan URL "/getprojects"
      const projects = response.data;
      dispatch({ type: "SET_API_DATA", payload: projects });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  const getSingleJob = async (_id) => {
    console.log("ID Project", _id);
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const response = await axios.get(`/getprojectsone?project_id=${_id}`); // Mengambil data proyek dengan ID tertentu dari backend
      const singleJob = response.data;
      dispatch({ type: "SET_SINGLE_JOB", payload: singleJob });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  return <JobContext.Provider value={{ ...state, getJobs, getSingleJob }}>{children}</JobContext.Provider>;
};

// Custom Hooks
const useJobContext = () => {
  return useContext(JobContext);
};

export { JobContext, FilterJobs, useJobContext };
