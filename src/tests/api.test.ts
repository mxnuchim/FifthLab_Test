import { fetchUsers } from "../services/api";
import axios from "axios";

describe("fetchUsers", () => {
  it("should fetch users from the API", async () => {
    const page = 1;
    const limit = 10;

    const result = await fetchUsers({ page, limit });

    expect(result.success).toBe(true); // Check if the success flag is true
    expect(result.data).toHaveLength(limit); // Check if the data array has the expected length
    expect(result.data[0]).toHaveProperty("gender"); // Check if the first user object has a 'gender' property
  });

  it("should handle errors when fetching users", async () => {
    const page = 1;
    const limit = 10;

    // Mocking a failure by passing an invalid URL
    jest.spyOn(axios, "get").mockRejectedValue(new Error("Network Error"));

    const result = await fetchUsers({ page, limit });

    expect(result.error).toBe(true); // Check if the error flag is true
    expect(result.message).toBe("Error fetching users"); // Check if the error message is as expected
  });
});
