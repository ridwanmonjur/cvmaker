/* eslint-disable eqeqeq */
import { getOneUserByUserName, loginApi, updateUserApi, getUsersByUserIdApi } from "../apis/userApi";
import { toastSuccess, toastErrorCustom } from "../shared/toast";
import api from "../apis/serverApi";
import { getEducations, getEducationsByUserId } from "./educationAction";
import { getExpeiencesByUserId, getExperiences } from "./experienceAction";
import { getProjectsByUserId, getprojects } from "./projectAction";
import { getSkills, getSkillsByUser } from "./skillAction";

export const getOUserByUsername = (username) => async (dispatch) => {
  // eslint-disable-next-line eqeqeq
  if (username==undefined) username="default"

  try {
    const { data } = await getOneUserByUserName(username);
    dispatch({ type: "GET_USER", payload: data });
  } catch (error) {
    console.log(error);
    toastErrorCustom(error);
  }
};

export const getOUserByUserId = () => async (dispatch) => {

  try {
    const { data } = await getUsersByUserIdApi();
    dispatch({ type: "GET_USER", payload: data });
  } catch (error) {
    console.log(error);
    toastErrorCustom(error);
  }
};


export const loginUser = (authData) => async (dispatch) => {
  try {
    const { data } = await loginApi(authData);
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: data.token,
        isLogged: true,
        id: data._id
      })
    );
    toastSuccess("Login Successfully");
    await dispatch({
      type: "SIGN_IN",
      payload: { isLogin: true, token: data.token, id: data._id },
    });
    
  } catch (error) {
    console.log(error);
    toastErrorCustom(error)

  }
};

export const logoutUser = () => {
  delete api.defaults.headers.common["Authorization"];
  localStorage.setItem(
    "userData",
    JSON.stringify({
      token: null,
      isLogged: false,
    })
  );
  const _username = "default"
  getEducations(_username);
  getExperiences(_username);
  getprojects(_username);
  getSkills(_username);
  getOUserByUsername(_username);
  return {
    type: "LOGOUT",
    payload: { isLogin: false, token: null },
  };
};

export const updateUser = (id, user) => async (dispatch) => {
  try {
    const { data } = await updateUserApi(id, user);
    console.log({data})
    dispatch({
      type: "UPDATE_USER",
      payload: data.user,
      //payload:{...project,_id: data.project._id},
    });
    toastSuccess("User Updated Successfully");
  } catch (error) {
    console.log(error);
    toastErrorCustom(error)
  }
};
