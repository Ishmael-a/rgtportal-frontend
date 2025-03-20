import { PtoLeave } from "@/types/PTOS";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/leave`;

export class PtoRequestService {
  static async createPtoRequest(
    ptoData: PtoLeave
  ): Promise<PtoLeave | undefined> {
    try {
      const response = await axios.post(`${API_URL}/`, {
        ...ptoData,
      });

      if (!response.data.success) {
        throw new Error(
          response.data.message || "PTO data post not successful"
        );
      }
      return response.data;
    } catch (error) {
      console.error("Error posting pto data", error);
      throw error;
    }
  }

  static async fetchUserPtoRequest(): Promise<PtoLeave[] | undefined> {
    try {
      const response = await axios.get(`${API_URL}/my-requests`);
      console.log("response PtoData:", response.data);
      if (!response.data.success) {
        throw new Error(
          response.data.message || "PTO data fetching unsuccessful."
        );
      }
      return response.data.data.reverse();
    } catch (error) {
      console.error("Error fetching pto data:", error);
      throw error;
    }
  }



  static async deletePtoRequest(id: number) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);

      console.log("success Response:", response.data);
      if (!response.data.success) {
        console.log("fail Response:", response.data);
        throw new Error(
          response.data.message || "PTO data post not successful"
        );
      }
      return response.data;
    } catch (error) {
      console.error("Error deleting pto data", error);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data?.message || "Failed to delete PTO request"
        );
      } else {
        throw new Error("Failed to delete PTO request");
      }
    }
  }
}
