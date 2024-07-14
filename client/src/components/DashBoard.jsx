import { gql, useQuery, useMutation } from '@apollo/client';
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import NavBar from "./NavBar";

const GET_GROUPS = gql`
  query GetGroups {
    getGroups {
      id
      name
      description
      createdBy {
        id
        firstName
        lastName
      }
    }
  }
`;

const CREATE_GROUP = gql`
  mutation CreateGroup($name: String!, $description: String, $userId: String!) {
    createGroup(name: $name, description: $description, userId: $userId) {
      id
      name
      description
    }
  }
`;

export default function DashBoard() {
  const user = useLoaderData();
  const [groupData, setGroupData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const { data, loading, error } = useQuery(GET_GROUPS, {
    pollInterval: 1000
  });
  const [createGroup] = useMutation(CREATE_GROUP);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setGroupData(data.getGroups);
    }
  }, [data]);

  const handleAddGroup = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateGroup = async () => {
    try {
      await createGroup({ variables: { name: newGroupName, description: newGroupDescription, userId: user.user.user.id} });
      setIsModalOpen(false);
      setNewGroupName("");
      setNewGroupDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <NavBar />
      <div className="dashboard-container">
        <button className="add-group-button" onClick={handleAddGroup}>Create Group</button>
        <div className="groups-list">
          {groupData.map((group) => (
            <div key={group.id} className="group">
              <h3>{group.name}</h3>
              <p className="group-description">{group.description}</p>
              <p className="created-by">Created by: {group.createdBy.firstName}</p>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
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
    </div>
  );
}
