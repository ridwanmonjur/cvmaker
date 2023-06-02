import {
  addProjectApi,
  getProjectsApi,
  deleteProjectApi,
  updateProjectApi,
  getProjectsByUserIdApi,
} from "../apis/projectApi";
import { toastSuccess, toastErrorCustom } from "../shared/toast";

export const getprojects = (username) => async (dispatch) => {
  // eslint-disable-next-line eqeqeq
  if (username==undefined) username="default"

  try {
    const { data } = await getProjectsApi(username);
    dispatch({ type: "GET_PROJECTS", payload: data });
  } catch (error) {
    console.log(error);
    toastErrorCustom(error);

  }
};

export const getProjectsByUserId = () => async (dispatch) => {

  try {
    const { data } = await getProjectsByUserIdApi();
    dispatch({ type: "GET_PROJECTS", payload: data });
  } catch (error) {
    console.log(error);
    toastErrorCustom(error);

  }
};


export const addProject = (project) => async (dispatch) => {
  try {
    const { data } = await addProjectApi(project);
    dispatch({ type: "ADD_PROJECT", payload: data });
    toastSuccess("Project Added Successfully");
  } catch (error) {
    console.log(error);
    toastErrorCustom(error)
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    await deleteProjectApi(id);
    dispatch({ type: "DELETE_PROJECT", payload: id });
    toastSuccess("Project deleted Successfully");
  } catch (error) {
    console.log(error);
    toastErrorCustom(error)
  }
};

export const updateProject = (id, project) => async (dispatch) => {
  try {
    const { data } = await updateProjectApi(id, project);
    dispatch({
      type: "UPDATE_PROJECT",
      payload: data.project,
      //payload:{...project,_id: data.project._id},
    });
    toastSuccess("Project Updated Successfully");
  } catch (error) {
    console.log(error);
    toastErrorCustom(error)
  }
};
