import React, { useEffect, useState } from "react";
import ProfileCards from "./ProfileCards";
import styled from "styled-components";
import Hero from "./Hero";
import axios from "axios";

const FFHeroImg = 'url("https://ik.imagekit.io/abdfikih/back-view-brunette-woman-sitting-by-table-near-window.jpg?updatedAt=1685787280535")';

const CategoryEnum = {
  WEB_DEVELOPER: "Web Developer",
  DATA_ANALYTIC: "Data Analytic",
  ANDROID_DEVELOPER: "Android Developer",
  DESIGNER: "Designer",
  VIDEO_GRAPHER: "Video Grapher",
  ARTICLE_WRITING: "Article Writing",
  GRAPHIC_DESIGN: "Graphic Design",
};

const PriceEnum = {
  ASC: "Ascending",
  DESC: "Descending",
};

const FFlancer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  useEffect(() => {
    const fetchActiveFreelancers = async () => {
      try {
        const response = await axios.get("/getactivefreelance", {
          params: {
            category: selectedCategory,
            price: selectedPrice,
          },
        });
        setProfileData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchActiveFreelancers();
  }, [selectedCategory, selectedPrice]);

  if (isLoading) {
    return <div>..........LOADING</div>;
  }

  return (
    <>
      <Hero title="Find Freelancer" desc="Want Your work done, We got your back!!" img={FFHeroImg} placeholder="Find FindFreelancer" />
      <div className="mx-full p-2 bg-white">
        <CategoryFilter>
          <label htmlFor="categoryFilter">Filter by :</label>
          <select className="text-xl border border-black" id="categoryFilter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value={CategoryEnum.WEB_DEVELOPER}>Web Developer</option>
            <option value={CategoryEnum.DATA_ANALYTIC}>Data Analytic</option>
            <option value={CategoryEnum.ANDROID_DEVELOPER}>Android Developer</option>
            <option value={CategoryEnum.DESIGNER}>Designer</option>
            <option value={CategoryEnum.VIDEO_GRAPHER}>Video Grapher</option>
            <option value={CategoryEnum.ARTICLE_WRITING}>Article Writing</option>
            <option value={CategoryEnum.GRAPHIC_DESIGN}>Graphic Design</option>
          </select>
          <select className="ml-3 text-xl border border-black" id="categoryFilter" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
            <option value="">All Price</option>
            <option value={PriceEnum.ASC}>Ascending</option>
            <option value={PriceEnum.DESC}>Descending</option>
          </select>
        </CategoryFilter>
      </div>

      <CardsHolder>
        {profileData.map((val) => {
          return <ProfileCards key={val.user_id} id={val.user_id} category={val.category} experience={val.experience} salary={val.expected_salary} image_url={val.image_url} name={val.name} email={val.username} proStars={val.rating} />;
        })}
      </CardsHolder>
    </>
  );
};

const CategoryFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  item-align: center;
  margin-top: 10px;
  margin-bottom: 10px;

  label {
    font-family: "Poppins", sans-serif;
    font-size: 18px;
    margin-right: 10px;
    margin-top: 10px;
  }

  select {
    font-family: "Poppins", sans-serif;
    padding: 8px;
    font-size: 16px;
  }
}`;

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
