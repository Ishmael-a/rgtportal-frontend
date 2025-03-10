/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/posts`;

export class PostInteractionService {
  static async getStats(id: number): Promise<void> {
    try {
      await axios.get(`${API_URL}/${id}/stats`);
    } catch (error) {
      console.error("Error getting post stats", error);
      throw error;
    }
  }

  static async likePost(postId: number, liked: boolean): Promise<void> {
    try {
      await axios.post(`${API_URL}/${postId}/likes`, {
        isLiked: liked,
      });
    } catch (error) {
      console.error("Error liking post:", error);
      throw error;
    }
  }

  static async unlikePost(postId: number): Promise<void> {
    try {
      await axios.post(`${API_URL}/${postId}/unlike`);
    } catch (error) {
      console.error("Error unliking post:", error);
      throw error;
    }
  }

  static async commentOnPost(
    postId: number | undefined,
    comment: string
  ): Promise<any> {
    try {
      if (!postId) {
        console.error("Post id is undefined.");
        throw new Error("Post id is undefined");
      }
      const response = await axios.post(`${API_URL}/${postId}/comments`, {
        content: comment,
      });
      return response.data;
    } catch (error) {
      console.error("Error commenting on post:", error);
      throw error;
    }
  }

  static async deleteComment(postId: number, commentId: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${postId}/comment/${commentId}`);
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  }
}
