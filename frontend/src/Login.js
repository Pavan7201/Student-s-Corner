import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { store } from './App';
import { Redirect } from 'react-router';
import styles from './Login.module.css';
import { Link, useHistory } from 'react-router-dom';
import Lottie from 'react-lottie';

const ANIMATIONS = [
  require('./animation1.json'),
  require('./animaton2.json'),
  require('./animation3.json'),
  require('./animation4.json')
];

const Login = () => {
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const [token, setToken] = useContext(store);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('/login', data).then(
      (res) => {
        setToken(res.data.token);
        history.push('/');
      },
      (error) => {
        if (error.response.status === 400) {
          alert('User does not exist');
          history.push('/register');
        } else if (error.response.status === 401) {
          alert('Invalid credentials');
        } else if (error.response.status === 500) {
          alert('Server error');
        }
      }
    );
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
  }, [token]);

  const animationOptions = {
    loop: false,
    autoplay: true,
    animationData: ANIMATIONS[currentAnimationIndex],
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

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
        <form className={styles.form} onSubmit={submitHandler} autoComplete='off'>
          <h3 className={styles.heading}>Login</h3>
          <input
            type='email'
            className={styles.input}
            onChange={changeHandler}
            name='email'
            placeholder='Email'
          />
          <br />
          <input
            type='password'
            className={styles.input}
            onChange={changeHandler}
            name='password'
            placeholder='Password'
          />
          <br />
          <input type='submit' value='Login' className={styles.submitButton} />
          <br />
        </form>
        <Link to='/register'>
          <button>SignUp</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
