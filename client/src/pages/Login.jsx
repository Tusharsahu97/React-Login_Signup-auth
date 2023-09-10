import { useState } from 'react';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import "./Register.css";
import axios from 'axios';
import { toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const[data,setdata]=useState({
    email:"",
    password:"",
  })

   const userLogin = async(e)=>{
     e.preventDefault();
     const {email,password} = data
     try {
      const {data} = await axios.post('http://localhost:8000/login',{
        email,
        password
      });
      if(data.message){
        toast.error(data.message);
      }else{
        setdata({})
        navigate('/dashboard');
      }

     } catch (error) {
       console.log(error);
     }
   }

  return (
    <div>
        <form onSubmit={userLogin}>
      <div className='container'>
      <div className="header">
        <div className="text">
            Log In
        </div>
        <div className="underline">

        </div>
      </div>
      <div className="inputs">
         
        <div className="input">
           <img src={email_icon} alt="" />
           <input type="email" placeholder='Email ID' value={data.email} onChange={(e) => setdata({...data,email:e.target.value})} />
        </div>
        <div className="input">
           <img src={password_icon} alt="" />
           <input type="password" placeholder='Password' value={data.password} onChange={(e) => setdata({...data,password:e.target.value})}/>
        </div>
      </div>
     
     
      <div className="submit-container">
        <button type='submit' className='submit'>
            Log In
        </button>
       
      </div>
    </div>
      </form>
    </div>
  )
}

export default Login
