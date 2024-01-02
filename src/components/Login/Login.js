import React, { useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer =(state, action) =>{
  if(action.type === 'User_Input'){
    return { value: action.val, isValid: action.val.includes('@')}
  }
  if(action.type === 'Input_Blur'){
    return { value: state.value, isValid: state.value.includes('@')}
  }
  return { value: '', isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollage, setEnteredCollage] = useState('');
  const [collageIsValid, setCollageIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '', isValid: null
  });

  // useEffect(() =>{
  //   const identifier = setTimeout(() =>{
  //     console.log('Checking Form Validity');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 1000);
  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier)
  //   } 

  // }, [ enteredEmail,enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'User_Input', val: event.target.value});
    
  };


  const collageChangeHandler = (event) => {
    setEnteredCollage(event.target.value);

    setCollageIsValid(
      event.target.value.trim().length > 6 
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid
    );
  };

  const validateEmailHandler = () => {
   dispatchEmail({type: 'Input_Blur'})
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateCollageHandler =() =>{
    setEnteredCollage(enteredCollage.trim().length > 6);
  }


  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
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
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
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
        </div>
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
