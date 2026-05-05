// api/attachmentApi.js
import API from "./axios";

export const uploadFile = (issueId, file, uploadBy) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("uploadBy", uploadBy);

  return API.post(`/attachments/upload/${issueId}`, formData);
};

export const downloadFile = (id) =>
  `${API.defaults.baseURL}/attachments/download/${id}`;

export const deleteFile = (id) =>
  API.delete(`/attachments/delete/${id}`);