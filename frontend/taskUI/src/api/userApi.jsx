import API from "./axios";

// 👥 GET ALL USERS
export const getAllUsers = async () => {
  try {
    const res = await API.get("/user-profile/all");
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch users";
  }
};

// 👤 GET USER BY EMAIL
export const getUserByEmail = async (email) => {
  try {
    const res = await API.get(`/user-profile/${email}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch user";
  }
};

// ✏️ UPDATE PROFILE (JWT BASED)
// backend takes email from token (Authentication)
export const updateUserProfile = async (data) => {
 
  try {
    const res = await API.put("/user-profile", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to update profile";
  }
};