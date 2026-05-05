import API from "./axios";

// 🚀 CREATE SPRINT
// NOTE: your backend currently uses GET (which is wrong)
// Ideally should be POST, but using your current API
export const createSprint = async (data) => {
  try {
    const res = await API.get("/sprints/create", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to create sprint";
  }
};

// 📌 ASSIGN ISSUE TO SPRINT
export const assignIssueToSprint = async (sprintId, issueId) => {
  try {
    const res = await API.put(`/sprints/assign/${sprintId}/${issueId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to assign issue";
  }
};

// ▶️ START SPRINT
export const startSprint = async (sprintId) => {
  try {
    const res = await API.put(`/sprints/${sprintId}/start`);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to start sprint";
  }
};

// ⏹️ CLOSE SPRINT
export const closeSprint = async (sprintId) => {
  try {
    const res = await API.put(`/sprints/${sprintId}/close`);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to close sprint";
  }
};

// 📊 GET BURNDOWN DATA
export const getSprintBurndown = async (sprintId) => {
  try {
    const res = await API.get(`/sprints/${sprintId}/burnDown`);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch burndown";
  }
};