import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Lottie from 'react-lottie';
import styles from './Register.module.css';

const ANIMATIONS = [
  require('./animation1.json'),
  require('./animaton2.json'),
  require('./animation3.json'),
  require('./animation4.json')
];

const Register = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
  });
  const [redirectToLogin, setRedirectToLogin] = useState(false); // Added state to control redirection
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);

  const changeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    axios.post('/register', data).then(res => {
      alert(res.data);
      setData({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
      });
      setRedirectToLogin(true); // Set state to true to trigger redirection
    });
  };

  const onAnimationComplete = () => {
    setCurrentAnimationIndex((prevIndex) =>
      prevIndex === ANIMATIONS.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    let intervalId = setInterval(() => {
      setCurrentAnimationIndex((prevIndex) =>
        prevIndex === ANIMATIONS.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const animationOptions = {
    loop: false,
    autoplay: true,
    animationData: ANIMATIONS[currentAnimationIndex],
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (redirectToLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.animationContainer}>
        <div className={styles.animation}>
          <Lottie
            options={animationOptions}
            height={500}
            width={'100%'}
            onComplete={onAnimationComplete}
          />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={submitHandler} autoComplete="off" className={styles.form}>
          <h3 className={styles.heading}>Register</h3>
          <input type="text" onChange={changeHandler} name="username" placeholder="User Name" className={styles.input}/>
          <br />
          <input type="email" onChange={changeHandler} name="email" placeholder="Email" className={styles.input}/>
          <br />
          <input type="password" onChange={changeHandler} name="password" placeholder="Password" className={styles.input}/>
          <br />
          <input type="password" onChange={changeHandler} name="confirmpassword" placeholder="Confirm Password" className={styles.input}/>
          <br />
          <input type="submit" value="Register" className={styles.submitButton}/>
          <br />
        </form>
      </div>
    </div>
  );
};

export default Register;
