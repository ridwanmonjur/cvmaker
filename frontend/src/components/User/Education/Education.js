import React from "react";
import { useSelector, } from "react-redux";
import moment from "moment";
import educationSectionImage from '../../../assets/images/education.png'
 
const Education = ({ reff }) => {
  const educations = useSelector((state) => state.educations);
  const user = useSelector((state) => state.login?.user);
  console.log({user})

  const education = educations.map((edu) => {
    return (
      <div key={edu._id} className="col-xl-10 col-md-11 col-10 mx-5">
        <p className="fw-bold mb-3">
          {edu.title}
        </p>
        <p className="mb-3 text-primary-2">
          {edu.school}, {edu.city}
        </p>
        <p className="grey-text">
          {moment(edu.startDate).format("MMM YYYY")} -{" "}
          {moment(edu.endDate).format("MMM YYYY")}
        </p>
        <hr className="mb-4" />
      </div>
    );
  });

  return (
    <section
      ref={reff}
      id="education"
      className="py-5"
    >
      <div className="container">
        <h2 className="h1-responsive font-weight-bold text-center mb-5">
          Education
        </h2>

        <div className="row">
          <div className="col-lg-5 col-md-12 text-center text-lg-left">
            <img
              className="img-fluid mb-3 d-none d-lg-inline"
              src={educationSectionImage}
              alt="education"
            />
          </div>

          <div className="col-lg-7 d-flex align-items-center">
            <div className="row mb-3">{education}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
