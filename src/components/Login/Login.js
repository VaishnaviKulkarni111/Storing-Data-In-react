import React, { useState, useReducer , useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../Store/auth-context';

const emailReducer =(state, action) =>{
  if(action.type === 'User_Input'){
    return { value: action.val, isValid: action.val.includes('@')}
  }
  if(action.type === 'Input_Blur'){
    return { value: state.value, isValid: state.value.includes('@')}
  }
  return { value: '', isValid: false}
}
const passwordReducer =(state, action) =>{
  if(action.type === 'User_Input'){
    return { value: action.val, isValid: action.val.trim().length > 6}
  }
  if(action.type === 'Input_Blur'){
    return { value: state.value, isValid: state.value.trim().length > 6}
  }
  return { value: '', isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollage, setEnteredCollage] = useState('');
  // const [collageIsValid, setCollageIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '', isValid: null
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '', isValid: null
  });

  const authCtx= useContext(AuthContext);

  const {isValid: emailIsValid} = emailState;
  const { isValid: passwordIsValid} = passwordState;


  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'User_Input', val: event.target.value});
    
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'User_Input', val: event.target.value});

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid
    );
  };
  // const collageChangeHandler = (event) => {
  //   setEnteredCollage(event.target.value);

  //   setCollageIsValid(
  //     event.target.value.trim().length > 6 
  //   );
  // };

  const validateEmailHandler = () => {
   dispatchEmail({type: 'Input_Blur'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'Input_Blur'});
  };

  // const validateCollageHandler =() =>{
  //   setEnteredCollage(enteredCollage.trim().length > 6);
  // }


  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        {/* <div
          className={`${classes.control} ${
            collageIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="collage">Collage Name</label>
          <input
            type="text"
            id="collage"
            value={enteredCollage}
            onChange={collageChangeHandler}
            onBlur={validateCollageHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
