import {useState} from 'react'

function ExpenseTracker() {
    const [amount, setAmount]=useState("")
    const [description,setDescription]=useState("")
    const [category,setCategory]=useState("")

    const submitHandler=(event)=>{
        event.preventDefault()
        const newData={
            amount:amount,
            description:description,
            category:category
        }
        console.log(newData)
    }
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="amount">Expense Amount:</label>
      <input type='number'
      value={amount}
       onChange={(event)=>{setAmount(event.target.value)}}/>

      <label htmlFor="description">Expense Description</label>
      <input type='text' 
      value={description}
      onChange={(event)=>{setDescription(event.target.value)}}/>

      <label htmlFor="">Expense Category</label>
    <select value={category} onChange={(event)=>{setCategory(event.target.value)}}>
        <option>Choose Category</option>
        <option>Food</option>
        <option>Petrol</option>
        <option>Salary</option>
      </select>
      <button type='submit'>Add expense</button>
    </form>
  )
}

export default ExpenseTracker
