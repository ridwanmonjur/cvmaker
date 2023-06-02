import {
  addSkillApi,
  getSkillsApi,
  deleteSkillApi,
  updateSkillApi,
    getSkillsByUserIdApi,
} from "../apis/skillApi";
import { toastSuccess, toastErrorCustom } from "../shared/toast";

export const getSkills = (username) => async (dispatch) => {
  // eslint-disable-next-line eqeqeq
  if (username == undefined) username = "default"

  try {
    const { data } = await getSkillsApi(username);
    dispatch({ type: "GET_SKILLS", payload: data });
  } catch (error) {
    console.log(error);
    toastErrorCustom(error);

  }
};

export const getSkillsByUser = () => async (dispatch) => {
  try {
    const { data } = await getSkillsByUserIdApi();
    dispatch({ type: "GET_SKILLS", payload: data });
  } catch (error) {
    console.log(error);
    toastErrorCustom(error);

  }
};


export const addSkill = (skill) => async (dispatch) => {
  try {
    const { data } = await addSkillApi(skill);
    dispatch({ type: "ADD_SKILL", payload: data });
    toastSuccess("Skill Added Successfully");
  } catch (error) {
    console.log(error);
    toastErrorCustom(error)
  }
};

export const deleteSkill = (id) => async (dispatch) => {
  try {
    await deleteSkillApi(id);
    dispatch({ type: "DELETE_SKILL", payload: id });
    toastSuccess("Skill deleted successfully");
  } catch (error) {
    console.log(error);
    toastErrorCustom(error)
  }
};

export const updateSkill = (id, skill) => async (dispatch) => {
  try {
    const { data } = await updateSkillApi(id, skill);
    dispatch({
      type: "UPDATE_SKILL",
      payload: { ...skill, _id: data.skill._id },
    });
    toastSuccess("Skill updated successfully");
  } catch (error) {
    console.log(error);
    toastErrorCustom(error)
  }
};
