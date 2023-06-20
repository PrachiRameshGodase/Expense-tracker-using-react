import React, {useState } from "react";
import { useSelector,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import classes from "./Header.module.css"

import { authActions } from '../../store/auth';
import { useNavigate } from 'react-router-dom'

function Header() {
  const [isBouncing, setIsBouncing] = useState(true);
  const dispatch=useDispatch();
  const isAuth=useSelector(state=>state.auth.isAuthenticated)
  const isPremium=useSelector(state=>state.auth.ispremium);

  const handleButtonClick = () => {
    setIsBouncing(false);
   
  };


  const navigate=useNavigate()


  const logOutHandler=()=>{
      dispatch(authActions.logout())
      navigate('/');
    }
  return (
    <nav className="p-3  bg-gradient-to-b from-blue-900 to-purple-400 items-center flex justify-between">

      <h1 className='text-white '>Expense tracker</h1>
      {!isAuth && (<Link
              to="/"
              ><button className='bg-gradient-to-b from-red-600 via-red-500 to-red-800  hover:bg-purple-600 py-2 px-4 font-bold text-white rounded '>LOGIN</button>
              </Link>)}
       {isPremium && 
       <button className={`bg-gradient-to-r from-red-600 via-green-500 to-red-600 py-2 px-4 font-bold text-white rounded hover:bg-red-800  ${
            isBouncing ? classes.bouncing : ''
          }`}
          onClick={handleButtonClick}>Premium</button>} 

     {isAuth && 
     <button className='bg-gradient-to-b from-red-600 via-red-500 to-red-800  hover:bg-purple-600 py-2 px-4 font-bold text-white rounded ' onClick={logOutHandler}
     >LOGOUT</button>}
    </nav>
  )
}

export default Header
