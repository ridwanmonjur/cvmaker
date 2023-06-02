import api from "./serverApi";

export const addProjectApi = (project) => {
  return api.post("/projects/", project);
};

export const getProjectsApi = (username) => {
  return api.get(`/projects/user/${encodeURI(username)}`);
};

export const getProjectsByUserIdApi = () => {
  return api.get(`/projects/byUser`);
};


export const deleteProjectApi = (projectId) => {
  return api.delete(`/projects/${projectId}`);
};

export const updateProjectApi = (projectId, project) => {
  return api.put(`/projects/${projectId}`, project);
};
