import axios from "axios";

export const signupService = async (email, password, firstName, lastName) => {
  try {
    const response = await axios.post("/api/auth/signup", {
      email,
      password,
      firstName,
      lastName,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
