import {
  addExperienceApi,
  getExperiencesApi,
  deleteExperienceApi,
  updateExperienceApi,
  getExperiencesByUserIdApi,
} from "../apis/experienceApi";
import { toastSuccess, toastErrorCustom } from "../shared/toast";

export const getExperiences = (username) => async (dispatch) => {
  // eslint-disable-next-line eqeqeq
  if (username==undefined) username="default"

  try {
    const { data } = await getExperiencesApi(username);
    dispatch({ type: "GET_EXPERIENCES", payload: data });
  } catch (error) {
    console.log(error);
    toastErrorCustom(error);
  }
};

export const getExpeiencesByUserId = () => async (dispatch) => {
  // eslint-disable-next-line eqeqeq
try {
  const { data } = await getExperiencesByUserIdApi();
  dispatch({ type: "GET_EXPERIENCES", payload: data });
} catch (error) {
  console.log(error);
  toastErrorCustom(error);

}
};

export const addExperience = (experience) => async (dispatch) => {
  try {
    const { data } = await addExperienceApi(experience);
    dispatch({ type: "ADD_EXEPERIENCE", payload: data });
    toastSuccess("Experience Added Successfully");
  } catch (error) {
    console.log(error);
    toastErrorCustom(error)
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    await deleteExperienceApi(id);
    dispatch({ type: "DELETE_EXEPERIENCE", payload: id });
    toastSuccess("Experience deleted Successfully");
  } catch (error) {
    console.log(error);
    toastErrorCustom(error)
  }
};

export const updateExperience = (id, experience) => async (dispatch) => {
  try {
    const { data } = await updateExperienceApi(id, experience);
    dispatch({
      type: "UPDATE_EXEPERIENCE",
      payload:{...experience,_id: data.experience._id},
    });
    toastSuccess("Experience Updated Successfully");
  } catch (error) {
    console.log(error);
    toastErrorCustom(error)
  }
};
