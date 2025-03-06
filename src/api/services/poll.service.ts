/* eslint-disable @typescript-eslint/no-explicit-any */
// services/poll.service.ts
import axios from "axios";
import { ApiResponse } from "../types";
import { CreatePollDto } from "@/components/CreatePost";

export class PollService {
  private static baseUrl = `${import.meta.env.VITE_API_URL}/polls`;

  // Create a new poll
  public static async createPoll(
    pollData: CreatePollDto
  ): Promise<ApiResponse<any>> {
    try {
      const response = await axios.post(`${this.baseUrl}/`, pollData);
      return response.data;
    } catch (error) {
      console.error("Error creating poll:", error);
      throw error;
    }
  }

  // Fetch all polls
  public static async getPolls(): Promise<ApiResponse<any>> {
    try {
      const response = await axios.get(`${this.baseUrl}/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching polls:", error);
      throw error;
    }
  }

  // Fetch a single poll by ID
  public static async getPollById(pollId: number): Promise<ApiResponse<any>> {
    try {
      const response = await axios.get(`${this.baseUrl}/${pollId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching poll:", error);
      throw error;
    }
  }
}
