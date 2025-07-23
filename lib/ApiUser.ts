import axios from "axios";

const API_URL = "https://dummyjson.com/users";

const getUserDetail = (id: number) => axios.get(`${API_URL}/${id}`);

const getUsers = (page: number, limit: number) => {
  const skip = page * limit;
  return axios.get(`${API_URL}?limit=${limit}&skip=${skip}`);
};

export const getUserById = async (id: number) => {
  return await axios.get(`${API_URL}/${id}`);
};

/**
 * Get unique gender list from all users
 */
const getGenderOptions = async () => {
  const res = await axios.get(`${API_URL}`);
  const users = res.data.users || [];
  // Ambil gender unik
  const genderSet = new Set(users.map((u: any) => u.gender));
  return Array.from(genderSet);
};

/**
 * Filter users by gender, with pagination
 */
const getUserByGender = (
  gender: string,
  page: number,
  limit: number
) => {
  const skip = page * limit;
  return axios.get(
    `${API_URL}/filter?key=gender&value=${gender}&limit=${limit}&skip=${skip}`
  );
};

export { getUserDetail, getUsers, getGenderOptions, getUserByGender };