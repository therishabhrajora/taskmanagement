// api/reportApi.js
import API from "./axios";

export const burnDown = (sprintId) =>
  API.get(`/reports/burn-down/${sprintId}`);

export const velocity = (projectId) =>
  API.get(`/reports/velocity?projectId=${projectId}`);

export const sprintReport = (sprintId) =>
  API.get(`/reports/sprintReport?sprintId=${sprintId}`);