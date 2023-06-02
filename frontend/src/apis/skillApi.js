import api from "./serverApi";

export const addSkillApi = (skill) => {
  return api.post("/skills/", skill);
};

export const getSkillsApi = (username) => {
  return api.get(`/skills/user/${encodeURI(username)}`);
};

export const getSkillsByUserIdApi = () => {
  return api.get(`/skills/byUser`);
};

export const deleteSkillApi = (skillId) => {
  return api.delete(`/skills/${skillId}`);
};

export const updateSkillApi = (skillId, skill) => {
  return api.put(`/skills/${skillId}`, skill);
};
