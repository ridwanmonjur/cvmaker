/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef } from "react";
import Contacts from "../components/User/Contacts/Contacts";
import Education from "../components/User/Education/Education";
import Experience from "../components/User/Experience/Experience";
import About from "../components/User/About/About";
import Footer from "../components/User/Footer/Footer";
import PageIntro from "../components/User/PageIntro/PageIntro";
import Projects from "../components/User/Projects/Projects";
import Skills from "../components/User/Skills/Skills";
import isLogin from "../shared/authorization";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/User/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { getEducations } from "../actions/educationAction";
import { getExperiences } from "../actions/experienceAction";
import { getprojects } from "../actions/projectAction";
import { getSkills } from "../actions/skillAction";
import { getOUserByUsername } from "../actions/loginAction";

const PortfolioUI = () => {
  const [isLogged, setIsLogged] = useState(isLogin);
  const login = useSelector((state) => state.login.isLogin);
  const projectSection = useRef(null);
  const educationSection = useRef(null);
  const experienceSection = useRef(null);
  const skillSection = useRef(null);
  const contactSection = useRef(null);
  const homeSection = useRef(null);
  const aboutSection = useRef(null);
  let { username } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    setIsLogged(isLogin);
    if (username == undefined) {
      const _username = "default"
      dispatch(getEducations(_username));
      dispatch(getExperiences(_username));
      dispatch(getprojects(_username));
      dispatch(getSkills(_username));
      dispatch(getOUserByUsername(_username));
    }

    else if (username != undefined) {
      dispatch(getEducations(username));
      dispatch(getExperiences(username));
      dispatch(getprojects(username));
      dispatch(getSkills(username));
      dispatch(getOUserByUsername(username));
    }
  }, [dispatch, login, username]);

  const scrollUtil = (section) => {
    window.scrollTo({
      top: section.current.offsetTop,
      behavior: "smooth",
    });
  };
  const onLinkClick = (section) => {
    switch (section) {
      case "projectSection":
        scrollUtil(projectSection);
        break;
      case "aboutSection":
        scrollUtil(aboutSection);
        break;
      case "educationSection":
        scrollUtil(educationSection);
        break;
      case "experienceSection":
        scrollUtil(experienceSection);
        break;
      case "skillSection":
        scrollUtil(skillSection);
        break;
      case "contactSection":
        scrollUtil(contactSection);
        break;
      case "homeSection":
        scrollUtil(homeSection);
        break;
      default:
        scrollUtil(homeSection);
    }
  };

  return (
    <div>
      {!isLogged && <Navbar onLinkClick={onLinkClick} />}
      <PageIntro reff={homeSection} />
      <About reff={aboutSection} />
      <Education reff={educationSection} />
      <Experience reff={experienceSection} />
      <Projects reff={projectSection} />
      <Skills reff={skillSection} />
      <Contacts reff={contactSection} />
      <Footer onLinkClick={onLinkClick} />
    </div>
  );
};

export default PortfolioUI;
