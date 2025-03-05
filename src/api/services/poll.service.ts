/* eslint-disable @typescript-eslint/no-explicit-any */
// services/poll.service.ts
import axios from "axios";
import { ApiResponse } from "../types";

export class PollService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_API_URL}/polls`;
  }

  // Create a new poll
  public async createPoll(pollData: {
    description: string;
    options: string[];
  }): Promise<ApiResponse<any>> {
    try {
      const response = await axios.post(`${this.baseUrl}/polls`, pollData);
      return response.data;
    } catch (error) {
      console.error("Error creating poll:", error);
      throw error;
    }
  }

  // Fetch all polls
  public async getPolls(): Promise<ApiResponse<any>> {
    try {
      const response = await axios.get(`${this.baseUrl}/polls`);
      return response.data;
    } catch (error) {
      console.error("Error fetching polls:", error);
      throw error;
    }
  }

  // Fetch a single poll by ID
  public async getPollById(pollId: number): Promise<ApiResponse<any>> {
    try {
      const response = await axios.get(`${this.baseUrl}/polls/${pollId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching poll:", error);
      throw error;
    }
  }
}
