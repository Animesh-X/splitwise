import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import '../styles/group.css';
import { GET_GROUP } from '../graphql/queries/getGroup';

export default function Group() {
  const { groupId } = useParams();
  const { data: groupDataResult, loading: groupLoading, error: groupError } = useQuery(GET_GROUP, { variables: { groupId } });

  if (groupLoading) return <p>Loading...</p>;
  if (groupError) return <p>Error: {groupError.message}</p>;

  const group = groupDataResult.getGroup;

  return (
    <div >
      <NavBar />
      <div className='container'>
        
      <div className="header">
        <h1>Group Details</h1>
      </div>
      <div className="section">
        <h3>Payments</h3>
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
      <div className="groupDetails">
        <h2>{group.name}</h2>
        <p>{group.description}</p>
      </div>
      <div className="section">
        <h3>Created By</h3>
        <p>{group.createdBy.firstName} {group.createdBy.lastName} ({group.createdBy.email})</p>
      </div>
      <div className="section">
        <h3>Members</h3>
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
