/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PortfolioUI from "./pages/PortfolioUI";
import Login from "./components/User/Login/Login";
import SideBar from "./components/Admin/SideBar/SideBar";
import EducationAdmin from "./pages/EducationAdmin";
import { ToastContainer } from "react-toastify";
import SecureRoute from "./shared/SecureRoute";
import ExperienceAdmin from "./pages/ExperienceAdmin";
import SkillAdmin from "./pages/SkillAdmin";
import MessageAdmin from "./pages/MessageAdmin";
import isLogin from "./shared/authorization";
import ProjectAdmin from "./pages/ProjectAdmin";
import NotFound from "./pages/NotFound";
import Signup from "./components/User/Login/Signup";
import UserAdmin from "./pages/UserAdmin";
import { getEducationsByUserId } from "./actions/educationAction";
import { getExpeiencesByUserId } from "./actions/experienceAction";
import { getProjectsByUserId } from "./actions/projectAction";
import { getSkillsByUser } from "./actions/skillAction";
import api from "./apis/serverApi";
import { getOUserByUserId } from "./actions/loginAction";
import { getOneUserByUserName } from "./apis/userApi";

function App() {
  const [isLogged, setIsLogged] = useState(isLogin);
  const login = useSelector((state) => state.login.isLogin);
  const dispatch = useDispatch()
  useEffect(() => {
    setIsLogged(isLogin);
  }, [login]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { isLogged, token } = userData
    getOneUserByUserName().then((data)=> {
      console.log({data})
    })
    // eslint-disable-next-line eqeqeq
    if (isLogged != false) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(getOUserByUserId());
      dispatch(getExpeiencesByUserId());
      dispatch(getEducationsByUserId())
      dispatch(getProjectsByUserId());
      dispatch(getSkillsByUser());
    }
   
  }, [dispatch])

  return (
    <div className="App">
      {isLogged && <SideBar />}
      <>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <SecureRoute path="/education" exact component={EducationAdmin} />
          <SecureRoute path="/experience" exact component={ExperienceAdmin} />
          <SecureRoute path="/project" exact component={ProjectAdmin} />
          <SecureRoute path="/user" exact component={UserAdmin} />
          <SecureRoute path="/skill" exact component={SkillAdmin} />
          <SecureRoute path="/messages" exact component={MessageAdmin} />
          <Route path="/" exact component={PortfolioUI} />
          <Route path="/:username" component={PortfolioUI} />
          <Route path="*" component={NotFound} />
        </Switch>
      </>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
