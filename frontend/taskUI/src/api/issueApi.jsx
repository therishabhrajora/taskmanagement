// api/issueApi.js
import API from "./axios";

export const getAllIssues = () => API.get("/issues/all");

export const getEpics = () => API.get("/issues/epics");

export const getSprints = () => API.get("/issues/sprints");

export const getComments = (id) => API.get(`/issues/${id}/comments`);

export const getIssues = (params) => API.get("/issues/search", { params });

export const getIssueById = (id) => API.get(`/issues/${id}`);

export const createIssue = (data) => API.post("/issues/create", data);

export const updateStatus = (id, status, user) =>
  API.post(`/issues/${id}/status?status=${status}&performBy=${user}`);

export const addComment = (id, author, body) =>
  API.post(`/issues/${id}/comments?author=${author}&body=${body}`);

export const deleteComment = (commentId) =>
  API.delete(`/issues/comments/${commentId}`);
