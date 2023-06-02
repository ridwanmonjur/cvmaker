import api from "./serverApi";

export const addEducationApi = (education) => {
  return api.post("/educations/", education);
};

export const getEducationsApi = (username) => {
  return api.get(`/educations/user/${encodeURI(username)}`);
};

export const getEducationsByUserIdApi = () => {
  return api.get(`/educations/byUser`);
};

export const deleteEducationApi = (educationId) => {
  return api.delete(`/educations/${educationId}`);
};

export const updateEducationApi = (educationId, education) => {
  return api.put(`/educations/${educationId}`, education);
};
