import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { GET_GROUPS } from "../graphql/queries/getGroups";
import { GET_FRIENDS } from "../graphql/queries/getFriends";
import { GET_USER_BY_EMAIL } from "../graphql/queries/getUserByEmail";
import { CREATE_GROUP } from "../graphql/mutations/createGroup";
import { ADD_FRIEND } from "../graphql/mutations/addFriend";

export default function DashBoard() {
  const user = useLoaderData();
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [newFriendEmail, setNewFriendEmail] = useState("");
  const {
    data: groupDataResult,
    loading: groupLoading,
    error: groupError,
  } = useQuery(GET_GROUPS);
  const {
    data: friendDataResult,
    loading: friendLoading,
    error: friendError,
  } = useQuery(GET_FRIENDS);
  const [createGroup] = useMutation(CREATE_GROUP);
  const [
    getUserByEmail,
    { data: userData, loading: userLoading, error: userError },
  ] = useLazyQuery(GET_USER_BY_EMAIL);
  const [addFriend] = useMutation(ADD_FRIEND);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.getUserByEmail) {
      handleAddFriend(user.user.user.id, userData.getUserByEmail.id);
    }
  }, [userData]);

  const handleAddGroup = () => {
    setIsGroupModalOpen(true);
  };

  const handleAddFriendClick = () => {
    setIsFriendModalOpen(true);
  };

  const handleModalClose = () => {
    setIsGroupModalOpen(false);
    setIsFriendModalOpen(false);
  };

  const handleCreateGroup = async () => {
    try {
      await createGroup({
        variables: {
          name: newGroupName,
          description: newGroupDescription,
          userId: user.user.user.id,
        },
        refetchQueries: [{ query: GET_GROUPS }],
      });
      alert(`Group added successfully!`);
      setIsGroupModalOpen(false);
      setNewGroupName("");
      setNewGroupDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddFriend = async (userId, friendId) => {
    try {
      await addFriend({ variables: { userId, friendId }, refetchQueries: [{ query: GET_FRIENDS}] });
      alert(`Friend added successfully!`);
      setIsFriendModalOpen(false);
      setNewFriendEmail("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFindFriend = async () => {
    getUserByEmail({ variables: { email: newFriendEmail } });
  };

  if (groupLoading || friendLoading || userLoading) return <p>Loading...</p>;
  if (groupError) return <p>Error: {groupError.message}</p>;
  if (friendError) return <p>Error: {friendError.message}</p>;
  if (userError) return <p>Error: {userError.message}</p>;

  const groups = groupDataResult.getGroups;
  const friends = friendDataResult.getFriends;

  return (
    <div>
      <NavBar />
      <div className="dashboard-container">
        <button className="add-group-button" onClick={handleAddGroup}>
          Create Group
        </button>
        <div className="groups-list">
          {groups.map((group) => (
            <div
              key={group.id}
              className="group"
              onClick={() =>
                navigate(`/groups/${group.id}`, {
                  state: { groupId: group.id },
                })
              }
            >
              <h3>{group.name}</h3>
              <p className="group-description">{group.description}</p>
              <p className="created-by">
                Created by: {group.createdBy.firstName}
              </p>
            </div>
          ))}
        </div>
        <button className="add-friend-button" onClick={handleAddFriendClick}>
          Add Friend
        </button>
        <div className="friends-list">
          {friends.map((friend) => (
            <div key={friend.id} className="friend">
              <h3>
                {friend.firstName} {friend.lastName}
              </h3>
              <p className="group-description">{friend.email}</p>
            </div>
          ))}
        </div>
      </div>

      {isGroupModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create Group</h2>
            <label>
              Group Name:
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </label>
            <label>
              Group Description:
              <input
                type="text"
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
              />
            </label>
            <button onClick={handleCreateGroup}>Create</button>
            <button onClick={handleModalClose}>Cancel</button>
          </div>
        </div>
      )}

      {isFriendModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Friend</h2>
            <label>
              Email:
              <input
                type="email"
                value={newFriendEmail}
                onChange={(e) => setNewFriendEmail(e.target.value)}
                required
              />
            </label>
            <button onClick={handleFindFriend}>Add</button>
            <button onClick={handleModalClose}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
