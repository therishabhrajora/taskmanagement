// api/backlogApi.js
import API from "./axios";

export const getBacklog = (projectId) =>
  API.get(`/backlogs/${projectId}`);

export const recordBacklog = (projectId, order) =>
  API.post(`/backlogs/${projectId}/record`, order);

export const addToSprint = (issueId, sprintId) =>
  API.put(`/backlogs/add_to-sprint/${issueId}/${sprintId}`);

export const getHierarchy = (projectId) =>
  API.get(`/backlogs/${projectId}/hierarchy`);