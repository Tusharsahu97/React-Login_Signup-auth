import { useState } from 'react';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import "./Register.css";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';




function Register() {
  
  const navigate = useNavigate();
  const[data,setdata]=useState({
    name:"",
    email:"",
    password:"",
  })

   const registerUser = async (e)=>{
      e.preventDefault();
      const {name, email, password} = data
      try {
        const { data } = await axios.post('http://localhost:8000/register', {
          name, email, password
         });

         if (data.message) {
          toast.error(data.message);
        } else {
          setdata({});
          toast.success(`Welcome Back ${name}`);
          console.log('Navigating to login page');
          navigate('/login'); // Make sure 'navigate' is called here.
        }
        
      } catch (error) {
        console.log(error);
      }
   }
  return (
    <div>
      <form onSubmit={registerUser}>
      <div className='container'>
      <div className="header">
        <div className="text">
            Register
        </div>
        <div className="underline">

        </div>
      </div>
      <div className="inputs">
          <div className="input">
           <img src={user_icon} alt="" />
           <input type="text" placeholder='Name' value={data.name} onChange={(e) => setdata({...data,name:e.target.value})} />
        </div>
      
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
            Register
        </button>
       
      </div>
    </div>
      </form>
    </div>
  )
}

export default Register
