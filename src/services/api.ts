import axios from "axios";
import { IResponse } from "../types";
import { APP_CONFIG } from "../config/config";

const API_URL = APP_CONFIG.API_URL;

export const fetchUsers = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<IResponse> => {
  const url = `${API_URL}?page=${page}&results=${limit}`;

  try {
    const { data } = await axios.get(url);

    return { success: true, data: data?.results };
  } catch (error) {
    console.log("Error fetching users:", error);
    return { error: true, message: "Error fetching users" };
  }
};
