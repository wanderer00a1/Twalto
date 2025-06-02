import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

import SidebarSkeleton from "./skeletons/SidebarSkeleton";

function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const onlineUsers = [];

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;
  return <div></div>;
}

export default Sidebar;
