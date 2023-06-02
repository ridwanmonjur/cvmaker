import React from "react";
import "./About.css";
import { domainName } from "../../../apis/serverApi";
import { useSelector } from "react-redux";

const About = ({ reff }) => {
  const user = useSelector((state) => state.login?.user);

  return (
    <section
      ref={reff}
      id="about"
      className="py-5 bg-color"
    >
      <div className="container">
        <h2 className="h1-responsive display-3 font-weight-bold text-center mb-5">
          About Me
        </h2>

        <div className="row">
          <div className="col-12 col-lg-4 d-flex align-items-center">
            <img className="d-block mx-auto mb-4 image-styles" src={`${domainName}${user?.aboutSectionImage}`} alt="profil" />
          </div>
          <div className="col-lg-8">
            <p className="display-3 text-justify align-middle" style={{fontSize: "18px",}}
             dangerouslySetInnerHTML={{__html: user?.aboutSectionContent}}            
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
