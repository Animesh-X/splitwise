import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './NavBar';
import '../styles/group.css';
import { GET_GROUP } from '../graphql/queries/getGroup';
import { GET_FRIENDS } from '../graphql/queries/getFriends';
import { ADD_MEMBER_TO_GROUP } from '../graphql/mutations/addMemberToGroup';

export default function Group() {
  const { groupId } = useParams();
  const { data: groupDataResult, loading: groupLoading, error: groupError } = useQuery(GET_GROUP, { variables: { groupId } });
  const [getFriends, { data: friendDataResult, loading: friendLoading, error: friendError }] = useLazyQuery(GET_FRIENDS);
  const [addMemberToGroup] = useMutation(ADD_MEMBER_TO_GROUP);

  const [selectedFriendId, setSelectedFriendId] = useState('');
  const [showAddMemberDropdown, setShowAddMemberDropdown] = useState(false);

  const handleFetchFriends = () => {
    getFriends();
    setShowAddMemberDropdown(true);
  } 

  const handleAddMemberToGroup = async () => {
    try {
      await addMemberToGroup({
        variables: {
          groupId,
          userId: selectedFriendId
        },
        refetchQueries: [{ query: GET_GROUP, variables: { groupId }}]
      });
      setSelectedFriendId('');
      setShowAddMemberDropdown(false);
    } catch (error) {
      console.error(error);
    }
  } 

  if (groupLoading || friendLoading) return <p>Loading...</p>;
  if (groupError) return <p>Error: {groupError.message}</p>;
  if (friendError) return <p>Error: {friendError.message}</p>;

  const group = groupDataResult.getGroup;

  return (
    <div >
      <NavBar />
      <div className='container'>
        
      <div className="header">
        <h1>Group Details</h1>
      </div>
      <div className="groupDetails">
        <h2>{group.name}</h2>
        <p>{group.description}</p>
      </div>
      <div className="section">
        <h3>Created By</h3>
        <p>{group.createdBy.firstName} {group.createdBy.lastName} ({group.createdBy.email})</p>
      </div>
      <div className="section">
        <h3>Balances</h3>
        <ul className="list">
          {group.payments.map((payment, index) => (
            <li key={index} className="payment">
              <p>{payment.oweFrom.firstName} {payment.oweFrom.lastName} ({payment.oweFrom.email})</p>
              <p>Owes to: {payment.user.firstName} {payment.user.lastName} ({payment.user.email})</p>
              <p>Amount: {payment.amount}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h3>Members</h3>
        <button onClick={handleFetchFriends}>Add Member</button>
          {showAddMemberDropdown && friendDataResult && (
            <div className="dropdown">
              <select
                value={selectedFriendId}
                onChange={(e) => setSelectedFriendId(e.target.value)}
              >
                <option value="">Select a Friend</option>
                {friendDataResult.getFriends.map(friend => (
                  <option key={friend.id} value={friend.id}>
                    {friend.firstName} {friend.lastName} ({friend.email})
                  </option>
                ))}
              </select>
              <button onClick={handleAddMemberToGroup}>Add</button>
            </div>
          )}
        <ul className="list">
          {group.members.map(member => (
            <li key={member.id} className="listItem">
              {member.firstName} {member.lastName} ({member.email})
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h3>Expenses</h3>
        <button>Add Expense</button>
        <ul className="list">
          {group.expenses.map(expense => (
            <li key={expense.id} className="listItem expense">
              <h4>{expense.title}</h4>
              <p>{expense.description}</p>
              <p>Created by: {expense.createdByUser.firstName} {expense.createdByUser.lastName} ({expense.createdByUser.email})</p>
              <h5>Transactions:</h5>
              <ul className="list">
                {expense.transactions.map((transaction, index) => (
                  <li key={index} className="transaction">
                    <p>User: {transaction.user.firstName} {transaction.user.lastName} ({transaction.user.email})</p>
                    <p>Paid: {transaction.amountPaid}, Owes: {transaction.amountOwed}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
}
