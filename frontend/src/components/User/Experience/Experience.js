import React from "react";
import experienceImage from "../../../assets/images/experience.png";
import { useSelector } from "react-redux";
import moment from "moment";

const Experience = ({ reff, user }) => {
  const experiences = useSelector((state) => state.experiences);

  const experience = experiences.map((exp) => {
    return (
      <div key={exp._id} className="col-lg-12">
        <div className="row">
          <div className="col-xl-10 col-md-11 col-10 ms-5 ">
            <p className="fw-bold mb-2">
              {exp.title}
            </p>
            <p className="mb-3 text-primary-2">
              {exp.company}, {exp.city}
            </p>
            <p className="grey-text">
              {moment(exp.startDate).format("MMM YYYY")} -{" "}
              {moment(exp.endDate).format("MMM YYYY")}
            </p>
            <p className="grey-text">
              {exp.description}
            </p>
            <p
              className="mb-3 fw-bold text-primary-2 d-inline"
             
            >
              Skills:
            </p>
            <p className="d-inline">
              {" "}
              {exp.technologies}
            </p>
            <hr className="mb-4" />
          </div>
        </div>
      </div>
    );
  });

  return (
    <section
      ref={reff}
      id="experience"
      className="py-5"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="container">
        <h2 className="h1-responsive font-weight-bold text-center mb-5">
          Experience
        </h2>

        <div className="row">
          <div className="col-lg-0 d-lg-none text-center text-lg-left">
            <img
              className="img-fluid mb-5 d-none d-lg-inline"
              src={experienceImage}
              alt="experience"
            />
          </div>

          <div className="col-lg-7 mt-4 d-flex align-items-center">
            <div className="row mb-3">{experience}</div>
          </div>
          <div className="col-lg-5 text-center text-lg-left">
            <img
              className="img-fluid mb-5 d-none d-lg-inline"
              src={experienceImage}
              alt="experience"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
