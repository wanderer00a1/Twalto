import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { isAxiosError } from "axios";

interface ChatStore {
  messages: Array<string>;
  users: Array<string>;
  selectedUser: any | null;
  isUsersLoading: boolean;
  isMessageLoading: boolean;

  getUsers: () => Promise<void>;
  setSelectedUser:Function;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId: string) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      set({ isMessageLoading: false });
    }
  },

  //todo - 
  setSelectedUser: (selectedUser: any | null) => {
    set({ selectedUser });
  },
}));
