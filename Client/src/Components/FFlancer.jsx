import React, { useEffect, useState } from "react";
import ProfileCards from "./ProfileCards";
import styled from "styled-components";
import Hero from "./Hero";
import axios from "axios";

const FFHeroImg = 'url("https://ik.imagekit.io/abdfikih/back-view-brunette-woman-sitting-by-table-near-window.jpg?updatedAt=1685787280535")';

const FFlancer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const fetchActiveFreelancers = async () => {
      try {
        const response = await axios.get("/getactivefreelance");
        setProfileData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchActiveFreelancers();
  }, []);

  if (isLoading) {
    return <div>..........LOADING</div>;
  }

  return (
    <>
      <Hero title="Find Freelancer" desc="Want Your work done, We got your back!!" img={FFHeroImg} placeholder="Find FindFreelancer" />

      <CardsHolder>
        {profileData.map((val) => {
          return <ProfileCards id={val.user_id} category={val.category} experience={val.experience} salary={val.expected_salary} proImg={val.proImg} name={val.name} email={val.username} proStars={val.proStars} />;
        })}
      </CardsHolder>
    </>
  );
};

const CardsHolder = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  row-gap: 20px;
  column-gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export default FFlancer;
