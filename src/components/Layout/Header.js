import React,{useContext} from 'react'
import classes from "./Header.module.css"
import { Button } from 'react-bootstrap'
import AuthContext from '../../store/auth-context'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate=useNavigate()
const authctx=useContext(AuthContext)
const isLoggedIn=authctx.isLoggedIn;
const logOutHandler=()=>{
    authctx.logout();
    navigate('/');
  }
  return (
    <header className={classes.header}>
      {isLoggedIn  && (<Button variant='danger' onClick={logOutHandler}>Logout</Button>)}
    </header>
  )
}

export default Header
