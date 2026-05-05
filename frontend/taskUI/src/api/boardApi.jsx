// api/boardApi.js
import API from "./axios";

export const createBoard = (data) => API.post("/boards/create", data);

export const getBoard = (id) => API.get(`/boards/${id}`);

export const addColumn = (id, column) =>
  API.post(`/boards/${id}/columns`, column);

export const addCard = (id, body) =>
  API.post(`/boards/${id}/cards`, body);

export const moveCard = (boardId, cardId, body) =>
  API.post(`/boards/${boardId}/cards/${cardId}/move`, body);