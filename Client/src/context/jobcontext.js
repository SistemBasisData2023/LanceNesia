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
      // Simulate an asynchronous operation with setTimeout
      setTimeout(() => {
        // Dummy data array
        const dummyJobs = [
          { id: 1, title: "Job 1", description: "Description 1", date: "2023-06-01" },
          { id: 2, title: "Job 2", description: "Description 2", date: "2023-06-02" },
          { id: 3, title: "Job 3", description: "Description 3", date: "2023-06-03" },
        ];
        dispatch({ type: "SET_API_DATA", payload: dummyJobs });
      }, 1000);
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  const getSingleJob = async (_id) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      // Simulate an asynchronous operation with setTimeout
      setTimeout(() => {
        const dummyJobs = [
          { id: 1, title: "Job 1", description: "Description 1" },
          { id: 2, title: "Job 2", description: "Description 2" },
          { id: 3, title: "Job 3", description: "Description 3" },
        ];
        const singleJob = dummyJobs.find((job) => job.id === _id);
        dispatch({ type: "SET_SINGLE_JOB", payload: singleJob });
      }, 1000);
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
