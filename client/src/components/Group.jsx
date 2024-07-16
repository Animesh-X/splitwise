import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { useParams, useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './NavBar';
import '../styles/group.css';
import { GET_GROUP } from '../graphql/queries/getGroup';
import { GET_FRIENDS } from '../graphql/queries/getFriends';
import { ADD_MEMBER_TO_GROUP } from '../graphql/mutations/addMemberToGroup';
import { CREATE_EXPENSE } from '../graphql/mutations/createExpense';

export default function Group() {
  const { groupId } = useParams();
  const user = useLoaderData();
  const { data: groupDataResult, loading: groupLoading, error: groupError } = useQuery(GET_GROUP, { variables: { groupId } });
  const [getFriends, { data: friendDataResult, loading: friendLoading, error: friendError }] = useLazyQuery(GET_FRIENDS);
  const [addMemberToGroup] = useMutation(ADD_MEMBER_TO_GROUP);
  const [createExpense] = useMutation(CREATE_EXPENSE);

  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFriendId, setSelectedFriendId] = useState('');
  const [showAddMemberDropdown, setShowAddMemberDropdown] = useState(false);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState();
  const [transactions, setTransactions] = useState([]);

  const handleFetchFriends = () => {
    getFriends();
    setShowAddMemberDropdown((prev) => !prev);
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

  const handleAddExpenseClick = () => {
    setShowAddExpenseForm((prev) => !prev);
  }

  const handleAddTransaction = () => {
    setTransactions([...transactions, { userId: '', amountPaid: '', amountOwed: '' }]);
  }

  const handleTransactionChange = (index, field, value) => {
    const newTransactions = [...transactions];
    newTransactions[index][field] = value;
    setTransactions(newTransactions);
  }

  const handleAddExpense = async () => {
    console.log(`${expenseTitle} - ${expenseDescription} - ${expenseAmount}`);
    transactions.forEach((transaction) => console.log(transaction));
    let totalAmountPaid = 0;
    let totalAmountOwed = 0;
    transactions.forEach((transaction) => {
      transaction.amountOwed = parseFloat(transaction.amountOwed);
      transaction.amountPaid = parseFloat(transaction.amountPaid);
      totalAmountOwed += transaction.amountOwed;
      totalAmountPaid += transaction.amountPaid;
    });
    if (totalAmountOwed !== totalAmountPaid || totalAmountOwed !== parseFloat(expenseAmount) || totalAmountPaid !== parseFloat(expenseAmount)) {
      alert('Amount paid and amount owed must be equal to the expense amount');
      return;
    }
    try {
      await createExpense({
        variables: {
          input: {
            title: expenseTitle,
            description: expenseDescription,
            groupId,
            createdBy: user.user.user.id,
            transactions,
          },
        },
        refetchQueries: [{ query: GET_GROUP, variables: { groupId }}]
      });
      alert(`Expense added successfully`);
      setExpenseTitle('');
      setExpenseDescription('');
      setExpenseAmount('');
      setTransactions([]);
      setShowAddExpenseForm(false);
    } catch (error) {
      console.error("Error creating expense:", error);
      alert(`Error adding expense - `)
    }
  };
  

  if (groupLoading || friendLoading) return <p>Loading...</p>;
  if (groupError) return <p>Error: {groupError.message}</p>;
  if (friendError) return <p>Error: {friendError.message}</p>;

  const group = groupDataResult.getGroup;

  return (
    <div >
      <NavBar />
      
      <div className='container'>
      {errorMessage && (
        <h3>{errorMessage}</h3>
      )}
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
        <button onClick={handleAddExpenseClick}>Add Expense</button>
        {showAddExpenseForm && (
          <div className="add-expense-form">
            <h4>New Expense</h4>
            <input type="text" placeholder='Expense Title' value={expenseTitle} onChange={(e) => setExpenseTitle(e.target.value)} />
            <input type="text" placeholder='Expense Desciption' value={expenseDescription} onChange={(e) => setExpenseDescription(e.target.value)}/>
            <input type="number" placeholder='Total Expense' step={0.01} value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
            <h5>Transactions</h5>
            {transactions.map((transaction, index) => (
                <div className="transaction-form" key={index}>
                  <label>
                    User
                    <select
                      value={transaction.userId}
                      onChange={(e) => handleTransactionChange(index, 'userId', e.target.value)}
                    >
                      <option value="">Select a user</option>
                      {group.members.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.firstName} {member.lastName} ({member.email})
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Amount Paid:
                    <input
                      type="number"
                      placeholder="Amount Paid"
                      step={0.01}
                      value={transaction.amountPaid}
                      onChange={(e) => handleTransactionChange(index, 'amountPaid', e.target.value)}
                    />
                  </label>
                  <label>
                    Amount Owed:
                    <input
                      type="number"
                      placeholder="Amount Owed"
                      step={0.01}
                      value={transaction.amountOwed}
                      onChange={(e) => handleTransactionChange(index, 'amountOwed', e.target.value)}
                    />
                  </label>
                </div>
              ))}
              <div className='add-expense-button-container'>
                <button onClick={handleAddTransaction}>Add Transaction</button>
                <button onClick={handleAddExpense}>Add Expense</button>
              </div>
          </div>
        )}
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
