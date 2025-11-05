import React,{useContext,useState,useEffect} from 'react'
import {store} from './App';
import { Redirect } from 'react-router';
import axios from 'axios';
import avatar from './avatar.png';
import Accenture from './components/ACCENTURE/Accenture';
import New from './New';

const Myprofile = () => {
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
            {
                data &&
            <div>
                
                
                {/* <img class="card-img-top" src={avatar} alt="Card image cap" /> */}
                <div class="card-body">
                    <h5 class="card-title">Welcome : {data.username}</h5>
                    <button class="btn btn-primary" onClick={() => setToken(null)}>Logout</button>
                    
                </div>
                <br/>
                <div><New/></div>
                
                
                
            </div>
        }
        </div>
    )
}

export default Myprofile
