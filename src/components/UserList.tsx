import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { IUser } from "../types";
import UserListItem from "./UserListItem";
import UserProfile from "./UserProfile";

interface UserListProps {
  users: IUser[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const listSlideProps = useSpring({
    transform: selectedUser ? "translateX(-100%)" : "translateX(0%)",
  });

  const detailsSlideProps = useSpring({
    transform: selectedUser ? "translateX(0%)" : "translateX(100%)",
  });

  const handleUserClick = (user: IUser) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  return (
    <div className="user-list">
      {selectedUser ? null : (
        <animated.div className="flex flex-col gap-4" style={listSlideProps}>
          {users.map((user, index) => (
            <UserListItem
              key={index}
              user={user}
              onClick={() => handleUserClick(user)}
            />
          ))}
        </animated.div>
      )}
      <animated.div
        className="user-details-container"
        style={detailsSlideProps}
      >
        {selectedUser && (
          <UserProfile user={selectedUser} onBackClick={handleBackClick} />
        )}
      </animated.div>
    </div>
  );
};

export default UserList;
