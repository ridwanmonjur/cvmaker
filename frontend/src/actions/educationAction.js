import {
  addEducationApi,
  getEducationsApi,
  deleteEducationApi,
  updateEducationApi,
  getEducationsByUserIdApi,
} from "../apis/educationApi";
import { toastSuccess, toastErrorCustom } from "../shared/toast";

export const getEducations = (username) => async (dispatch) => {
    // eslint-disable-next-line eqeqeq
  if (username==undefined) username="default"
  try {
    const { data } = await getEducationsApi(username);
    dispatch({ type: "GET_EDUCATIONS", payload: data });
  } catch (error) {
    toastErrorCustom(error);
  }
};

export const getEducationsByUserId = () => async (dispatch) => {
  // eslint-disable-next-line eqeqeq
try {
  const { data } = await getEducationsByUserIdApi();
  dispatch({ type: "GET_EDUCATIONS", payload: data });
} catch (error) {
  toastErrorCustom(error);
}
};

export const addEducation = (education) => async (dispatch) => {
  try {
    const { data } = await addEducationApi(education);
    dispatch({ type: "ADD_EDUCATION", payload: data });
    toastSuccess("Education Added Successfully");
  } catch (error) {
    toastErrorCustom(error)
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    await deleteEducationApi(id);
    toastSuccess("Education Deleted Successfully");
    dispatch({ type: "DELETE_EDUCATION", payload: id });
  } catch (error) {
    toastErrorCustom(error)
  }
};

export const updateEducation = (id, education) => async (dispatch) => {
  try {
    const { data } = await updateEducationApi(id, education);
    dispatch({
      type: "UPDATE_EDUCATION",
      payload: {...education,_id: data.education._id}
    });
    toastSuccess("Education Updated Successfully");
  } catch (error) {
    console.log(error);
    toastErrorCustom(error)
  }
};
