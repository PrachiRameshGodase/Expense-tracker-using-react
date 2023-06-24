import React from 'react'
import { Button } from 'react-bootstrap';


function ExpensesList(props) {
    const deleteExpense = (id) => {
        props.onDelete(id);
      };

    //   const editExpense = (id) => {
    //     props.onEdit(id);
    //   };
     function downloadExpensesAsTxt() {
    const data = props.expenses.map((expense) => {
      return `Amount: ${expense.amount} | Description: ${expense.description} | Category: ${expense.category}`;
    });
    const text = data.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "expenses.txt";
    link.click();

    URL.revokeObjectURL(url);
  }

  const sum = props.expenses.reduce(
    (total, expense) => total + parseInt(expense.amount),
    0
  );
  // if(sum){
  //   dispatch(authActions.isPremium(sum))
  // }

    
  return (
    <div>
   
    <ul className="bg-gradient-to-b from-blue-800 via-pink-500 to-purple-500 rounded-lg shadow-md p-6 space-y-4 mt-7 ">
    <div className='flex justify-between'>
    <button className="bg-gradient-to-r  from-green-800  to-green-500  hover:bg-grren-600 text-white font-semibold py-2 px-3 rounded focus:outline-none focus:ring focus:ring-purple-400 text-xl">Total:{sum}₹</button>
    {<button onClick={downloadExpensesAsTxt} className='bg-gradient-to-r  from-blue-800  to-blue-500  hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded focus:outline-none focus:ring focus:ring-purple-400 text-l'>DownLoad</button> }
    {/* <button className="bg-gradient-to-r flex mx-auto from-green-800  to-green-500  hover:bg-grren-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-purple-400 text-xl">Total amount: {sum}</button> */}
    </div>
    {props.expenses.map((item, index) => (
      <li key={index} className="border-b border-gray-300 py-2  text-white flex justify-start">
        <span className="font-semibold mx-2">Amount:</span> {parseInt(item.amount)}---{' '}
        <span className="font-semibold mx-2">Description:</span> {item.description}---{' '}
        <span className="font-semibold mx-2">Category:</span> {item.category}
        <button className='mx-4 bg-gradient-to-b from-red-800 via-red-500 to-red-800 hover:bg-purple-600 p-2 px-3 rounded-md' onClick={() => deleteExpense(item.id)}>Delete</button>
        {/* <button  className="mx-0.25 bg-gradient-to-b from-green-800 via-green-500 to-green-800 hover:bg-purple-600 p-2 px-3 rounded-md" onClick={() => editExpense(item.id)}>Edit</button> */}
      </li>
    ))}
  </ul>
  
    </div>
  )
}

export default ExpensesList
