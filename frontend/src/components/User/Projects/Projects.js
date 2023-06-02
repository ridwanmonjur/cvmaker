import React from "react";
import { useSelector } from "react-redux";
import { domainName } from "../../../apis/serverApi";
import './Project.css'

const Projects = ({ reff }) => {
  const projects = useSelector((state) => state.projects);

  const project = projects.map((proj) => {
    return (
      <div
        key={proj._id}
        className="col-lg-4 col-12 mb-lg-5 mb-5 mt-lg-5 py-3 shadow-lg bg-white rounded"
        style={{width: "min-content"}}
      >
        <div className="">
          <img
            src={domainName + proj.projectImage}
            className='image-styles-2'
            alt={proj.title}
          />
        </div>
        <div className="card-body pb-0">
          <h4 className="font-weight-bold ">{proj.title}</h4>
          <p className="grey-text">{proj.description}</p>
          <p
            className=" fw-bold"
            style={{
              display: "inline",
            }}
          >
            Technologies:
          </p>
          <p> {proj.technologies}</p>
          {proj.haveLink && proj.link!= null &&(
            <button
              className="btn btn-primary btn-sm shadow-none mb-0"
              target="_blank"
              rel="noreferrer"
              href={proj.link}
            >
              <i className="fa fa-clone left"></i> View project
            </button>
          )}
        </div>
      </div>
    );
  });

  return (
    <section
      id="projects"
      ref={reff}
      className="text-center py-5"
    >
      <div className="container">
        <h2 className="h1-responsive font-weight-bold mb-5">Projects</h2>

        <div className="row text-center d-inline-flex">{project}</div>
      </div>
    </section>
  );
};

export default Projects;
