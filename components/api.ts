import { ADMIN_TOKEN } from "@/constants/constants";
import axios from "axios";

export const changeEmergencyStatus = async (status: string) => {
  return await axios.post(
    "http://localhost:9000/api/v1/emergency",
    { isTurningOn: status },
    {
      headers: {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
};
