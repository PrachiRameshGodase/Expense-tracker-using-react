import { useSelector,useDispatch } from 'react-redux';
import classes from "./Header.module.css"
import { Button } from 'react-bootstrap'
import { authActions } from '../../store/auth';
import { useNavigate } from 'react-router-dom'

function Header() {
  const dispatch=useDispatch();
  const isAuth=useSelector(state=>state.auth.isAuthenticated)
  const isPremium=useSelector(state=>state.auth.ispremium);

  const navigate=useNavigate()


  const logOutHandler=()=>{
      // authctx.logout();
      dispatch(authActions.logout())
      navigate('/');
    }
  return (
    <header className={classes.header}>
      {isPremium && <Button>Premium</Button>}
      {isAuth  && (<Button variant='danger' onClick={logOutHandler}>Logout</Button>)}
    </header>
  )
}

export default Header
