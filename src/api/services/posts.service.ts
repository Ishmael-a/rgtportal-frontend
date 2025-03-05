/* eslint-disable @typescript-eslint/no-explicit-any */
// services/post.service.ts
import axios from "axios";
import { ApiResponse } from "../types";

// interface CreatePostDto {
//   content?: string;
//   images?: string[];
//   videos?: string[];
//   poll?: string;
// }

export class PostService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_API_URL}/posts`;
  }

  // Create a new post
  public async createPost(postData: FormData): Promise<ApiResponse<any>> {
    try {
      console.log("post data:", postData);
      const response = await axios.post(`${this.baseUrl}/posts`, postData);
      console.log("response:", response);
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  // Fetch all posts
  public async getPosts(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<any>> {
    try {
      const response = await axios.get(`${this.baseUrl}/posts`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  // Fetch a single post by ID
  public async getPostById(postId: number): Promise<ApiResponse<any>> {
    try {
      const response = await axios.get(`${this.baseUrl}/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  }
}
