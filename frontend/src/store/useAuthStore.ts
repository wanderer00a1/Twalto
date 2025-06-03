import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

import toast from "react-hot-toast";
import axios from "axios";
import { Socket, io } from "socket.io-client";

type Data = {
  username?: string;
  email?: string;
  password?: string;
  profilePic?: string;
};

type AuthStore = {
  authUser: any | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];

  socket: Socket | null;

  checkAuth: () => Promise<void>;
  signup: (data: Data) => Promise<void>;
  login: (data: Data) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Data) => Promise<void>;

  connectSocket: () => void;
  disconnectSocket: () => void;
};

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: Data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "An error occured");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occured");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: Data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      get().disconnectSocket();
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "An error occured");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  },

  updateProfile: async (data: Data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error in updating Profile");
        toast.error(error.response.data.message);
      } else if (error instanceof Error) {
        console.log("error", error);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser) return;
    if (get().socket && get().socket?.connected) {
      console.log("Already Connected");
      return;
    }

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
      autoConnect: false,
      transports: ["websocket"],
    });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    socket.connect();
    set({ socket: socket });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
    set({ socket: null });
  },
}));
