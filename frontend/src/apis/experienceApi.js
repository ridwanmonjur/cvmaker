import api from "./serverApi";

export const addExperienceApi = (experience) => {
  return api.post("/experiences/", experience);
};

export const getExperiencesApi = (username) => {
  return api.get(`/experiences/user/${encodeURI(username)}`);
};


export const getExperiencesByUserIdApi = () => {
  return api.get(`/experiences/byUser`);
};


export const deleteExperienceApi = (experienceId) => {
  return api.delete(`/experiences/${experienceId}`);
};

export const updateExperienceApi = (experienceId, experience) => {
  return api.put(`/experiences/${experienceId}`, experience);
};
