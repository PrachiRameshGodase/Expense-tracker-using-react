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
      <form onSubmit={submitHandler}>
        <label htmlFor="amount">Expense Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
          }}
        />

        <label htmlFor="description">Expense Description</label>
        <input
          type="text"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <label htmlFor="">Expense Category</label>
        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          <option>Choose Category</option>
          <option>Food</option>
          <option>Petrol</option>
          <option>Salary</option>
        </select>
        <button type="submit">Add expense</button>
        <span>Total amount:{sum}</span>
      </form>

      <ul>
        {expenses.map((item,index) => (
          <li key={index}>
            Amount: {item.amount}, Description: {item.description}, Category: {item.category}
            {<Button onClick={() => deleteExpense(item.id)}>Delete</Button>}
            {<Button onClick={() => editExpense(item.id)}>Edit</Button>}


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