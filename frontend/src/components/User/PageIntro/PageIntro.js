import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import introSectionImage from '../../../assets/images/dev.png'
import { Link } from "react-router-dom";

const PageIntro = ({ reff }) => {
  const user = useSelector((state) => state.login?.user);

  return (
    <section ref={reff}>
      <div className="container">
        <div className="row">
          <div id="intro-section" className="col-12 col-lg-6">
            <div className="d-flex justify-content-center align-items-center header">
              <div>
                <h3
                  className="h0-responsive fw-bold pt-5"
                >
                  {user?.jobTitle}
                </h3>
                <p className="display-3 text-justify ml-4"
                  dangerouslySetInnerHTML={{
                    __html: user?.jobDescription
                  }}
                  style={{
                    whiteSpace: "pre-line", wordWrap: "break-word",
                    marginTop: "50px", fontSize: "20px", color: "blue !important"
                  }} />
                <div className="d-block">
                  <Link to={`/login`} className="btn" style={{backgroundColor: "#023777", marginRight: "10px", color: "white"}} >Sign in  </Link>
                  <Link to={`/signup`} className="btn btn-success" >Sign up  </Link>
                </div>
              </div>

            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="text-center dev-img d-flex header justify-content-center align-items-center">
              <img
                className="img-fluid mt-3 ms-5 "
                src={introSectionImage}
                alt="home"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageIntro;
