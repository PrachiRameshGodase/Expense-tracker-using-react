import React,{useState,useEffect} from 'react'
import ExpenseTracker from './ExpenseTracker'
import ExpensesList from './ExpensesList'


function Expense() {
    const [expenses,setExpenses]=useState([])

   
  

    //if we login then the email is in localStorage for doing the post request the getting that email id neccessary
  const enteredEmail=localStorage.getItem('email');
  const updatedEmail = enteredEmail ? enteredEmail.replace('@', '').replace('.', '') : '';

  
    const fetchExpenses = () => {
        fetch(`https://user-http-56c85-default-rtdb.firebaseio.com/user/${updatedEmail}.json`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to fetch expenses');
            }
          })
          .then((data) => {
            const loadedExpenses = [];
            for (const key in data) {
              loadedExpenses.push({ id: key, ...data[key] });
            }
            setExpenses(loadedExpenses);
          })
          .catch((error) => {
            console.log(error);
          });
      };

    useEffect(() => {
        // const token = localStorage.getItem("token");
        // console.log(token)
        // if (token) {
        //   dispatch(authActions.islogin(token));
        // }
        fetchExpenses();
      }, []);


          // Delete the expense
  const deleteExpense = (id) => {
    fetch(`https://user-http-56c85-default-rtdb.firebaseio.com/user/${updatedEmail}/${id}.json`
    , {
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
  

//   Edit the expense
 



  
    const addItemHandler=(id,description,category,amount)=>{
        setExpenses((prevData)=>{
            return [...prevData,{id:id,
              description:description,
              category:category,
              amount:parseInt(amount)}]
        })
    }
  return (
    <div>
      <ExpenseTracker onAdd={addItemHandler}/>
      <ExpensesList expenses={expenses} onDelete={deleteExpense}  />
    </div>
  )
}

export default Expense
