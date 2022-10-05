// For getting data through http requests and setting data in local storage
// A bit like postman but for real frontend
import axios from "axios";
const API_URL = "/api/users/";

// Register User
const register = async (userData) => {
  // Sending post request
  // Saving response from server
  const response = await axios.post(API_URL, userData); // Takes in API URL (to send post request to) and the body of that request
  if (response.data) {
    // Takes a key-value pair as arguments and saves the pair to local storage. Both must be strings
    // Could have also used cookies
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    // Takes a key-value pair as arguments and saves the pair to local storage. Both must be strings
    // Could have also used cookies
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user"); // Removing the user from localStorage
};

const authService = {
  register,
  logout,
  login,
};
export default authService;
