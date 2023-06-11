import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "./Components/Navbar";
import FindFreelan from "./Components/FFlancer";
import GoToTop from "./Components/GoToTop";
import Footer from "./Components/Footer";
import { FilterFreelancer } from "./context/freelancercontext";
import { UserContext } from "./Routing";

const FindFreelancer = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setLoading(false);
    }, 0);
  }

  useEffect(() => {
    // callFF();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    !loading && (
      <>
        <FilterFreelancer>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Find Freelancer</title>
            <meta name="description" content="The place to get your work done" />
          </Helmet>

          <Navbar color="white" change="Profile" link="/FindFreelancer/Profile" />
          <FindFreelan />
          <GoToTop />
          <Footer />
        </FilterFreelancer>
      </>
    )
  );
};

export default FindFreelancer;
