import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

function Sidebar() {
    const {getUsers, users, selectedUser, setSelectedUser, isUsersLoading} = useChatStore();
    const onlineUsers = [];

    useEffect(() => {
        getUsers()
    },[getUsers]);

    
  return (
    <div>

    </div>
  );
}

export default Sidebar;