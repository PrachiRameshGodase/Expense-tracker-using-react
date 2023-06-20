import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

function ExpenseTracker() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  const dispatch=useDispatch()



useEffect(() => {
  const token = localStorage.getItem("token");
    if (token) {
      dispatch(authActions.login(token));
    }
    // Fetch expenses data from Firebase Realtime Database
    fetch("https://expense-tracker-ae023-default-rtdb.firebaseio.com/expense.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch");
        }
      })
      .then((data) => {
        // console.log(data);
     //Coditionally rendering the data
     const fetchedExpenses = [];
        for (const key in data) {
          fetchedExpenses.push({
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category
          });
        }
        setExpenses(fetchedExpenses);
})
      .catch((error) => {
        console.log("Error occurred while fetching expenses data:", error);
        setExpenses([]);
      }); 
  }, []);


  const submitHandler = (event) => {
    event.preventDefault();

    const newExpense = {
      amount: amount,
      description: description,
      category: category,
    };
    // Send a POST request to store the new expense in the database
    fetch('https://expense-tracker-ae023-default-rtdb.firebaseio.com/expense.json', {
      method: 'POST',
      body: JSON.stringify(newExpense),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log('Expense successfully added');
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to add expense');
        }
      })
      .then((data) => {
        console.log(data);
        // Update the expenses state with the new expense
        setExpenses((prevExpenses) => [...prevExpenses, { ...newExpense, id: data.name }]);
        setAmount('');
        setDescription('');
        setCategory('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete the expense
  const deleteExpense = (id) => {
    fetch(`https://expense-tracker-ae023-default-rtdb.firebaseio.com/expense/${id}.json`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Expense successfully deleted');
          setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
        } else {
          throw new Error('Failed to delete expense');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  //Edit the expense
  const editExpense=(id)=>{
    //Find the expense proper id
    const editItem=expenses.find((expense)=> expense.id === id)

    //populating the selected expense
    if(editItem){
        
        setAmount(editItem.amount);
        setDescription(editItem.description);
        setCategory(editItem.category)
    }
    fetch(`https://expense-tracker-ae023-default-rtdb.firebaseio.com/expense/${id}.json`, {
        method: 'DELETE',
      }).then((response) => {
        if (response.ok) {
          console.log('Expense successfully deleted from database & its populate successfully!');
          setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
        } else {
          throw new Error('Failed to delete expense');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  const sum = expenses.reduce(
    (total, expense) => total + parseInt(expense.amount),
    0
  );
  if(sum){
    dispatch(authActions.ispremium(sum))
  }
  
  return (
    <>
  <form onSubmit={submitHandler} className="bg-gradient-to-b from-blue-800 via-pink-500 to-purple-800  rounded-lg shadow-md p-6 space-y-6 wd-full mx-auto max-w-xl mt-6">
  <h2 className=" flex text-2xl font-bold text-white mb-4 justify-center">ADD EXPENSE</h2>

  <div>
    <label htmlFor="amount" className="block text-white font-semibold mb-1">
      Expense Amount
    </label>
    <input
      type="number"
      id="amount"
      value={amount}
      onChange={(event) => {
        setAmount(event.target.value);
      }}
      className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-400"
    />
  </div>

  <div>
    <label htmlFor="description" className="block text-white font-semibold mb-1">
      Expense Description
    </label>
    <input
      type="text"
      id="description"
      value={description}
      onChange={(event) => {
        setDescription(event.target.value);
      }}
      className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-400"
    />
  </div>

  <div>
    <label htmlFor="category" className="block text-white font-semibold mb-1">
      Expense Category
    </label>
    <select
      id="category"
      value={category}
      onChange={(event) => {
        setCategory(event.target.value);
      }}
      className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-400"
    >
      <option>Choose Category</option>
      <option>Food</option>
      <option>Petrol</option>
      <option>Salary</option>
    </select>
  </div>

  <button
    type="submit"
    className="bg-gradient-to-b from-red-800 via-red-500 to-red-800  hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-purple-400"
  >
    Add Expense
  </button>

  <button className="bg-gradient-to-r flex mx-auto from-blue-800  to-blue-500  hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-purple-400">Total amount: {sum}</button>

  <input type="text" className="hidden" /> {/* Placeholder for the missing 'imput' element */}
</form>


<ul className="bg-gradient-to-b from-blue-800 via-pink-500 to-purple-500 rounded-lg shadow-md p-6 space-y-4 mt-7 mx-5">
  {expenses.map((item, index) => (
    <li key={index} className="border-b border-gray-300 py-2 flex text-white">
      <span className="font-semibold mx-2">Amount:</span> {item.amount}---{' '}
      <span className="font-semibold mx-2">Description:</span> {item.description}---{' '}
      <span className="font-semibold mx-2">Category:</span> {item.category}
      <button className='mx-4 bg-gradient-to-b from-red-800 via-red-500 to-red-800 hover:bg-purple-600 p-2 px-3 rounded-md' onClick={() => deleteExpense(item.id)}>Delete</button>
      <button  className="mx-0.25 bg-gradient-to-b from-green-800 via-green-500 to-green-800 hover:bg-purple-600 p-2 px-3 rounded-md" onClick={() => editExpense(item.id)}>Edit</button>
    </li>
  ))}
</ul>

      
    </>
  );
}

export default ExpenseTracker;
// import {useState} from 'react'

// function ExpenseTracker() {
//     const [amount, setAmount]=useState("")
//     const [description,setDescription]=useState("")
//     const [category,setCategory]=useState("")
//     const [expense, setExpense] = useState([]);

//     const submitHandler=(event)=>{
//         event.preventDefault()
//         const newData={
//             amount:amount,
//             description:description,
//             category:category
//         }
//         console.log(newData)
//         setExpense((prevstate) => {
//             return [...prevstate, newData];
//         });
//         setAmount("")
//         setDescription("")
//         setCategory("")
        
//     }
//   return (
//     <>
//     <form onSubmit={submitHandler}>
//       <label htmlFor="amount">Expense Amount:</label>
//       <input type='number'
//       value={amount}
//        onChange={(event)=>{setAmount(event.target.value)}}/>

//       <label htmlFor="description">Expense Description</label>
//       <input type='text' 
//       value={description}
//       onChange={(event)=>{setDescription(event.target.value)}}/>

//       <label htmlFor="">Expense Category</label>
//     <select value={category} onChange={(event)=>{setCategory(event.target.value)}}>
//         <option>Choose Category</option>
//         <option>Food</option>
//         <option>Petrol</option>
//         <option>Salary</option>
//       </select>
//       <button type='submit'>Add expense</button>
//     </form>

//     <ul>
       
//         {expense.map((item, index) => (
//         <li key={index}>
//         Amount: {item.amount}, Description: {item.description}, Category: {item.category}
//         </li>
//         ))}
        
//     </ul>
//     </>
//   )
// }

// export default ExpenseTracker