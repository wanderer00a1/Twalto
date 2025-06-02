import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { isAxiosError } from "axios";

type User = {
  _id: string;
  email: string;
  username: string;
  password: string;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
};

interface ChatStore {
  messages: Array<string>;
  users: Array<User>;
  selectedUser: any;
  isUsersLoading: boolean;
  isMessageLoading: boolean;

  getUsers: () => Promise<void>;
  setSelectedUser: Function;
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
        console.log("Full error response:", error.response); // Add this
        console.log("Status:", error.response.status); // Add this
        console.log("Error message:", error.response.data.message);
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
