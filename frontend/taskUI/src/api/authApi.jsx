import API from "./axios";

// 🔐 REGISTER USER
export const registerUser = async (data) => {
  try {
  
    const res = await API.post("/auth/register", data);
    
    return res.data;
  } catch (error) {
    throw error.response?.data || "Registration failed";
  }
};

// 🔑 LOGIN USER
export const loginUser = async (data) => {
  try {
    const res = await API.post("/auth/login", data);
    // assuming backend returns: { token, role, email }
    
    const { token } = res.data;

    // store in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("profile", JSON.stringify(res.data.profile));
    localStorage.setItem("role", JSON.stringify(res.data.profile.role));

    return res.data;
  } catch (error) {
    throw error.response?.data || "Login failed";
  }
};

// 🚪 LOGOUT
export const logoutUser = () => {
  localStorage.clear();
};

// 👤 GET CURRENT USER INFO (from token/localStorage)
export const getCurrentUser = () => {
  return {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    email: localStorage.getItem("email"),
  };
};

// 🔐 CHECK AUTH
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};