import axios from "axios";

// ⚠️ TEMP: No backend deployed → disable real API
export const api = {
  get: async () => {
    return { data: [] };
  },
  post: async () => {
    return { data: { success: true } };
  },
  put: async () => {
    return { data: { success: true } };
  },
  delete: async () => {
    return { data: { success: true } };
  },
};
