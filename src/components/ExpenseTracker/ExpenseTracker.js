import { useState, useEffect } from 'react';

function ExpenseTracker() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = () => {
    fetch('https://expense-tracker-ae023-default-rtdb.firebaseio.com/expense.json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch expenses');
        }
      })
      .then((data) => {
        // Check if the response is null and handle accordingly
        if (data === null) {
          setExpenses([]);
        } else {
          setExpenses(Object.values(data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const newExpense = {
      amount: amount,
      description: description,
      category: category,
    };

    fetch('https://expense-tracker-ae023-default-rtdb.firebaseio.com/expense.json', {
      method: 'POST',
      body: JSON.stringify(newExpense),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to add expense');
        }
      })
      .then((data) => {
        setExpenses((prevExpenses) => [...prevExpenses, { ...newExpense, id: data.name }]);
        setAmount('');
        setDescription('');
        setCategory('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      </form>

      <ul>
        {expenses.map((item, index) => (
          <li key={item.id}>
            Amount: {item.amount}, Description: {item.description}, Category: {item.category}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ExpenseTracker;
