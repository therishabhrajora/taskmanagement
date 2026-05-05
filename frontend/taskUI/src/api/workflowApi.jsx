// api/workflowApi.js
import API from "./axios";

export const getWorkflows = () => API.get("/workflow/list");
export const createWorkflow = (data) =>
  API.post("/workflow/create", data);

export const allowedTransitions = (id, from) =>
  API.get(`/workflow/${id}/transaction/${from}`);