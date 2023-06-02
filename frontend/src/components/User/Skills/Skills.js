import React, {  } from "react";
import { useSelector } from "react-redux";
import './Skills.css';
const Skills = ({ reff }) => {
  const skills = useSelector((state) => state.skills);

  return (
    <div ref={reff} className="pt-5" 
    style={{ backgroundColor: "#fff" }}

    >
      <div className="container">
        <h2 className="h1-responsive font-weight-bold text-center mb-4"
        >
          Skills
        </h2>
        <div className="w-lg-75 mx-auto pt-3">
            <ul>
              {
                skills.map((value) => {

                  return (
                    <li className="bar-contain" key={value?.type}>
                      <span className="bar-expand" style={{ width: `${value?.level}%` }}>
                        <div className="bar-label">{value.type}- {value?.level}%</div>
                      </span>
                    </li>
                  )
                })
              }
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Skills;
