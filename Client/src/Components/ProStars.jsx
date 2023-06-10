import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const ProStars = ({ stars, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    const starValue = index + 1;
    let starIcon;
    let starClassName = "icon";

    if (stars >= starValue) {
      starIcon = <FaStar className={starClassName} />;
    } else if (stars >= starValue - 0.5) {
      starIcon = <FaStarHalfAlt className={starClassName} />;
    } else {
      starIcon = <AiOutlineStar className={starClassName} />;
    }

    return <span key={index}>{starIcon}</span>;
  });

  return (
    <Wrapper>
      <div className="icon-style">
        {ratingStar}
        <span className="star-value">{stars}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .icon-style {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .icon {
      font-size: 1.7rem;
      color: orange;
    }
    .empty-icon {
      font-size: 2.6rem;
    }
    .star-value {
      margin-left: 0.5rem;
      font-size: 1.1rem;
    }
  }
`;

export default ProStars;
