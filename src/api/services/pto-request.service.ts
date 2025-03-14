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
        throw new Error("Pto data post not successful");
      }
      return response.data;
    } catch (error) {
      console.error("Error posting pto data", error);
    }
  }

  static async fetchUserPtoRequest(): Promise<PtoLeave[] | undefined> {
    try {
      const response = await axios.get(`${API_URL}/my-requests`);
      console.log("response PtoData:", response.data);
      if (!response.data.success) {
        throw new Error("Pto data fetching unsuccessful.");
      }
      return response.data.data;
    } catch (error) {
      console.error("Error fetching pto data:", error);
    }
  }
}
