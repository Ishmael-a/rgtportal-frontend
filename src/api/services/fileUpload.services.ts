/* eslint-disable @typescript-eslint/no-explicit-any */
// services/file-upload.service.ts
import axios from "axios";
import { ApiResponse } from "../types";

export class FileUploadServices {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_API_URL}/files`;
  }

  // Upload a file (image or video)
  public async uploadFile(file: File): Promise<ApiResponse<any>> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${this.baseUrl}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  // Delete a file
  public async deleteFile(blobName: string): Promise<ApiResponse<any>> {
    try {
      const response = await axios.delete(`${this.baseUrl}/delete/${blobName}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }
}
