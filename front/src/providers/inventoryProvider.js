import axios from "axios";
import inventory from "./inventory";

async function getInventory() {
  if (process.env.NODE_ENV === "production") {
    try {
      const response = await axios.get(process.env.VUE_APP_BE_URL);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  } else {
    return inventory;
  }
}

const DENOMINATION = "£";

export { DENOMINATION, getInventory };
