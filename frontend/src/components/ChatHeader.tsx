import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Pic */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.username}
              />
            </div>
          </div>

          {/* User */}
          <div>
            <h3 className="font-medium">{selectedUser.username}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close */}
        <button
          className="text-4xl font-bold text-gray-700 hover:text-gray-600 cursor-pointer"
          onClick={() => setSelectedUser(null)}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
