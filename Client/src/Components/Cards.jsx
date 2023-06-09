/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Cards = (curElem) => {
  let { project_id, category, project_name, timeline, duration, job_description, price, image_url } = curElem;

  const Wrapper = styled.section`
    .jobs {
      display: flex;
      border-top: 1px grey solid;
      border-bottom: 1px grey solid;
      border-right: 1px grey solid;
      margin: 4rem -2rem;
      width: 78vw;
    }

    .inside-jobs {
      display: flex;
      flex-wrap: wrap;
      padding: 30px 0px 30px 30px;
      row-gap: 20px;
      column-gap: 20px;
    }

    .inside-jobs-li {
      position: relative;
      list-style-type: none;
      height: 400px;
      width: 260px;
      background-color: rgba(188, 254, 241, 0.124);
      text-align: center;
      margin: 10px 3px;
      border-radius: 10px;
      box-shadow: 0px 0px 3.6px rgba(0, 0, 0, 0.017), 0px 0px 10px rgba(0, 0, 0, 0.025), 0px 0px 24.1px rgba(0, 0, 0, 0.033), 0px 0px 80px rgba(0, 0, 0, 0.05);
    }

    .inside-jobs-li:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .images-jobs {
      width: inherit;
      overflow: hidden;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .images-jobs img {
      width: 100%;
    }

    .cate-foot {
      color: var(--cate-foot-text);
      font-weight: bold;
      margin-top: 0.9rem;
      margin-right: 16px;
      text-align: end;
      margin-bottom: 0.81rem;
      font-size: 0.9rem;
    }
    .cate-body {
      position: inherit;
      margin: 0px 20px 20px 20px;
      text-align: start;
      overflow: auto;
    }
    .cate-content {
      min-height: 14rem;
      position: relative;
    }
  `;

  return (
    <>
      <Wrapper>
        <Link to={`/FindJobs/${project_id}`}>
          <li className="inside-jobs-li">
            <div className="images-jobs">
              <img src={image_url || `https://source.unsplash.com/1600x900/?${project_name}`} alt="Video" />
            </div>
            <div className="cate-content">
              <div className="cate-title">{project_name}</div>
              <div className="cate-foot">Posted on: {timeline}</div>
              <div className="cate-body"> {job_description}</div>
            </div>
          </li>
        </Link>
      </Wrapper>
    </>
  );
};

export default Cards;
