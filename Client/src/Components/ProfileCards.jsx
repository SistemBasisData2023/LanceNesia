import React from "react";
import styled from "styled-components";
import { AiOutlineMail, AiOutlineTeam } from "react-icons/ai";
import ProStars from "./ProStars";
import { useNavigate } from "react-router-dom";

const ProfileCards = (props) => {
  const navigate = useNavigate();

  console.log(props);

  const handleSeeProfileClick = (id) => {
    // Navigate to the next page with the ID
    navigate(`/FindFreelancer/${id}`);
  };

  const handleEmailButtonClick = () => {
    const emailAddress = props.email; // Replace with the desired email address
    const subject = "Recruitment Freelance"; // Replace with the desired email subject
    const emailBody = "Hello, I am interested in discussing to you about our project."; // Replace with the desired email body

    const emailLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(emailLink, "_blank");
  };

  return (
    <>
      <Wrapper>
        <div data-aos="fade-up" data-duration="2000" data-aos-offset="150" data-aos-anchor-placement="top-bottom" data-aos-easing="ease-in-out" className="jobs">
          <div className="profile-cards">
            <div className="profile-content">
              <div className="time-price">
                <div className="profile-name">{props.category}</div>
                <div className="profile-stars">
                  <ProStars stars={props.proStars} />
                </div>{" "}
              </div>
              <div className="time-price">
                <div className="profile-time">
                  <AiOutlineTeam className="icon" />
                  {props.experience}
                </div>
                <div className="profile-price">IDR {props.salary}</div>
              </div>

              <div className="profile-img-name">
                <div className="profile-img">
                  <img src={props.image_url || "https://ik.imagekit.io/abdfikih/User-Profile-Icon-9mces.png?updatedAt=1686397269218"} alt="" />
                </div>
                <div>
                  <div className="profile-name-stars">
                    <div className="profile-name">{props.name}</div>
                  </div>

                  <div className="profile-connection">
                    <button onClick={() => handleSeeProfileClick(props.id)}>See Profile</button>
                    <button onClick={handleEmailButtonClick}>
                      <AiOutlineMail className="icon" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-break"></div>
              <div className="profile-reviews">{props.proReviews} Customer Reviews</div>
              <button onClick={() => handleSeeProfileClick(props.id)} className="profile-book">
                HIRE NOW
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .profile-cards {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: #fffafa;
    padding: 5px 20px;
    margin: 10px 0px;
    border-radius: 20px 20px;
    box-shadow: 0px 0px 3.6px rgba(0, 0, 0, 0.017), 0px 0px 10px rgba(0, 0, 0, 0.025), 0px 0px 24.1px rgba(0, 0, 0, 0.033), 0px 0px 80px rgba(0, 0, 0, 0.05);
    transition: 150ms;
  }

  .profile-cards:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transform: scale(1.02);
    transition-timing-function: ease-in-out;
  }

  .profile-speciality {
    margin: 20px -10px;
    padding: 0px 27px;
    font-family: "Roboto", "Sans Serif";
    font-weight: bold;
    font-size: 1.1rem;
  }

  .profile-time {
    color: #5e5d5d;
    padding: 0px 4px;
    font-family: "Roboto", "Sans Serif";
    font-size: 15px;
  }
  .profile-price {
    font-size: 18px;
    font-weight: bold;
    color: #5e5d5d;
    padding-right: 16px;
  }
  .profile-time .icon {
    width: 2em;
    height: 1.5em;
  }

  .time-price {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;
    flex-flow: row;
    padding: 0px 10px;
    margin: 18px 0px;
  }

  .profile-img img {
    width: 70px;
    height: 70px;
    border: 1px solid black;
    border-radius: 100%;
    object-fit: fill;
    margin-left: 17px;
  }

  .profile-img-name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
  }

  .profile-name {
    margin: 0px 15px;
    font-weight: bold;
    color: #3f3d3d;
    font-size: 1.1rem;
  }

  .profile-name-stars {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-flow: row;
    margin-bottom: 10px;
  }

  .profile-connection {
    display: flex;
    justify-content: flex-start;
    align-content: space-between;
    flex-direction: row;
    margin-top: 10px;
  }

  .profile-connection {
  }

  .profile-connection button {
    margin-left: 12px;
    padding: 2px 11px;
    background-color: transparent;
    border-radius: 20px;
    font-family: "Roboto", "Sans Serif";
    font-size: 0.9rem;
  }

  .profile-connection .icon {
    width: 3em;
    height: 1.6em;
  }

  .card-break {
    width: inherit;
    height: 1px;
    background-color: grey;
    margin-top: 15px;
    margin-bottom: 30px;
  }

  .profile-reviews {
    margin: -18px 13px 22px 10px;
    padding-left: 10px;
  }

  .profile-book {
    width: inherit;
    height: 30px;
    display: flex;
    justify-items: center;
    align-items: center;
    padding: 1px 160px;
    margin: 10px;
    border-radius: 20px 20px;
    border: none;
    color: white;
    background-color: #1e90ff;
    font-family: "Roboto", "Sans Serif";
    font-size: 0.9rem;
    margin-bottom: 17px;
    box-shadow: 5px 11px 30px #1e90ff;
    height: 34px;
  }

  .icon {
    size: 10%;
  }
`;

export default ProfileCards;
