// import React from 'react';
// import Avatar from "@mui/material/Avatar";
// import AllInboxIcon from '@mui/icons-material/AllInbox';
import React,{useContext,useState,useEffect} from 'react'
import {store} from '../../App';
import { Redirect } from 'react-router';
import axios from 'axios';
import './Header.css';
import { Link } from 'react-router-dom';
import { Button,Typography } from '@mui/material';
// import { auth } from "../../firebase";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../features/userSlice";
// import {store} from "../../App"


function Header() {
    // const user = useSelector(selectUser);
    // // console.log(user);
    // function stringToColor(string) {
    //   let hash = 0;
    //   let i;
  
    //   /* eslint-disable no-bitwise */
    //   for (i = 0; i < string.length; i += 1) {
    //     hash = string.charCodeAt(i) + ((hash << 5) - hash);
    //   }
  
    //   let color = "#";
  
    //   for (i = 0; i < 3; i += 1) {
    //     const value = (hash >> (i * 8)) & 0xff;
    //     color += `00${value.toString(16)}`.substr(-2);
    //   }
    //   /* eslint-enable no-bitwise */
  
    //   return color;
    // }
  
    // function stringAvatar(name) {
    //   return {
    //     sx: {
    //       bgcolor: name ? stringToColor(name) : "rgba(255,255,255,0.8)",
    //     },
    //     children: name && `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    //   };
    // }
    const [token,setToken] = useContext(store);
    const [data,setData] = useState(null);
    useEffect(() =>{
        axios.get('/myprofile',{
            headers: {
                'x-token' : token
            }
        }).then(res => setData(res.data)).catch((err) => console.log(err))
    },[])
    if(!token){
        return <Redirect to='/login' />
    }
    
  return (
    <div>
        <header className='flex justify-between p-3'>
            <Link to="/">
            <div className='logo'>
                <a href='' className='flex items-center gap-1 px-4 py-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-12 h-12">
                    <path fill-rule="evenodd" d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 101.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 013.095 2.348.75.75 0 00.992 0 26.547 26.547 0 015.93-3.95.75.75 0 00.42-.739 41.053 41.053 0 00-.39-3.114 29.925 29.925 0 00-5.199 2.801 2.25 2.25 0 01-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 01-1.084 3.45 26.503 26.503 0 00-1.281-.78A5.487 5.487 0 006 12v-.54z" clip-rule="evenodd" />
                    </svg>
                    <span className='font-bold text-2xl px-4'> Student's Corner</span>
                </a>
            </div>
            </Link>
            <Link to="/" className='flex items-center gap-1 px-4 py-4'><Typography>Home</Typography></Link>
            <Link to="/experience" className='flex items-center gap-1 px-4 py-4'><Typography>Interview Experience</Typography></Link>
            <Link to="/opening" className='flex items-center gap-1 px-4 py-4'><Typography>Resources</Typography></Link>
            <Link to="/On-campus" className='flex items-center gap-1 px-1 py-1' ><Typography>On Campus</Typography></Link>
            <Link to="/jobs" className='flex items-center gap-1 px-4 py-4'><Typography>Off Campus</Typography></Link>
            {/* <div class="py-4 ">
            <input type="text" class="search-bar" placeholder="search "></input>
            
            <button class="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
  <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
</svg>

              <img src="img/search.PNG" alt=""></img></button>
        </div> */}
            <Button variant='contained'  onClick={() => setToken(null)}>Logout</Button>

        </header>
        
    </div>
  );
}

export default Header
